import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
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

// Raw verbatim customer friction snippets for 3D billboard text in Scene 1
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
  const rootRef = useRef(null);
  const { t } = useTranslation();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const darkBgColor = new THREE.Color(0x050811);
    const lightBgColor = new THREE.Color(0xf8fafc);
    scene.background = darkBgColor.clone();
    scene.fog = new THREE.FogExp2(0x050811, 0.022);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const funnelPointLight = new THREE.PointLight(0x06b6d4, 3.5, 60);
    funnelPointLight.position.set(0, 0, 2);
    scene.add(funnelPointLight);

    const indigoLight = new THREE.PointLight(0x6366f1, 2.5, 50);
    indigoLight.position.set(0, 4, 10);
    scene.add(indigoLight);

    // --- 2. 1,000 CHAOTIC PARTICLES (RAW COMPLAINT FIELD) ---
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const chaoticTargets = new Float32Array(particleCount * 3);
    const funnelTargets = new Float32Array(particleCount * 3);
    const clarityTargets = new Float32Array(particleCount * 3);

    // Color definitions
    const colDullGray = new THREE.Color(0x64748b);     // Noisy gray (Scene 1)
    const colDimRed = new THREE.Color(0xef4444);       // Dim danger red (Scene 1)
    const colNeonCyan = new THREE.Color(0x06b6d4);     // Groq/Adaption Pipeline (Scene 2)
    const colNeonIndigo = new THREE.Color(0x6366f1);   // Pipeline glow (Scene 2)
    const colEmerald = new THREE.Color(0x10b981);      // Scene 3 Safe
    const colAmber = new THREE.Color(0xf59e0b);        // Scene 3 Warning
    const colRose = new THREE.Color(0xe11d48);         // Scene 3 Critical

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Scene 1 (0-33%): Wide chaotic cloud
      const cx = (Math.random() - 0.5) * 36;
      const cy = (Math.random() - 0.5) * 24;
      const cz = (Math.random() - 0.5) * 28;
      positions[i3] = cx;
      positions[i3 + 1] = cy;
      positions[i3 + 2] = cz;
      chaoticTargets[i3] = cx;
      chaoticTargets[i3 + 1] = cy;
      chaoticTargets[i3 + 2] = cz;

      // Scene 2 (33-66%): Hyper-funnel logarithmic vortex
      const theta = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.pow(Math.random(), 2) * 3.5;
      const zF = (Math.random() - 0.5) * 22;
      funnelTargets[i3] = Math.cos(theta) * r;
      funnelTargets[i3 + 1] = Math.sin(theta) * r;
      funnelTargets[i3 + 2] = zF;

      // Scene 3 (66-100%): Clean ambient streams in background
      const streamCol = i % 3;
      const streamX = (streamCol - 1) * 11;
      const streamY = ((i % 30) - 15) * 0.9;
      clarityTargets[i3] = streamX + (Math.random() - 0.5) * 2;
      clarityTargets[i3 + 1] = streamY;
      clarityTargets[i3 + 2] = -4; // Safely behind cards

      // Initial Scene 1 Colors (70% noisy gray, 30% dim red)
      const baseCol = Math.random() > 0.3 ? colDullGray : colDimRed;
      colors[i3] = baseCol.r;
      colors[i3 + 1] = baseCol.g;
      colors[i3 + 2] = baseCol.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Radial glowing particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)');
    pGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
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
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- 3. HIGH-TECH GLOWING CENTRAL FUNNEL (ADAPTION & GROQ PIPELINE) ---
    const pipelineGroup = new THREE.Group();

    // Cylindrical cyber-vortex mesh
    const tunnelGeo = new THREE.CylinderGeometry(1.4, 6.0, 26, 32, 16, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const tunnelMesh = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnelMesh.rotation.x = Math.PI / 2;
    pipelineGroup.add(tunnelMesh);

    // Pulsing Neon Accelerator Rings
    const rings = [];
    for (let r = 0; r < 8; r++) {
      const ringGeo = new THREE.TorusGeometry(1.6 + r * 0.5, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x06b6d4 : 0x6366f1,
        transparent: true,
        opacity: 0.35
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = (r - 4) * 3.2;
      pipelineGroup.add(ring);
      rings.push(ring);
    }
    scene.add(pipelineGroup);

    // --- 4. FLOATING 3D COMPLAINT BILLBOARDS (SCENE 1 CHAOS) ---
    const billboardsGroup = new THREE.Group();
    const billboardSprites = [];

    RAW_COMPLAINTS.forEach((txt, idx) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 512;
      bCanvas.height = 110;
      const bCtx = bCanvas.getContext('2d');

      // Dark glass pill with subtle border
      bCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      bCtx.strokeStyle = txt.includes('hacked') || txt.includes('Scammed') ? '#ef4444' : '#64748b';
      bCtx.lineWidth = 3;
      bCtx.beginPath();
      bCtx.roundRect(8, 8, 496, 94, 20);
      bCtx.fill();
      bCtx.stroke();

      bCtx.font = 'bold 22px -apple-system, sans-serif';
      bCtx.fillStyle = '#f8fafc';
      bCtx.fillText(txt, 24, 58);

      const bTex = new THREE.CanvasTexture(bCanvas);
      const bMat = new THREE.SpriteMaterial({
        map: bTex,
        transparent: true,
        opacity: 0.95
      });
      const sprite = new THREE.Sprite(bMat);

      const sx = (Math.random() - 0.5) * 22;
      const sy = (Math.random() - 0.5) * 16;
      const sz = 2 + (Math.random() - 0.5) * 16;
      sprite.position.set(sx, sy, sz);
      sprite.scale.set(4.8, 1.1, 1);

      billboardsGroup.add(sprite);
      billboardSprites.push({
        sprite,
        origin: new THREE.Vector3(sx, sy, sz),
        driftSpeed: 0.2 + Math.random() * 0.3
      });
    });
    scene.add(billboardsGroup);

    // --- 5. INTERACTIVE MOUSE REACTION (SCENE 1 TURBULENCE) ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onPointerMove);

    // --- 6. GSAP SCROLLTRIGGER ORCHESTRATION ---
    const animState = { progress: 0 };

    const st = ScrollTrigger.create({
      trigger: scrollTrackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      onUpdate: (self) => {
        const p = self.progress; // 0.0 to 1.0
        animState.progress = p;
        setScrollProgress(p);

        // Scene tracking
        if (p < 0.33) {
          setActiveScene(1);
          setIsLightMode(false);
        } else if (p < 0.66) {
          setActiveScene(2);
          setIsLightMode(false);
        } else {
          setActiveScene(3);
          setIsLightMode(true);
        }

        // --- BACKGROUND COLOR TRANSITION ---
        if (p < 0.66) {
          scene.background.copy(darkBgColor);
          scene.fog.color.copy(darkBgColor);
          scene.fog.density = 0.022;
        } else {
          // Smooth blend into crisp light theme canvas (#f8fafc)
          const lightT = (p - 0.66) / 0.34;
          scene.background.lerpColors(darkBgColor, lightBgColor, lightT);
          scene.fog.color.lerpColors(darkBgColor, lightBgColor, lightT);
          scene.fog.density = 0.022 * (1 - lightT * 0.5);
        }

        // --- PARTICLE WARP & RESTRUCTURING ---
        const posAttr = particleGeometry.attributes.position;
        const colAttr = particleGeometry.attributes.color;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let tx, ty, tz;

          if (p < 0.5) {
            // Scene 1 -> Scene 2 (Chaos sucked into Funnel)
            const t = p * 2.0;
            tx = THREE.MathUtils.lerp(chaoticTargets[i3], funnelTargets[i3], t);
            ty = THREE.MathUtils.lerp(chaoticTargets[i3 + 1], funnelTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(chaoticTargets[i3 + 2], funnelTargets[i3 + 2], t);

            // Morph colors into Glowing Cyan & Indigo
            const targetColor = i % 2 === 0 ? colNeonCyan : colNeonIndigo;
            colAttr.array[i3] = THREE.MathUtils.lerp(colors[i3], targetColor.r, t);
            colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colors[i3 + 1], targetColor.g, t);
            colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colors[i3 + 2], targetColor.b, t);
          } else {
            // Scene 2 -> Scene 3 (Funnel -> Emergence in Clarity)
            const t = (p - 0.5) * 2.0;
            tx = THREE.MathUtils.lerp(funnelTargets[i3], clarityTargets[i3], t);
            ty = THREE.MathUtils.lerp(funnelTargets[i3 + 1], clarityTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(funnelTargets[i3 + 2], clarityTargets[i3 + 2], t);

            // Transform into Kanban Column Palettes (Rose, Amber, Emerald)
            const colIdx = i % 3;
            const targetColor = colIdx === 0 ? colRose : colIdx === 1 ? colAmber : colEmerald;
            colAttr.array[i3] = THREE.MathUtils.lerp(colNeonCyan.r, targetColor.r, t);
            colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colNeonCyan.g, targetColor.g, t);
            colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colNeonCyan.b, targetColor.b, t);
          }

          posAttr.array[i3] = tx;
          posAttr.array[i3 + 1] = ty;
          posAttr.array[i3 + 2] = tz;
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // Billboards fade out as they are pulled into the funnel
        const billboardOpacity = Math.max(0, 1 - p * 2.5);
        billboardSprites.forEach(({ sprite, origin }) => {
          sprite.material.opacity = billboardOpacity;
          // Pull inward toward funnel
          sprite.position.x = THREE.MathUtils.lerp(origin.x, 0, Math.min(1, p * 2));
          sprite.position.y = THREE.MathUtils.lerp(origin.y, 0, Math.min(1, p * 2));
        });

        // Pipeline visibility (peaks at p=0.5)
        const pipelineOpacity = p < 0.5 ? p * 2.0 : Math.max(0, (1 - p) * 2.2);
        tunnelMat.opacity = Math.min(0.22, pipelineOpacity * 0.22);
        rings.forEach((ring) => {
          ring.material.opacity = Math.min(0.7, pipelineOpacity * 0.7);
        });

        // --- CAMERA ZOOMING WARP EFFECT ---
        if (p < 0.5) {
          // Zoom in toward the funnel entrance (24 down to 5.5)
          camera.position.z = THREE.MathUtils.lerp(24, 5.5, p * 2.0);
        } else {
          // Fly through the end of the funnel and dolly back out into the bright workspace (5.5 out to 15)
          camera.position.z = THREE.MathUtils.lerp(5.5, 15, (p - 0.5) * 2.0);
        }
      }
    });

    // --- 7. ANIMATION LOOP ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Mouse Parallax in Scene 1
      if (animState.progress < 0.4) {
        camera.position.x = mouse.x * 2.5;
        camera.position.y = mouse.y * 1.5;
        particleSystem.rotation.y = elapsedTime * 0.03 + mouse.x * 0.2;
        particleSystem.rotation.x = mouse.y * 0.1;

        // Subtle organic float for billboards
        billboardSprites.forEach(({ sprite, origin, driftSpeed }, idx) => {
          sprite.position.y = origin.y + Math.sin(elapsedTime * driftSpeed + idx) * 0.35;
        });
      }

      // High-speed vortex spinning in Scene 2
      tunnelMesh.rotation.z = elapsedTime * 0.6;
      rings.forEach((ring, idx) => {
        ring.rotation.z = -elapsedTime * (0.3 + idx * 0.08);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
    <div
      ref={rootRef}
      className={`landing-hero-root ${isLightMode ? 'light-mode-active' : ''}`}
    >
      {/* Sticky Navigation Bar */}
      <header className="landing-hero-nav">
        <div className="landing-brand" onClick={onLaunchWorkspace}>
          <div className="brand-icon-gem">
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <div className="brand-title">InsightFlow</div>
            <div style={{ fontSize: '0.68rem', color: isLightMode ? '#64748b' : '#94a3b8' }}>
              Powered by Adaption Labs
            </div>
          </div>
          <span className="brand-tag">Build Battle 2026</span>
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
          <div className="stage-badge badge-dark-abyss">
            <ShieldAlert size={15} />
            Scene 01 • The Chaos of Severity Blindness
          </div>

          <h1 className="stage-title title-glow-dark">
            Your business is drowning in noise.
          </h1>

          <p className="stage-subtitle">
            You have 10,000 customer feedback tickets, but you don't know which one will cost you your company today. Legacy sentiment engines treat a 1-star packaging tear identically to a $45,000 escrow wire fraud attack.
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">Unstructured Tickets</div>
              <div className="hud-chip-val">10,000+</div>
              <div className="hud-chip-sub">Raw, noisy customer complaints</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Severe Churn Risk</div>
              <div className="hud-chip-val" style={{ color: '#ef4444' }}>$305,000</div>
              <div className="hud-chip-sub">Hidden inside 3 friction clusters</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Severity Blindness</div>
              <div className="hud-chip-val" style={{ color: '#f59e0b' }}>100% Blind</div>
              <div className="hud-chip-sub">Catastrophic threats go undetected</div>
            </div>
          </div>
        </section>

        {/* SCENE 2 (Scroll 33% - 66%): The Adaption Intelligence Engine */}
        <section className="stage-section">
          <div className="stage-badge badge-neon-warp">
            <Cpu size={15} />
            Scene 02 • The Adaption Intelligence Engine
          </div>

          <h2 className="stage-title title-glow-neon">
            InsightFlow intercepts the chaos.
          </h2>

          <p className="stage-subtitle">
            Powered by Adaption Labs, we map, categorize, and score your data in milliseconds. Active recipes sanitize emotional hyperbole, eliminate 14.2% duplicate noise, redact PII, and attach verified causal reasoning traces.
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">Living Data Pipeline</div>
              <div className="hud-chip-val" style={{ color: '#06b6d4' }}>Active Vortex</div>
              <div className="hud-chip-sub">Real-time prompt conditioning</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Prompt Deduplication</div>
              <div className="hud-chip-val" style={{ color: '#818cf8' }}>94.1%</div>
              <div className="hud-chip-sub">Noise compressed into root causes</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">Quality Score Uplift</div>
              <div className="hud-chip-val" style={{ color: '#10b981' }}>6.8 → 9.4</div>
              <div className="hud-chip-sub">Grade A+ (96th percentile)</div>
            </div>
          </div>
        </section>

        {/* SCENE 3 (Scroll 66% - 100%): Total Actionable Clarity (Pristine Light Theme) */}
        <section className="stage-section">
          <div className="scene3-container">
            <div className="stage-badge badge-light-clarity">
              <CheckCircle2 size={15} />
              Scene 03 • Total Actionable Clarity
            </div>

            <h2 className="stage-title title-light-clarity">
              Cure Severity Blindness. Turn raw feedback into intelligent action.
            </h2>

            <p className="stage-subtitle">
              The camera breaks through the pipeline into crisp clarity. Chaotic complaints emerge as color-coded, role-conditioned Kanban tickets synchronized with Supabase Cloud.
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
                Replay Cinematic Story
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Scroll Indicator */}
      {scrollProgress < 0.85 && (
        <div className="scroll-indicator">
          <span>Scroll to Enter the Funnel</span>
          <div style={{ width: 1, height: 26, background: isLightMode ? 'linear-gradient(to bottom, #4f46e5, transparent)' : 'linear-gradient(to bottom, #06b6d4, transparent)' }} />
        </div>
      )}
    </div>
  );
}
