import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import NoesisLogo from '../components/NoesisLogo';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Cpu,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown,
  Layers,
  Zap,
  Activity,
  AlertTriangle
} from 'lucide-react';
import './LandingHero.css';

gsap.registerPlugin(ScrollTrigger);

// Raw customer feedback complaint snippets for floating 3D text in Scene 1
const RAW_COMPLAINTS = [
  '⚠️ My account was hacked! ($4,500 wire stolen)',
  '⚠️ Scammed by unverified seller, zero delivery',
  '⏳ My delivery is 8 days late! Where is it?',
  '💥 The app crashed at checkout during payment',
  '⚠️ Counterfeit luxury item delivered by merchant',
  '⏳ Customer service is unresponsive for 72+ hours',
  '💥 Refund denied with zero explanation given',
  '⚠️ Off-platform payment demanded via private chat'
];

export default function LandingHero({ onLaunchWorkspace }) {
  const mountRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const { t } = useTranslation();

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- 1. THREE.JS SCENE SETUP (100% PURE LIGHT THEME CANVAS) ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Crisp Slate-50 canvas throughout
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.02);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Bright Ambient & Key Lighting for crisp light theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x4f46e5, 1.0);
    keyLight.position.set(6, 10, 12);
    scene.add(keyLight);

    // --- 2. 1,200 RAW FEEDBACK DOTS ENGINE (CHAOS -> FUNNEL -> STRUCTURED CRYSTAL GRID) ---
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const chaoticTargets = new Float32Array(particleCount * 3);
    const funnelTargets = new Float32Array(particleCount * 3);
    const structuredGridTargets = new Float32Array(particleCount * 3);

    // Palette calibrated for crisp light background
    const colDustySlate = new THREE.Color(0x64748b); // Unstructured noise
    const colRawCrimson = new THREE.Color(0xe11d48); // High-friction complaint
    const colRawAmber = new THREE.Color(0xd97706);   // SLA delay friction
    const colIndigo = new THREE.Color(0x4f46e5);     // Adaption processing stream
    const colRose = new THREE.Color(0xe11d48);       // Structured Critical Fraud
    const colAmber = new THREE.Color(0xd97706);      // Structured SLA Warning
    const colEmerald = new THREE.Color(0x059669);    // Structured Resolved Safe

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Phase 1 (0-33%): Complete Chaotic Feedback Cloud
      const cx = (Math.random() - 0.5) * 34;
      const cy = (Math.random() - 0.5) * 22;
      const cz = (Math.random() - 0.5) * 24;
      positions[i3] = cx;
      positions[i3 + 1] = cy;
      positions[i3 + 2] = cz;
      chaoticTargets[i3] = cx;
      chaoticTargets[i3 + 1] = cy;
      chaoticTargets[i3 + 2] = cz;

      // Phase 2 (33-66%): Fluid Streamlines Funneling into Central Processing Channel
      const theta = (i / particleCount) * Math.PI * 8; // Spiral streamlines
      const radius = 1.0 + Math.pow(Math.random(), 1.5) * 4.5;
      const zF = ((i % 40) - 20) * 0.7;
      funnelTargets[i3] = Math.cos(theta) * radius;
      funnelTargets[i3 + 1] = Math.sin(theta) * radius;
      funnelTargets[i3 + 2] = zF;

      // Phase 3 (66-100%): Pristine Structured Mathematical Matrix (3 Clean Semantic Columns)
      const column = i % 3; // 0 = Rose (Fraud), 1 = Amber (Support), 2 = Emerald (Resolved)
      const colX = (column - 1) * 11.5;
      const rowY = Math.floor(i / 3) % 25; // 25 rows
      const gridY = (rowY - 12) * 0.85;
      const depthZ = -4.0 + (Math.floor(i / 75) % 4) * 0.5; // Multi-layer depth behind cards
      structuredGridTargets[i3] = colX + ((i % 5) - 2) * 0.55;
      structuredGridTargets[i3 + 1] = gridY;
      structuredGridTargets[i3 + 2] = depthZ;

      // Initial Phase 1 colors (scattered raw feedback tickets)
      const randType = Math.random();
      const baseCol = randType > 0.6 ? colRawCrimson : randType > 0.3 ? colDustySlate : colRawAmber;
      colors[i3] = baseCol.r;
      colors[i3 + 1] = baseCol.g;
      colors[i3 + 2] = baseCol.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp high-resolution radial dot texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, 'rgba(15, 23, 42, 1)');
    pGrad.addColorStop(0.35, 'rgba(79, 70, 229, 0.85)');
    pGrad.addColorStop(1, 'rgba(79, 70, 229, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 30, 0, Math.PI * 2);
    pCtx.fill();

    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- 3. FLOATING 3D COMPLAINT BILLBOARDS (SCENE 1 ONLY) ---
    const billboardsGroup = new THREE.Group();
    const billboardSprites = [];

    RAW_COMPLAINTS.forEach((txt, idx) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 512;
      bCanvas.height = 110;
      const bCtx = bCanvas.getContext('2d');

      // Crisp White Glass Pill with subtle color border
      bCtx.fillStyle = '#ffffff';
      bCtx.strokeStyle = txt.includes('hacked') || txt.includes('Scammed') ? '#e11d48' : '#cbd5e1';
      bCtx.lineWidth = 3;
      bCtx.beginPath();
      bCtx.roundRect(8, 8, 496, 94, 20);
      bCtx.fill();
      bCtx.stroke();

      bCtx.font = 'bold 22px -apple-system, sans-serif';
      bCtx.fillStyle = '#0f172a';
      bCtx.fillText(txt, 24, 58);

      const bTex = new THREE.CanvasTexture(bCanvas);
      const bMat = new THREE.SpriteMaterial({
        map: bTex,
        transparent: true,
        opacity: 0.95
      });
      const sprite = new THREE.Sprite(bMat);

      const sx = (Math.random() - 0.5) * 20;
      const sy = (Math.random() - 0.5) * 14;
      const sz = 2 + (Math.random() - 0.5) * 12;
      sprite.position.set(sx, sy, sz);
      sprite.scale.set(4.6, 1.05, 1);

      billboardsGroup.add(sprite);
      billboardSprites.push({
        sprite,
        origin: new THREE.Vector3(sx, sy, sz),
        driftSpeed: 0.2 + Math.random() * 0.3
      });
    });
    scene.add(billboardsGroup);

    // --- 4. INTERACTIVE MOUSE PARALLAX & DISPERSION ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onPointerMove);

    // --- 5. GSAP SCROLLTRIGGER ORCHESTRATION ---
    const animState = { progress: 0 };

    const st = ScrollTrigger.create({
      trigger: scrollTrackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        animState.progress = p;
        setScrollProgress(p);

        const posAttr = particleGeometry.attributes.position;
        const colAttr = particleGeometry.attributes.color;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let tx, ty, tz;

          if (p < 0.5) {
            // Phase 1 -> Phase 2 (Chaos -> Streamlines)
            const t = p * 2.0;
            tx = THREE.MathUtils.lerp(chaoticTargets[i3], funnelTargets[i3], t);
            ty = THREE.MathUtils.lerp(chaoticTargets[i3 + 1], funnelTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(chaoticTargets[i3 + 2], funnelTargets[i3 + 2], t);

            // Morph into Adaption Indigo stream
            colAttr.array[i3] = THREE.MathUtils.lerp(colors[i3], colIndigo.r, t * 0.85);
            colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colors[i3 + 1], colIndigo.g, t * 0.85);
            colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colors[i3 + 2], colIndigo.b, t * 0.85);
          } else {
            // Phase 2 -> Phase 3 (Streamlines -> Clean Structured Matrix Grid)
            const t = (p - 0.5) * 2.0;
            tx = THREE.MathUtils.lerp(funnelTargets[i3], structuredGridTargets[i3], t);
            ty = THREE.MathUtils.lerp(funnelTargets[i3 + 1], structuredGridTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(funnelTargets[i3 + 2], structuredGridTargets[i3 + 2], t);

            // Snap into Structured Semantic Colors (Rose, Amber, Emerald)
            const colIdx = i % 3;
            const targetColor = colIdx === 0 ? colRose : colIdx === 1 ? colAmber : colEmerald;
            colAttr.array[i3] = THREE.MathUtils.lerp(colIndigo.r, targetColor.r, t);
            colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colIndigo.g, targetColor.g, t);
            colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colIndigo.b, targetColor.b, t);
          }

          posAttr.array[i3] = tx;
          posAttr.array[i3 + 1] = ty;
          posAttr.array[i3 + 2] = tz;
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // Billboards fade out as scroll progresses into the streamline phase
        const billboardOpacity = Math.max(0, 1 - p * 2.6);
        billboardSprites.forEach(({ sprite, origin }) => {
          sprite.material.opacity = billboardOpacity;
          sprite.position.x = THREE.MathUtils.lerp(origin.x, 0, Math.min(1, p * 2));
          sprite.position.y = THREE.MathUtils.lerp(origin.y, 0, Math.min(1, p * 2));
        });

        // Smooth camera dolly
        camera.position.z = THREE.MathUtils.lerp(22, 16, p);
      }
    });

    // --- 6. ANIMATION LOOP ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Mouse Parallax across particles
      if (animState.progress < 0.6) {
        camera.position.x = mouse.x * 2.0;
        camera.position.y = mouse.y * 1.2;
        particleSystem.rotation.y = elapsedTime * 0.025 + mouse.x * 0.15;

        billboardSprites.forEach(({ sprite, origin, driftSpeed }, idx) => {
          sprite.position.y = origin.y + Math.sin(elapsedTime * driftSpeed + idx) * 0.3;
        });
      } else {
        // Subtle ambient breathing on structured matrix grid
        particleSystem.rotation.y = Math.sin(elapsedTime * 0.5) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      st.kill();
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="landing-hero-root">
      {/* Luminous Executive Navigation Header */}
      <header className="landing-hero-nav">
        <div className="landing-brand" onClick={onLaunchWorkspace} style={{ cursor: 'pointer' }}>
          <NoesisLogo height={42} showTagline={true} />
        </div>

        <div className="nav-actions">
          <LanguageSelector />

          <div className="nav-pill-badge">
            <span className="pulse-dot" />
            <span>Adaption Engine v0.14 Active</span>
          </div>

          <button className="btn-launch-nav" onClick={onLaunchWorkspace}>
            {t('nav.launch', 'Launch Workspace')}
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Fixed WebGL Canvas Behind Content */}
      <div className="canvas-container" ref={mountRef} />

      {/* 300vh Scroll Narrative Track */}
      <div className="scroll-track" ref={scrollTrackRef}>
        {/* SCENE 1 (Scroll 0% - 33%): The Chaos of "Severity Blindness" */}
        <section className="stage-section">
          <div
            className="stage-badge badge-crimson"
            style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#be123c',
              boxShadow: '0 1px 2px rgba(190, 18, 60, 0.04)'
            }}
          >
            <ShieldAlert size={15} color="#be123c" />
            Scene 01 • The Chaos of Severity Blindness
          </div>

          <h1
            className="stage-title"
            style={{
              color: '#0f172a',
              letterSpacing: '-0.045em',
              fontWeight: 900
            }}
          >
            Your business is noise.
          </h1>

          <p className="stage-subtitle">
            You have 10,000 raw customer feedback tickets floating chaotically, but you don't know which one will cost you your company today. Legacy sentiment engines treat a 1-star packaging tear identically to a $45,000 escrow wire fraud attack.
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">Unstructured Feedback</div>
              <div className="hud-chip-val">10,000+</div>
              <div className="hud-chip-sub">Raw, noisy customer tickets</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Severe Churn Risk</div>
              <div className="hud-chip-val" style={{ color: '#e11d48' }}>$305,000</div>
              <div className="hud-chip-sub">Hidden inside 3 friction clusters</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Severity Blindness</div>
              <div className="hud-chip-val" style={{ color: '#d97706' }}>100% Blind</div>
              <div className="hud-chip-sub">Catastrophic threats go undetected</div>
            </div>
          </div>
        </section>

        {/* SCENE 2 (Scroll 33% - 66%): The Adaption Living Data Engine */}
        <section className="stage-section">
          <div className="stage-badge badge-indigo">
            <Cpu size={15} />
            Scene 02 • The Adaption Intelligence Engine
          </div>

          <h2
            className="stage-title"
            style={{
              color: '#0f172a',
              letterSpacing: '-0.045em',
              fontWeight: 900
            }}
          >
            NOESIS intercepts the chaos.
          </h2>

          <p className="stage-subtitle">
            Powered by Adaption Labs, the raw feedback dots streamline into real-time conditioning. Active recipes sanitize emotional hyperbole, eliminate 14.2% duplicate noise, redact PII, and attach verified causal reasoning traces.
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">Living Data Stream</div>
              <div className="hud-chip-val" style={{ color: '#4f46e5' }}>Active Funnel</div>
              <div className="hud-chip-sub">Real-time prompt conditioning</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Prompt Deduplication</div>
              <div className="hud-chip-val" style={{ color: '#0284c7' }}>94.1%</div>
              <div className="hud-chip-sub">Noise compressed into root causes</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Quality Score Uplift</div>
              <div className="hud-chip-val" style={{ color: '#059669' }}>6.8 → 9.4</div>
              <div className="hud-chip-sub">Grade A+ (96th percentile)</div>
            </div>
          </div>
        </section>

        {/* SCENE 3 (Scroll 66% - 100%): Clean Structured Clarity */}
        <section className="stage-section">
          <div className="scene3-container">
            <div className="stage-badge badge-emerald">
              <CheckCircle2 size={15} />
              Scene 03 • Structured Clarity & Decision Velocity
            </div>

            <h2 className="stage-title">
              Cure Severity Blindness. Turn raw feedback into intelligent action.
            </h2>

            <p className="stage-subtitle">
              Notice how the feedback dots have locked into a pristine, structured matrix in the background. Chaotic complaints have emerged as verified, role-conditioned Kanban tickets synchronized with Supabase Cloud.
            </p>

            {/* Pristine 3-Card Color-Coded Kanban Emergence Grid */}
            <div className="scene3-cards-grid">
              {/* Card 1: Critical Rose (Sarah Jenkins) */}
              <div className="action-kanban-card">
                <div className="card-top-stripe stripe-rose" />
                <span className="card-badge badge-rose">
                  <ShieldAlert size={13} />
                  Rose • Critical Threat
                </span>
                <div className="card-title">Off-Platform Seller Escrow Scam</div>
                <div className="card-desc">
                  1,286 reports of fraudulent sellers bypassing platform escrow. P0 seller payout freeze directive auto-generated.
                </div>
                <div className="card-footer">
                  <span className="card-owner">Sarah Jenkins (Trust & Safety)</span>
                  <span className="card-impact" style={{ color: '#e11d48' }}>$305,000 At-Risk</span>
                </div>
              </div>

              {/* Card 2: Warning Amber (Marcus Chen) */}
              <div className="action-kanban-card">
                <div className="card-top-stripe stripe-amber" />
                <span className="card-badge badge-amber">
                  <AlertTriangle size={13} />
                  Amber • SLA Warning
                </span>
                <div className="card-title">Customer Support Delay &gt; 48h</div>
                <div className="card-desc">
                  1,227 complaints regarding support queue backlog during promotional spikes. Auto-routed to Senior Tier escalation.
                </div>
                <div className="card-footer">
                  <span className="card-owner">Marcus Chen (Support CX)</span>
                  <span className="card-impact" style={{ color: '#d97706' }}>420 Churn Risk</span>
                </div>
              </div>

              {/* Card 3: Safe Emerald (Elena Vance) */}
              <div className="action-kanban-card">
                <div className="card-top-stripe stripe-emerald" />
                <span className="card-badge badge-emerald-card">
                  <CheckCircle2 size={13} />
                  Emerald • Resolved
                </span>
                <div className="card-title">Proactive Carrier SMS Updates</div>
                <div className="card-desc">
                  Automated delivery tracking SMS deployed. Logistics delay friction mitigated with +18.4% NPS retention boost.
                </div>
                <div className="card-footer">
                  <span className="card-owner">Elena Vance (CEO Briefing)</span>
                  <span className="card-impact" style={{ color: '#059669' }}>+18.4% NPS</span>
                </div>
              </div>
            </div>

            {/* Final Launch Actions */}
            <div className="cta-group">
              <button className="btn-launch-hero" onClick={onLaunchWorkspace}>
                Launch Enterprise Workspace
                <ArrowRight size={18} />
              </button>
              <button
                className="btn-secondary-hero"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Replay Story
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Scroll Indicator */}
      {scrollProgress < 0.85 && (
        <div className="scroll-indicator">
          <span>Scroll to Structure Data</span>
          <div style={{ width: 1, height: 26, background: 'linear-gradient(to bottom, #4f46e5, transparent)' }} />
        </div>
      )}
    </div>
  );
}
