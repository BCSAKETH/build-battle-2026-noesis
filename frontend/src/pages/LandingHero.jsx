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
  Layers
} from 'lucide-react';
import './LandingHero.css';

gsap.registerPlugin(ScrollTrigger);

// High-fidelity friction snippets for 3D billboard sprites in Stage 1
const RAW_COMPLAINTS = [
  { text: '⚠️ Scammed by unverified seller ($420 wire)', color: '#e11d48' },
  { text: '⚠️ Counterfeit luxury item delivered', color: '#e11d48' },
  { text: '⏳ Support unresponsive for 48+ hours', color: '#d97706' },
  { text: '📦 Delivery delayed without notification', color: '#475569' },
  { text: '⚠️ Off-platform wire payment requested', color: '#e11d48' },
  { text: '⏳ Refund denied with zero explanation', color: '#d97706' },
  { text: '📦 Broken packaging on arrival', color: '#475569' },
  { text: '⚠️ Account frozen after disputed charge', color: '#e11d48' }
];

export default function LandingHero({ onLaunchWorkspace }) {
  const mountRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const { t } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- 1. THREE.JS SCENE (LIGHT THEME CANVAS) ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Crisp Slate-50 light background
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.022);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

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

    // Balanced Bright Lighting for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x4f46e5, 1.2);
    mainLight.position.set(5, 8, 10);
    scene.add(mainLight);

    // --- 2. PARTICLE ENGINE (CHAOS -> FUNNEL -> STRUCTURED BACKGROUND STREAMS) ---
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const chaoticTargets = new Float32Array(particleCount * 3);
    const funnelTargets = new Float32Array(particleCount * 3);
    const streamTargets = new Float32Array(particleCount * 3);

    // Tuned palette for light background visibility
    const colCrimson = new THREE.Color(0xe11d48); // Rose-600
    const colSlate = new THREE.Color(0x64748b);   // Slate-500
    const colIndigo = new THREE.Color(0x4f46e5);  // Indigo-600
    const colEmerald = new THREE.Color(0x059669); // Emerald-600
    const colAmber = new THREE.Color(0xd97706);   // Amber-600

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Stage 1 (0-100vh): Chaotic 3D field
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      chaoticTargets[i3] = x;
      chaoticTargets[i3 + 1] = y;
      chaoticTargets[i3 + 2] = z;

      // Stage 2 (100-200vh): Funnel vortex cylinder
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 2.8;
      const zFunnel = (Math.random() - 0.5) * 16;
      funnelTargets[i3] = Math.cos(angle) * radius;
      funnelTargets[i3 + 1] = Math.sin(angle) * radius;
      funnelTargets[i3 + 2] = zFunnel;

      // Stage 3 (200-300vh): Ambient vertical streams safely in background (z = -4 to avoid DOM collision)
      const streamIdx = i % 3;
      const streamX = (streamIdx - 1) * 9.5;
      const streamY = ((i % 25) - 12.5) * 0.9;
      streamTargets[i3] = streamX + (Math.random() - 0.5) * 1.5;
      streamTargets[i3 + 1] = streamY;
      streamTargets[i3 + 2] = -3.5; // Pushed behind DOM card

      // Initial color assignment
      const baseCol = Math.random() > 0.45 ? colCrimson : colSlate;
      colors[i3] = baseCol.r;
      colors[i3 + 1] = baseCol.g;
      colors[i3 + 2] = baseCol.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp circular particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, 'rgba(15, 23, 42, 1)');
    pGrad.addColorStop(0.4, 'rgba(79, 70, 229, 0.8)');
    pGrad.addColorStop(1, 'rgba(79, 70, 229, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 30, 0, Math.PI * 2);
    pCtx.fill();

    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- 3. SUBTLE HOLOGRAPHIC PIPELINE (STAGE 2) ---
    const funnelGroup = new THREE.Group();
    const cylinderGeo = new THREE.CylinderGeometry(1.6, 5.2, 24, 24, 12, true);
    const cylinderMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const funnelMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    funnelMesh.rotation.x = Math.PI / 2;
    funnelGroup.add(funnelMesh);

    // Elegant ring accents
    const ringGroup = new THREE.Group();
    for (let r = 0; r < 5; r++) {
      const ringGeo = new THREE.TorusGeometry(1.8 + r * 0.6, 0.03, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.15
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = (r - 2) * 4.0;
      ringGroup.add(ring);
    }
    funnelGroup.add(ringGroup);
    scene.add(funnelGroup);

    // --- 4. FLOATING 3D COMPLAINT BILLBOARDS (STAGE 1 ONLY) ---
    const spritesGroup = new THREE.Group();
    const spriteItems = [];

    RAW_COMPLAINTS.forEach((item, idx) => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 512;
      sCanvas.height = 120;
      const sCtx = sCanvas.getContext('2d');

      // Light Card Pill with subtle drop shadow
      sCtx.fillStyle = '#ffffff';
      sCtx.strokeStyle = item.color;
      sCtx.lineWidth = 3;
      sCtx.beginPath();
      sCtx.roundRect(8, 8, 496, 104, 20);
      sCtx.fill();
      sCtx.stroke();

      // Text label in dark slate
      sCtx.font = 'bold 22px -apple-system, sans-serif';
      sCtx.fillStyle = '#0f172a';
      sCtx.fillText(item.text, 24, 62);

      const sTex = new THREE.CanvasTexture(sCanvas);
      const sMat = new THREE.SpriteMaterial({
        map: sTex,
        transparent: true,
        opacity: 0.95
      });
      const sprite = new THREE.Sprite(sMat);

      const sx = (Math.random() - 0.5) * 18;
      const sy = (Math.random() - 0.5) * 12;
      const sz = (Math.random() - 0.5) * 12;
      sprite.position.set(sx, sy, sz);
      sprite.scale.set(4.4, 1.05, 1);

      spritesGroup.add(sprite);
      spriteItems.push({
        sprite,
        origin: new THREE.Vector3(sx, sy, sz)
      });
    });
    scene.add(spritesGroup);

    // --- 5. GSAP SCROLLTRIGGER ENGINE ---
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

        if (p < 0.33) {
          setActiveStage(1);
        } else if (p < 0.66) {
          setActiveStage(2);
        } else {
          setActiveStage(3);
        }

        // Particle interpolation
        const posAttr = particleGeometry.attributes.position;
        const colorAttr = particleGeometry.attributes.color;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let tx, ty, tz;

          if (p < 0.5) {
            const t = p * 2.0;
            tx = THREE.MathUtils.lerp(chaoticTargets[i3], funnelTargets[i3], t);
            ty = THREE.MathUtils.lerp(chaoticTargets[i3 + 1], funnelTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(chaoticTargets[i3 + 2], funnelTargets[i3 + 2], t);

            colorAttr.array[i3] = THREE.MathUtils.lerp(colors[i3], colIndigo.r, t * 0.8);
            colorAttr.array[i3 + 1] = THREE.MathUtils.lerp(colors[i3 + 1], colIndigo.g, t * 0.8);
            colorAttr.array[i3 + 2] = THREE.MathUtils.lerp(colors[i3 + 2], colIndigo.b, t * 0.8);
          } else {
            const t = (p - 0.5) * 2.0;
            tx = THREE.MathUtils.lerp(funnelTargets[i3], streamTargets[i3], t);
            ty = THREE.MathUtils.lerp(funnelTargets[i3 + 1], streamTargets[i3 + 1], t);
            tz = THREE.MathUtils.lerp(funnelTargets[i3 + 2], streamTargets[i3 + 2], t);

            const streamIdx = i % 3;
            const targetCol = streamIdx === 0 ? colCrimson : streamIdx === 1 ? colAmber : colEmerald;
            colorAttr.array[i3] = THREE.MathUtils.lerp(colIndigo.r, targetCol.r, t);
            colorAttr.array[i3 + 1] = THREE.MathUtils.lerp(colIndigo.g, targetCol.g, t);
            colorAttr.array[i3 + 2] = THREE.MathUtils.lerp(colIndigo.b, targetCol.b, t);
          }

          posAttr.array[i3] = tx;
          posAttr.array[i3 + 1] = ty;
          posAttr.array[i3 + 2] = tz;
        }
        posAttr.needsUpdate = true;
        colorAttr.needsUpdate = true;

        // Billboards fade out as entering funnel
        const spriteOpacity = Math.max(0, 1 - p * 2.4);
        spriteItems.forEach(({ sprite, origin }) => {
          sprite.material.opacity = spriteOpacity;
          sprite.position.x = THREE.MathUtils.lerp(origin.x, 0, p);
          sprite.position.y = THREE.MathUtils.lerp(origin.y, 0, p);
        });

        // Pipeline visibility
        const pipelineOpacity = p < 0.5 ? p * 1.6 : Math.max(0, (1 - p) * 1.6);
        cylinderMat.opacity = Math.min(0.12, pipelineOpacity * 0.12);
        ringGroup.children.forEach((rg) => {
          rg.material.opacity = Math.min(0.3, pipelineOpacity * 0.3);
        });

        // Camera dolly
        camera.position.z = THREE.MathUtils.lerp(18, 14, p);
      }
    });

    // Animation Loop
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (animState.progress < 0.6) {
        particleSystem.rotation.y = elapsedTime * 0.04;
      }

      funnelMesh.rotation.z = elapsedTime * 0.25;
      ringGroup.children.forEach((ring, idx) => {
        ring.rotation.z = -elapsedTime * (0.15 + idx * 0.04);
      });

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
      {/* Light Theme Navigation Header */}
      <header className="landing-hero-nav">
        <div className="landing-brand" onClick={onLaunchWorkspace}>
          <div className="brand-icon-gem">
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <div className="brand-title">InsightFlow</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Powered by Adaption Labs</div>
          </div>
          <span className="brand-tag">Build Battle 2026</span>
        </div>

        <div className="nav-actions">
          <LanguageSelector />

          <div className="nav-pill-badge">
            <span className="pulse-dot" />
            <span>Adaption Engine v0.14 Active</span>
          </div>

          <button
            className="btn-launch-nav"
            onClick={onLaunchWorkspace}
          >
            {t('nav.launch', 'Launch Workspace')}
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Fixed WebGL Canvas Layer */}
      <div className="canvas-container" ref={mountRef} />

      {/* 300vh Scroll Narrative Track */}
      <div className="scroll-track" ref={scrollTrackRef}>
        {/* STAGE 1 (0 - 100vh): Severity Blindness */}
        <section className="stage-section">
          <div className="stage-badge badge-crimson">
            <ShieldAlert size={14} />
            {t('stages.stage1_badge', 'Stage 01 • The Critical Failure Mode')}
          </div>
          <h1 className="stage-title title-gradient-crimson">
            {t('stages.stage1_title', 'Traditional AI is Blind to Catastrophic Severity.')}
          </h1>
          <p className="stage-subtitle">
            {t('stages.stage1_desc', 'Legacy sentiment engines treat a 1-star packaging tear identically to a $45,000 off-platform wire fraud exploit. When 7,002 customer complaints flood in, catastrophic churn signals vanish inside noisy semantic fog.')}
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.unstructured_volume', 'Unstructured Volume')}</div>
              <div className="hud-chip-val">7,002</div>
              <div className="hud-chip-sub">Raw unconditioned prompts</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.churn_risk', 'Severe Churn Risk')}</div>
              <div className="hud-chip-val" style={{ color: '#e11d48' }}>$305,000</div>
              <div className="hud-chip-sub">Hidden inside 3 friction clusters</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.data_quality', 'Baseline Data Quality')}</div>
              <div className="hud-chip-val" style={{ color: '#d97706' }}>6.8 / 10</div>
              <div className="hud-chip-sub">Grade B- (High noise redundancy)</div>
            </div>
          </div>
        </section>

        {/* STAGE 2 (100 - 200vh): Adaption Living Funnel */}
        <section className="stage-section">
          <div className="stage-badge badge-indigo">
            <Cpu size={14} />
            {t('stages.stage2_badge', 'Stage 02 • Living Data Conditioning')}
          </div>
          <h2 className="stage-title title-gradient-indigo">
            {t('stages.stage2_title', 'The Adaption Living Data Funnel.')}
          </h2>
          <p className="stage-subtitle">
            {t('stages.stage2_desc', "As raw reviews funnel into Adaption's conditioning engine, active recipes sanitize hyperbole, compress 14.2% duplicate noise, redact PII, and attach verified causal reasoning traces.")}
          </p>

          <div className="stage-hud">
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.noise_reduction', 'Prompt Deduplication')}</div>
              <div className="hud-chip-val" style={{ color: '#4f46e5' }}>94.1%</div>
              <div className="hud-chip-sub">Noise reduction across clusters</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.adapted_uplift', 'Adapted Quality Uplift')}</div>
              <div className="hud-chip-val" style={{ color: '#0284c7' }}>9.4 / 10</div>
              <div className="hud-chip-sub">Grade A+ (96th percentile)</div>
            </div>
            <div className="hud-chip">
              <div className="hud-chip-label">{t('metrics.causality', 'Causality Attached')}</div>
              <div className="hud-chip-val" style={{ color: '#059669' }}>100%</div>
              <div className="hud-chip-sub">Root Cause → Action traces</div>
            </div>
          </div>
        </section>

        {/* STAGE 3 (200 - 300vh): Single Spotlight Decision Card (Zero Overlap) */}
        <section className="stage-section">
          <div className="stage-3-container">
            <div className="stage-badge badge-emerald">
              <CheckCircle2 size={14} />
              {t('stages.stage3_badge', 'Stage 03 • Actionable Decision Velocity')}
            </div>
            <h2 className="stage-title title-gradient-emerald">
              {t('stages.stage3_title', 'From Chaotic Text to Prioritized Decisions.')}
            </h2>
            <p className="stage-subtitle">
              {t('stages.stage3_desc', 'Customer friction is filtered into verified, role-conditioned actions with instant Supabase cloud synchronization.')}
            </p>

            {/* Pristine Single Spotlight Card (No Overlapping Background Cards) */}
            <div className="spotlight-card">
              <div className="spotlight-card-stripe" />
              <div className="spotlight-header">
                <span className="spotlight-badge">
                  <ShieldAlert size={14} />
                  P0 Critical • Escrow Scam Cluster
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                  Synced to Supabase
                </span>
              </div>

              <div className="spotlight-title">
                Surge in Unverified Sellers Demanding Off-Platform Wire Transfers
              </div>

              <div className="spotlight-desc">
                Adaption's causality engine extracted 1,286 victim reports identifying rogue sellers bypassing platform escrow. Automated seller payout freeze directive prepared.
              </div>

              <div className="spotlight-meta-grid">
                <div className="spotlight-meta-item">
                  <span className="spotlight-meta-label">Financial Churn Risk</span>
                  <span className="spotlight-meta-value" style={{ color: '#e11d48' }}>$305,000</span>
                </div>
                <div className="spotlight-meta-item">
                  <span className="spotlight-meta-label">Assigned Owner</span>
                  <span className="spotlight-meta-value">Sarah Jenkins (Trust & Safety)</span>
                </div>
                <div className="spotlight-meta-item">
                  <span className="spotlight-meta-label">Prescribed Action</span>
                  <span className="spotlight-meta-value" style={{ color: '#4f46e5' }}>P0 Escrow Lock</span>
                </div>
              </div>

              <div className="cta-group">
                <button className="btn-launch-hero" onClick={onLaunchWorkspace}>
                  Launch Enterprise Workspace
                  <ArrowRight size={18} />
                </button>
                <button
                  className="btn-secondary-hero"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Replay Sequence
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Scroll Indicator */}
      {scrollProgress < 0.85 && (
        <div className="scroll-indicator">
          <span>Scroll to Funnel Data</span>
          <div style={{ width: 1, height: 24, background: 'linear-gradient(to bottom, #94a3b8, transparent)' }} />
        </div>
      )}
    </div>
  );
}
