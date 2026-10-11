// ==============================================================================
// InsightFlow (Build Battle 2026) — Complete Figma Canvas Generator
// Run this directly in Figma's Console or as a Quick Figma Plugin
// How to run:
// 1. In Figma Desktop: Open your file.
// 2. Press Ctrl + Alt + I (or Plugins -> Development -> Open Console).
// 3. Paste this entire script and press Enter!
// ==============================================================================

(async function generateInsightFlowDesignSystem() {
  console.log("🚀 Starting InsightFlow Design System generation in Figma...");

  // Load fonts first
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const colors = {
    canvasBg: { r: 0.972, g: 0.976, b: 0.984 },       // #f8fafc
    cardBg: { r: 1.0, g: 1.0, b: 1.0 },               // #ffffff
    border: { r: 0.886, g: 0.910, b: 0.941 },         // #e2e8f0
    borderLight: { r: 0.945, g: 0.957, b: 0.973 },    // #f1f5f9
    textPrimary: { r: 0.059, g: 0.090, b: 0.165 },    // #0f172a
    textSecondary: { r: 0.278, g: 0.333, b: 0.416 },  // #475569
    textMuted: { r: 0.580, g: 0.639, b: 0.722 },      // #94a3b8
    indigo: { r: 0.310, g: 0.275, b: 0.898 },         // #4f46e5
    indigoLight: { r: 0.933, g: 0.949, b: 1.0 },      // #eef2ff
    emerald: { r: 0.063, g: 0.725, b: 0.506 },        // #10b981
    emeraldLight: { r: 0.925, g: 0.992, b: 0.961 },    // #ecfdf5
    amber: { r: 0.961, g: 0.620, b: 0.043 },          // #f59e0b
    amberLight: { r: 1.0, g: 0.984, b: 0.922 },        // #fffbeb
    rose: { r: 0.957, g: 0.247, b: 0.369 },           // #f43f5e
    roseLight: { r: 1.0, g: 0.945, b: 0.949 }         // #fff1f2
  };

  // Helper function to create solid paints
  const paint = (color) => [{ type: "SOLID", color }];

  // 1. Create Main Desktop Frame (1440 x 1024)
  const mainFrame = figma.createFrame();
  mainFrame.name = "InsightFlow — Executive Dashboard (BuildBattle 2026)";
  mainFrame.resize(1440, 1024);
  mainFrame.fills = paint(colors.canvasBg);
  mainFrame.x = 0;
  mainFrame.y = 0;

  // 2. Top Header Bar
  const header = figma.createFrame();
  header.name = "Top Navigation Bar";
  header.resize(1440, 72);
  header.fills = paint(colors.cardBg);
  header.strokes = paint(colors.border);
  header.strokeWeight = 1;
  header.layoutMode = "HORIZONTAL";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = 32;
  header.paddingRight = 32;
  mainFrame.appendChild(header);

  // Logo + Badge Left Group
  const logoGroup = figma.createFrame();
  logoGroup.name = "Logo Group";
  logoGroup.layoutMode = "HORIZONTAL";
  logoGroup.itemSpacing = 16;
  logoGroup.counterAxisAlignItems = "CENTER";
  logoGroup.fills = [];
  header.appendChild(logoGroup);

  const logoText = figma.createText();
  logoText.characters = "InsightFlow";
  logoText.fontName = { family: "Inter", style: "Bold" };
  logoText.fontSize = 20;
  logoText.fills = paint(colors.textPrimary);
  logoGroup.appendChild(logoText);

  const badge = figma.createFrame();
  badge.name = "Tier Badge";
  badge.layoutMode = "HORIZONTAL";
  badge.paddingLeft = 10;
  badge.paddingRight = 10;
  badge.paddingTop = 4;
  badge.paddingBottom = 4;
  badge.cornerRadius = 999;
  badge.fills = paint(colors.indigoLight);
  const badgeText = figma.createText();
  badgeText.characters = "ENTERPRISE · BUILD BATTLE 2026";
  badgeText.fontName = { family: "Inter", style: "Semi Bold" };
  badgeText.fontSize = 11;
  badgeText.fills = paint(colors.indigo);
  badge.appendChild(badgeText);
  logoGroup.appendChild(badge);

  // Right Header Controls (Workspace, Languages, Profile)
  const headerControls = figma.createFrame();
  headerControls.name = "Header Controls";
  headerControls.layoutMode = "HORIZONTAL";
  headerControls.itemSpacing = 12;
  headerControls.counterAxisAlignItems = "CENTER";
  headerControls.fills = [];
  header.appendChild(headerControls);

  // Language Pill
  const langPill = figma.createFrame();
  langPill.name = "Language Selector";
  langPill.layoutMode = "HORIZONTAL";
  langPill.paddingLeft = 12;
  langPill.paddingRight = 12;
  langPill.paddingTop = 6;
  langPill.paddingBottom = 6;
  langPill.cornerRadius = 8;
  langPill.fills = paint(colors.cardBg);
  langPill.strokes = paint(colors.border);
  langPill.strokeWeight = 1;
  const langText = figma.createText();
  langText.characters = "🌐 EN | తెలుగు | हिंदी";
  langText.fontName = { family: "Inter", style: "Medium" };
  langText.fontSize = 12;
  langText.fills = paint(colors.textSecondary);
  langPill.appendChild(langText);
  headerControls.appendChild(langPill);

  // 3. Main Dashboard Content Container (Auto-layout vertical)
  const content = figma.createFrame();
  content.name = "Dashboard Content Area";
  content.resize(1376, 920);
  content.x = 32;
  content.y = 96;
  content.fills = [];
  content.layoutMode = "VERTICAL";
  content.itemSpacing = 24;
  mainFrame.appendChild(content);

  // 4. Executive Key Metrics Bar (4 Cards Horizontal Auto-layout)
  const metricsBar = figma.createFrame();
  metricsBar.name = "Executive Key Metrics Bar";
  metricsBar.resize(1376, 120);
  metricsBar.layoutMode = "HORIZONTAL";
  metricsBar.itemSpacing = 20;
  metricsBar.fills = [];
  content.appendChild(metricsBar);

  const kpis = [
    { label: "DATA RELIABILITY SCORE", value: "9.4 / 10", badge: "GRADE A+", color: colors.emerald, light: colors.emeraldLight },
    { label: "NOISE REDUCTION", value: "14.2%", badge: "-1,024 NOISE ROWS", color: colors.indigo, light: colors.indigoLight },
    { label: "PII SANITIZED", value: "100%", badge: "ENTERPRISE HIPAA/GDPR", color: colors.emerald, light: colors.emeraldLight },
    { label: "LIVE FEEDBACK STREAM", value: "7,223", badge: "ADAPTION LABS v0.14", color: colors.amber, light: colors.amberLight }
  ];

  kpis.forEach((kpi) => {
    const card = figma.createFrame();
    card.name = `KPI: ${kpi.label}`;
    card.resize(329, 120);
    card.layoutMode = "VERTICAL";
    card.paddingLeft = 20;
    card.paddingRight = 20;
    card.paddingTop = 18;
    card.paddingBottom = 18;
    card.itemSpacing = 8;
    card.cornerRadius = 12;
    card.fills = paint(colors.cardBg);
    card.strokes = paint(colors.border);
    card.strokeWeight = 1;

    // KPI Label
    const lbl = figma.createText();
    lbl.characters = kpi.label;
    lbl.fontName = { family: "Inter", style: "Semi Bold" };
    lbl.fontSize = 11;
    lbl.fills = paint(colors.textSecondary);
    card.appendChild(lbl);

    // KPI Value & Badge Row
    const valRow = figma.createFrame();
    valRow.layoutMode = "HORIZONTAL";
    valRow.itemSpacing = 12;
    valRow.counterAxisAlignItems = "CENTER";
    valRow.fills = [];

    const val = figma.createText();
    val.characters = kpi.value;
    val.fontName = { family: "Inter", style: "Bold" };
    val.fontSize = 24;
    val.fills = paint(colors.textPrimary);
    valRow.appendChild(val);

    const b = figma.createFrame();
    b.paddingLeft = 8;
    b.paddingRight = 8;
    b.paddingTop = 3;
    b.paddingBottom = 3;
    b.cornerRadius = 999;
    b.fills = paint(kpi.light);
    const bt = figma.createText();
    bt.characters = kpi.badge;
    bt.fontName = { family: "Inter", style: "Bold" };
    bt.fontSize = 10;
    bt.fills = paint(kpi.color);
    b.appendChild(bt);
    valRow.appendChild(b);

    card.appendChild(valRow);
    metricsBar.appendChild(card);
  });

  // 5. Main Split Section: Severity Matrix (Left 65%) + Issue Tracker (Right 35%)
  const splitSection = figma.createFrame();
  splitSection.name = "Analytics & Operations Split View";
  splitSection.resize(1376, 750);
  splitSection.layoutMode = "HORIZONTAL";
  splitSection.itemSpacing = 24;
  splitSection.fills = [];
  content.appendChild(splitSection);

  // Left Panel: Severity Matrix & Causal Reasoning
  const leftPanel = figma.createFrame();
  leftPanel.name = "Severity Matrix & Causal Reasoning Trace";
  leftPanel.resize(872, 750);
  leftPanel.layoutMode = "VERTICAL";
  leftPanel.paddingLeft = 24;
  leftPanel.paddingRight = 24;
  leftPanel.paddingTop = 20;
  leftPanel.paddingBottom = 20;
  leftPanel.itemSpacing = 16;
  leftPanel.cornerRadius = 16;
  leftPanel.fills = paint(colors.cardBg);
  leftPanel.strokes = paint(colors.border);
  leftPanel.strokeWeight = 1;
  splitSection.appendChild(leftPanel);

  const matrixTitle = figma.createText();
  matrixTitle.characters = "Severity Blindness Elimination — 3-Hop Causal Reasoning";
  matrixTitle.fontName = { family: "Inter", style: "Bold" };
  matrixTitle.fontSize = 16;
  matrixTitle.fills = paint(colors.textPrimary);
  leftPanel.appendChild(matrixTitle);

  // Sample Rows for Causal Pipeline
  const traces = [
    { id: "P0 CRITICAL", root: "Broken Payment Gateway / OTP Timeout", impact: "$42.5k revenue at risk across 140 stalled transactions", action: "Auto-escalate to FinTech On-Call & rollback v4.21" },
    { id: "P1 HIGH", root: "Slow Dashboard Analytics Query (>12s)", impact: "High bounce rate during Q4 board reviews", action: "Trigger Postgres pg_stat partition re-index" },
    { id: "P2 MEDIUM", root: "App Dark Mode Icon Contrast", impact: "Minor UI complaint in mobile customer forum", action: "Queue for Sprint 45 styling batch" }
  ];

  traces.forEach((tr) => {
    const row = figma.createFrame();
    row.name = `Trace: ${tr.id}`;
    row.resize(824, 110);
    row.layoutMode = "VERTICAL";
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.paddingTop = 14;
    row.paddingBottom = 14;
    row.itemSpacing = 6;
    row.cornerRadius = 10;
    row.fills = paint(colors.borderLight);
    row.strokes = paint(colors.border);
    row.strokeWeight = 1;

    const rHeader = figma.createText();
    rHeader.characters = `${tr.id} · Root Cause: ${tr.root}`;
    rHeader.fontName = { family: "Inter", style: "Semi Bold" };
    rHeader.fontSize = 13;
    rHeader.fills = tr.id.includes("P0") ? paint(colors.rose) : tr.id.includes("P1") ? paint(colors.amber) : paint(colors.indigo);
    row.appendChild(rHeader);

    const rImpact = figma.createText();
    rImpact.characters = `💥 Business Impact: ${tr.impact}`;
    rImpact.fontName = { family: "Inter", style: "Regular" };
    rImpact.fontSize = 12;
    rImpact.fills = paint(colors.textSecondary);
    row.appendChild(rImpact);

    const rAction = figma.createText();
    rAction.characters = `✅ Prescribed Action: ${tr.action}`;
    rAction.fontName = { family: "Inter", style: "Medium" };
    rAction.fontSize = 12;
    rAction.fills = paint(colors.emerald);
    row.appendChild(rAction);

    leftPanel.appendChild(row);
  });

  // Right Panel: 4-Stage Issue Delivery Tracker & Multilingual Voice Note
  const rightPanel = figma.createFrame();
  rightPanel.name = "Delivery-Style Issue Tracker";
  rightPanel.resize(480, 750);
  rightPanel.layoutMode = "VERTICAL";
  rightPanel.paddingLeft = 24;
  rightPanel.paddingRight = 24;
  rightPanel.paddingTop = 20;
  rightPanel.paddingBottom = 20;
  rightPanel.itemSpacing = 20;
  rightPanel.cornerRadius = 16;
  rightPanel.fills = paint(colors.cardBg);
  rightPanel.strokes = paint(colors.border);
  rightPanel.strokeWeight = 1;
  splitSection.appendChild(rightPanel);

  const trackerTitle = figma.createText();
  trackerTitle.characters = "Issue Lifecycle Tracker (ISS-101)";
  trackerTitle.fontName = { family: "Inter", style: "Bold" };
  trackerTitle.fontSize = 16;
  trackerTitle.fills = paint(colors.textPrimary);
  rightPanel.appendChild(trackerTitle);

  const stages = [
    { stage: "1. Reported", time: "10:14 AM", status: "COMPLETED", icon: "✓" },
    { stage: "2. Triaged", time: "10:22 AM", status: "P0 ASSIGNED", icon: "✓" },
    { stage: "3. In Progress", time: "10:45 AM", status: "ACTIVE ENGINE", icon: "●" },
    { stage: "4. Resolved", time: "Pending", status: "GEMINI 1.5 AUDIO VERIFIED", icon: "○" }
  ];

  stages.forEach((st) => {
    const sCard = figma.createFrame();
    sCard.name = st.stage;
    sCard.resize(432, 60);
    sCard.layoutMode = "HORIZONTAL";
    sCard.primaryAxisAlignItems = "SPACE_BETWEEN";
    sCard.counterAxisAlignItems = "CENTER";
    sCard.paddingLeft = 16;
    sCard.paddingRight = 16;
    sCard.cornerRadius = 8;
    sCard.fills = paint(st.status === "ACTIVE ENGINE" ? colors.indigoLight : colors.borderLight);

    const sLeft = figma.createText();
    sLeft.characters = `${st.icon}  ${st.stage} (${st.time})`;
    sLeft.fontName = { family: "Inter", style: "Semi Bold" };
    sLeft.fontSize = 12;
    sLeft.fills = st.status === "ACTIVE ENGINE" ? paint(colors.indigo) : paint(colors.textPrimary);
    sCard.appendChild(sLeft);

    const sRight = figma.createText();
    sRight.characters = st.status;
    sRight.fontName = { family: "Inter", style: "Bold" };
    sRight.fontSize = 10;
    sRight.fills = st.status === "ACTIVE ENGINE" ? paint(colors.indigo) : paint(colors.textSecondary);
    sCard.appendChild(sRight);

    rightPanel.appendChild(sCard);
  });

  // Multilingual Voice Note Box
  const voiceBox = figma.createFrame();
  voiceBox.name = "Multilingual Voice Resolution (Telugu / Hindi / English)";
  voiceBox.resize(432, 120);
  voiceBox.layoutMode = "VERTICAL";
  voiceBox.paddingLeft = 16;
  voiceBox.paddingRight = 16;
  voiceBox.paddingTop = 14;
  voiceBox.paddingBottom = 14;
  voiceBox.itemSpacing = 8;
  voiceBox.cornerRadius = 10;
  voiceBox.fills = paint(colors.indigoLight);
  voiceBox.strokes = paint(colors.indigo);
  voiceBox.strokeWeight = 1;

  const vTitle = figma.createText();
  vTitle.characters = "🎙️ Gemini 1.5 Multilingual Resolution Note";
  vTitle.fontName = { family: "Inter", style: "Bold" };
  vTitle.fontSize = 12;
  vTitle.fills = paint(colors.indigo);
  voiceBox.appendChild(vTitle);

  const vAudio = figma.createText();
  vAudio.characters = "Native Audio: 'చెల్లింపుల గేట్‌వే సరిచేయబడింది' (Telugu)";
  vAudio.fontName = { family: "Inter", style: "Regular" };
  vAudio.fontSize = 11;
  vAudio.fills = paint(colors.textSecondary);
  voiceBox.appendChild(vAudio);

  const vTrans = figma.createText();
  vTrans.characters = "AI Resolution: Payment gateway schema verified and transaction rollback complete.";
  vTrans.fontName = { family: "Inter", style: "Semi Bold" };
  vTrans.fontSize = 11;
  vTrans.fills = paint(colors.textPrimary);
  voiceBox.appendChild(vTrans);

  rightPanel.appendChild(voiceBox);

  // Zoom into generated frame
  figma.viewport.scrollAndZoomIntoView([mainFrame]);

  console.log("✅ InsightFlow Executive Dashboard successfully created in Figma!");
})();
