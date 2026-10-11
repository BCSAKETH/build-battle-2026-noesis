"""
InsightFlow / Noesis v4.8 — Ingestion Router
Endpoint: POST /api/upload
Features: Multi-Tenant Multipart CSV Ingestion with Groq Llama-3 Auto-Mapping
"""

import os
import sys
import io
import json
import urllib.request
from typing import List, Dict, Any, Optional
import pandas as pd
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from dotenv import load_dotenv

# Ensure backend directory is in sys.path
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Shared Auth dependency
from server import get_current_user, SUPABASE_URL, SUPABASE_ANON_KEY

load_dotenv()

router = APIRouter(prefix="/api", tags=["Data Ingestion & Groq Auto-Mapping"])

# In-memory session cache for instant dashboard querying
uploaded_datasets_cache: Dict[str, Any] = {}


def auto_map_columns_with_groq(headers: List[str], sample_rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Uses Groq Llama-3 (llama-3.3-70b-versatile) to dynamically infer column semantics
    from CSV headers and sample data rows. Falls back to semantic fuzzy matching.
    """
    groq_api_key = os.environ.get("GROQ_API_KEY")
    mapping = {
        "feedback_text": None,
        "category": None,
        "timestamp": None,
        "rating": None,
        "provider": "Fuzzy Semantic Inference"
    }

    if groq_api_key and groq_api_key.strip():
        try:
            from groq import Groq
            client = Groq(api_key=groq_api_key)
            prompt = f"""You are an enterprise schema mapping engine. Given the CSV headers and sample rows below, map the columns to these internal target fields:
1. "feedback_text": The column containing customer reviews, complaints, or text comments.
2. "category": The column representing the category, department, or issue type.
3. "timestamp": The column representing submission date, time, or period.
4. "rating": The column representing numerical rating, score, or satisfaction grade.

Headers: {json.dumps(headers)}
Sample Rows: {json.dumps(sample_rows[:3])}

Output strict JSON only with no explanation:
{{
  "feedback_text": "<column name or null>",
  "category": "<column name or null>",
  "timestamp": "<column name or null>",
  "rating": "<column name or null>"
}}"""

            completion = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.0,
                response_format={"type": "json_object"}
            )
            raw_content = completion.choices[0].message.content
            parsed = json.loads(raw_content)
            for k in ["feedback_text", "category", "timestamp", "rating"]:
                if parsed.get(k) in headers:
                    mapping[k] = parsed[k]
            mapping["provider"] = "Groq Llama-3.3-70B Live API"
            return mapping
        except Exception as e:
            print("Groq auto-mapping warning (falling back to fuzzy matcher):", e)

    # Robust Semantic Fuzzy Fallback
    h_lower = {h.lower().strip(): h for h in headers}
    
    # 1. Text column detection
    text_synonyms = ["review", "feedback", "comment", "text", "description", "body", "message", "complaint", "content", "summary"]
    for syn in text_synonyms:
        match = next((orig for low, orig in h_lower.items() if syn in low), None)
        if match:
            mapping["feedback_text"] = match
            break
    if not mapping["feedback_text"] and headers:
        mapping["feedback_text"] = headers[0]

    # 2. Category column detection
    cat_synonyms = ["category", "topic", "department", "type", "tag", "label", "class", "genre"]
    for syn in cat_synonyms:
        match = next((orig for low, orig in h_lower.items() if syn in low), None)
        if match:
            mapping["category"] = match
            break

    # 3. Timestamp column detection
    time_synonyms = ["date", "time", "timestamp", "created", "submitted", "year", "month"]
    for syn in time_synonyms:
        match = next((orig for low, orig in h_lower.items() if syn in low), None)
        if match:
            mapping["timestamp"] = match
            break

    # 4. Rating column detection
    rating_synonyms = ["rating", "score", "stars", "points", "grade"]
    for syn in rating_synonyms:
        match = next((orig for low, orig in h_lower.items() if syn in low), None)
        if match:
            mapping["rating"] = match
            break

    return mapping


def analyze_record(text: str, category: str) -> Dict[str, Any]:
    """Evaluates sentiment, severity tier, and urgency."""
    t_lower = text.lower()
    positive_words = ["great", "exceeded", "perfect", "helpful", "promptly", "excellent", "satisfied", "good", "love", "fast", "smooth"]
    negative_words = ["fraud", "scam", "scammed", "counterfeit", "unresponsive", "disappointed", "delayed", "poor", "broken", "worst", "failed"]
    risk_words = ["fraud", "scam", "scammed", "counterfeit", "stole", "victim", "unresponsive", "never sent", "money"]

    pos_score = sum(1 for w in positive_words if w in t_lower)
    neg_score = sum(1 for w in negative_words if w in t_lower)
    is_risk = any(w in t_lower for w in risk_words) or (category == "Fraud and Scam")

    if category == "Fraud and Scam" or is_risk:
        sentiment = "Negative"
        severity = "Critical"
        urgency = "High"
    elif neg_score > pos_score:
        sentiment = "Negative"
        severity = "High" if is_risk else "Medium"
        urgency = "High" if is_risk else "Medium"
    elif pos_score > neg_score:
        sentiment = "Positive"
        severity = "Low"
        urgency = "Low"
    else:
        sentiment = "Neutral"
        severity = "Low"
        urgency = "Low"

    return {
        "sentiment": sentiment,
        "severity": severity,
        "urgency": urgency,
        "is_risk": is_risk
    }


@router.post("/upload")
async def upload_csv_dataset(
    file: UploadFile = File(...),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Multi-Tenant CSV Ingestion & Groq Auto-Mapping:
    1. Reads multipart CSV file.
    2. Uses Groq Llama-3 to automatically infer column mapping without hardcoded schemas.
    3. Analyzes sentiment and risk per record.
    4. Persists dataset into Supabase public.user_datasets scoped to current_user['id'].
    5. Caches parsed dataset in-memory for immediate dashboard rendering.
    """
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files (.csv) are accepted.")

    contents = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV file: {str(e)}")

    if df.empty:
        raise HTTPException(status_code=400, detail="Uploaded CSV file is empty.")

    headers = list(df.columns)
    sample_rows = df.head(3).to_dict(orient="records")

    # Call Groq Auto-Mapper
    column_mapping = auto_map_columns_with_groq(headers, sample_rows)
    text_col = column_mapping.get("feedback_text")
    cat_col = column_mapping.get("category")
    time_col = column_mapping.get("timestamp")

    # Ingest and normalize records
    normalized_records = []
    for idx, row in df.iterrows():
        review_text = str(row[text_col]) if text_col and pd.notna(row[text_col]) else ""
        category_val = str(row[cat_col]) if cat_col and pd.notna(row[cat_col]) else "General Feedback"
        timestamp_val = str(row[time_col]) if time_col and pd.notna(row[time_col]) else "2026-10-12"

        analysis = analyze_record(review_text, category_val)

        normalized_records.append({
            "id": f"UP-{idx + 1:04d}",
            "review": review_text,
            "category": category_val,
            "timestamp": timestamp_val,
            "sentiment": analysis["sentiment"],
            "severity": analysis["severity"],
            "urgency": analysis["urgency"],
            "is_risk": analysis["is_risk"]
        })

    # Cache dataset in memory
    uploaded_datasets_cache[current_user["id"]] = normalized_records

    # Stream to Supabase public.user_datasets
    supabase_stored = False
    try:
        payload = json.dumps({
            "user_id": current_user["id"],
            "filename": file.filename,
            "record_count": len(normalized_records),
            "column_mapping": column_mapping,
            "is_active": True
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{SUPABASE_URL}/rest/v1/user_datasets",
            data=payload,
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            if resp.status in (200, 201):
                supabase_stored = True
    except Exception as e:
        print("Supabase dataset persistence notice:", e)

    return {
        "success": True,
        "filename": file.filename,
        "total_records": len(normalized_records),
        "column_mapping": column_mapping,
        "mapped_provider": column_mapping.get("provider"),
        "supabase_stored": supabase_stored,
        "sample_preview": normalized_records[:5]
    }
