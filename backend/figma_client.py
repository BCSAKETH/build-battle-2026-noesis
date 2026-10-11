import os
import requests
from dotenv import load_dotenv

load_dotenv()

FIGMA_TOKEN = os.getenv("FIGMA_ACCESS_TOKEN", "")
HEADERS = {"X-Figma-Token": FIGMA_TOKEN}

def get_current_user():
    """Verify Figma authentication status."""
    res = requests.get("https://api.figma.com/v1/me", headers=HEADERS)
    res.raise_for_status()
    return res.json()

def get_file(file_key: str):
    """Fetch complete JSON structure and node tree of a Figma file."""
    res = requests.get(f"https://api.figma.com/v1/files/{file_key}", headers=HEADERS)
    res.raise_for_status()
    return res.json()

def get_file_nodes(file_key: str, node_ids: list):
    """Fetch specific node trees from a Figma file."""
    ids_param = ",".join(node_ids)
    res = requests.get(f"https://api.figma.com/v1/files/{file_key}/nodes?ids={ids_param}", headers=HEADERS)
    res.raise_for_status()
    return res.json()

def render_node_image(file_key: str, node_id: str, format: str = "png", scale: float = 2.0):
    """Render and download high-resolution raster or SVG preview of a specific node."""
    res = requests.get(
        f"https://api.figma.com/v1/images/{file_key}?ids={node_id}&format={format}&scale={scale}",
        headers=HEADERS
    )
    res.raise_for_status()
    return res.json()

if __name__ == "__main__":
    user = get_current_user()
    print(f"Connected to Figma as: {user.get('handle')} ({user.get('email')})")
