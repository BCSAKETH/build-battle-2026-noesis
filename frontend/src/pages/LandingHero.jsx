import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import NoesisLogo from '../components/NoesisLogo';
import { supabase } from '../supabase';
import {
  ShieldAlert,
  ArrowRight,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Mail,
  UserCheck,
  X,
  Sparkles,
  Layers,
  ChevronRight,
  Activity,
  Zap,
  HelpCircle
} from 'lucide-react';
import './LandingHero.css';

gsap.registerPlugin(ScrollTrigger);

// 8 Representative Raw Complaints for Interactive 3D Raycasting & 2D Bubbles
const COMPLAINT_SIGNALS = [
  { id: 1, text: '🚨 My account was hacked! $45,000 escrow wire stolen via unverified seller!', category: 'Fraud & Scam', severity: 'P0 Critical', color: '#F43F5E' },
  { id: 2, text: '⚠️ Fake merchant counterfeit replica delivered instead of luxury watch', category: 'Fraud & Scam', severity: 'P0 Critical', color: '#F43F5E' },
  { id: 3, text: '⏳ Support queue completely unresponsive for 72+ hours during checkout outage', category: 'Customer Service', severity: 'P1 High', color: '#F59E0B' },
  { id: 4, text: '📦 Shipment tracking stalled at regional carrier node for 9 business days', category: 'Operational Issues', severity: 'P1 High', color: '#F59E0B' },
  { id: 5, text: '💥 Mobile checkout app crashed on payment token validation', category: 'Product Feedback', severity: 'P2 Medium', color: '#4F46E5' },
  { id: 6, text: '💡 Please add dark mode and bulk export button to billing dashboard', category: 'Product Feedback', severity: 'P3 Low', color: '#4F46E5' },
  { id: 7, text: '📦 Outer delivery box had slight cardboard tear but contents intact', category: 'Operational Issues', severity: 'P3 Low', color: '#64748B' },
  { id: 8, text: '✨ Proactive SMS delivery update arrived 2 hours before courier arrived!', category: 'Resolved / Retention', severity: 'P4 Safe', color: '#10B981' }
];

export default function LandingHero({ onLaunchWorkspace }) {
  const mountRef = useRef(null);
  const pinContainerRef = useRef(null);
  const stage1Ref = useRef(null);
  const { t } = useTranslation();

  // Scroll and Interactive State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeZone, setActiveZone] = useState('zone1'); // 'zone1' | 'zone2' | 'zone3'
  const [hoveredParticleText, setHoveredParticleText] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Split-Screen Auth Modal State (Stage 3)
  const [showSplitAuth, setShowSplitAuth] = useState(false);
  const [authRole, setAuthRole] = useState('executive');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Three.js Scene References
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    particleSystem: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(-999, -999)
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. THREE.JS SCENE INITIALIZATION ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Crisp Executive Slate-50 canvas
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.018);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

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

    // Ambient & Directional Key Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0x4f46e5, 1.2);
    keyLight.position.set(10, 15, 15);
    scene.add(keyLight);

    // --- 2. 1,500 PARTICLES: 3-STAGE HORIZONTAL PIPELINE ---
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Target positions along X-Axis
    const chaosTargets = new Float32Array(particleCount * 3);      // Left: X in [-15, -5]
    const funnelTargets = new Float32Array(particleCount * 3);     // Center: X in [-5, +5], Y,Z -> 0
    const structuredTargets = new Float32Array(particleCount * 3); // Right: X in [+5, +15], Rigid Grid

    // Color definitions
    const colSlate = new THREE.Color(0x64748b);
    const colRose = new THREE.Color(0xf43f5e);   // Fraud P0
    const colAmber = new THREE.Color(0xf59e0b);  // Support SLA
    const colIndigo = new THREE.Color(0x4f46e5); // Tech & Systems
    const colEmerald = new THREE.Color(0x10b981);// Resolved

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // STAGE 2A: LEFT ZONE (Chaos: X in [-15, -5])
      const cX = -15 + Math.random() * 10;
      const cY = (Math.random() - 0.5) * 14;
      const cZ = (Math.random() - 0.5) * 12;
      chaosTargets[i3] = cX;
      chaosTargets[i3 + 1] = cY;
      chaosTargets[i3 + 2] = cZ;

      // STAGE 2B: CENTER FUNNEL (X in [-5, +5], converging to origin)
      const fX = -5 + (i / particleCount) * 10;
      const angle = (i * 0.15);
      const radius = 0.5 + Math.pow(Math.random(), 2) * 3.5;
      funnelTargets[i3] = fX;
      funnelTargets[i3 + 1] = Math.sin(angle) * radius * (1 - Math.abs(fX) / 6);
      funnelTargets[i3 + 2] = Math.cos(angle) * radius * (1 - Math.abs(fX) / 6);

      // STAGE 2C: RIGHT STRUCTURED GRID (X in [+5, +15], 3 Clean Columns)
      const colIdx = i % 3; // 0: Rose (Fraud), 1: Amber (Ops), 2: Emerald (Resolved)
      const gridX = 6.5 + colIdx * 3.6;
      const rowIdx = Math.floor(i / 3) % 30;
      const gridY = 8 - rowIdx * 0.55;
      const depthLayer = -2.5 + ((i % 5) * 0.4);
      structuredTargets[i3] = gridX + ((i % 4) - 1.5) * 0.3;
      structuredTargets[i3 + 1] = gridY;
      structuredTargets[i3 + 2] = depthLayer;

      // Initial positions start at Chaos targets
      positions[i3] = cX;
      positions[i3 + 1] = cY;
      positions[i3 + 2] = cZ;

      // Initial color: Dull slate with sporadic crimson sparks
      if (Math.random() < 0.12) {
        colors[i3] = colRose.r;
        colors[i3 + 1] = colRose.g;
        colors[i3 + 2] = colRose.b;
      } else {
        colors[i3] = colSlate.r;
        colors[i3 + 1] = colSlate.g;
        colors[i3 + 2] = colSlate.b;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp circular point texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    radGrad.addColorStop(0, 'rgba(15, 23, 42, 1)');
    radGrad.addColorStop(0.35, 'rgba(79, 70, 229, 0.9)');
    radGrad.addColorStop(1, 'rgba(79, 70, 229, 0)');
    pCtx.fillStyle = radGrad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 30, 0, Math.PI * 2);
    pCtx.fill();
    const pointTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.45,
      map: pointTexture,
      transparent: true,
      vertexColors: true,
      alphaTest: 0.02,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    threeRef.current = {
      scene,
      camera,
      renderer,
      particleSystem,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(-999, -999)
    };

    // --- 3. MOUSE INTERACTIVITY & RAYCASTING ---
    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      threeRef.current.mouse.set(mouseX, mouseY);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- 4. GSAP SCROLLTRIGGER PIN & METAMORPHOSIS ---
    const pinPin = ScrollTrigger.create({
      trigger: pinContainerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Zone state indicator
        if (p < 0.35) {
          setActiveZone('zone1'); // 2D Narrative & Left Chaos
        } else if (p < 0.70) {
          setActiveZone('zone2'); // Center Funnel Convergence
        } else {
          setActiveZone('zone3'); // Structured Equilibrium & Auth
        }

        // Particle Metamorphosis based on Scroll Progress (0.0 -> 1.0)
        const posAttr = particleSystem.geometry.attributes.position;
        const colAttr = particleSystem.geometry.attributes.color;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let curX, curY, curZ;
          let r, g, b;

          const colType = i % 4;
          const targetCol = colType === 0 ? colRose : colType === 1 ? colAmber : colType === 2 ? colIndigo : colEmerald;

          if (p <= 0.35) {
            // Stage 1 -> Stage 2A: Left Chaos Cloud
            const t = p / 0.35;
            curX = chaosTargets[i3] + Math.sin(i * 0.1) * 0.5;
            curY = chaosTargets[i3 + 1] + Math.cos(i * 0.1) * 0.5;
            curZ = chaosTargets[i3 + 2];

            r = colSlate.r;
            g = colSlate.g;
            b = colSlate.b;
          } else if (p <= 0.70) {
            // Stage 2B: Acceleration into Center Funnel & Color Transition
            const t = (p - 0.35) / 0.35;
            curX = THREE.MathUtils.lerp(chaosTargets[i3], funnelTargets[i3], t);
            curY = THREE.MathUtils.lerp(chaosTargets[i3 + 1], funnelTargets[i3 + 1], t);
            curZ = THREE.MathUtils.lerp(chaosTargets[i3 + 2], funnelTargets[i3 + 2], t);

            r = THREE.MathUtils.lerp(colSlate.r, targetCol.r, t);
            g = THREE.MathUtils.lerp(colSlate.g, targetCol.g, t);
            b = THREE.MathUtils.lerp(colSlate.b, targetCol.b, t);
          } else {
            // Stage 2C: Locking into Right Rigid Structured Grid
            const t = (p - 0.70) / 0.30;
            curX = THREE.MathUtils.lerp(funnelTargets[i3], structuredTargets[i3], t);
            curY = THREE.MathUtils.lerp(funnelTargets[i3 + 1], structuredTargets[i3 + 1], t);
            curZ = THREE.MathUtils.lerp(funnelTargets[i3 + 2], structuredTargets[i3 + 2], t);

            r = targetCol.r;
            g = targetCol.g;
            b = targetCol.b;
          }

          posAttr.array[i3] = curX;
          posAttr.array[i3 + 1] = curY;
          posAttr.array[i3 + 2] = curZ;

          colAttr.array[i3] = r;
          colAttr.array[i3 + 1] = g;
          colAttr.array[i3 + 2] = b;
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // Camera smoothly follows the horizontal flow ($X: -10 -> 0 -> +8)
        camera.position.x = THREE.MathUtils.lerp(-8, 6, p);
        camera.position.z = THREE.MathUtils.lerp(24, 18, p);
      }
    });

    // --- 5. ANIMATION LOOP & RAYCASTING ---
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle ambient drift
      if (particleSystem) {
        particleSystem.rotation.y = Math.sin(elapsedTime * 0.2) * 0.04;
      }

      // Raycaster for hover inspection in Chaos zone
      if (threeRef.current.camera && particleSystem) {
        threeRef.current.raycaster.setFromCamera(threeRef.current.mouse, threeRef.current.camera);
        const intersects = threeRef.current.raycaster.intersectObject(particleSystem);
        if (intersects.length > 0 && intersects[0].index !== undefined) {
          const idx = intersects[0].index;
          const signal = COMPLAINT_SIGNALS[idx % COMPLAINT_SIGNALS.length];
          setHoveredParticleText(signal);
        } else {
          setHoveredParticleText(null);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Window resize
    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      pinPin.kill();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.innerHTML = '';
    };
  }, []);

  // 1-Click Role Login Handler for Split Auth Modal
  const handleRoleAuth = (roleKey, title, name) => {
    const userSession = {
      role: roleKey,
      name,
      title,
      email: `${roleKey}@noesis.internal`,
      authenticated: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('noesis_auth_user', JSON.stringify(userSession));
    if (onLaunchWorkspace) onLaunchWorkspace(roleKey);
    setShowSplitAuth(false);
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword
      });
      if (error) throw error;
      const userSession = {
        role: 'executive',
        name: data.user?.email?.split('@')[0] || 'Executive User',
        title: 'Executive Operator',
        email: data.user?.email,
        authenticated: true
      };
      localStorage.setItem('noesis_auth_user', JSON.stringify(userSession));
      if (onLaunchWorkspace) onLaunchWorkspace('executive');
      setShowSplitAuth(false);
    } catch (err) {
      setAuthError(err.message || 'Authentication error. Use 1-Click Demo Roles below.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="landing-hybrid-root" ref={pinContainerRef}>
      {/* 1. Luminous Executive Navigation Header */}
      <header className="landing-hybrid-nav">
        <div className="landing-brand-slot" onClick={() => onLaunchWorkspace('executive')}>
          <NoesisLogo height={38} showTagline={true} />
        </div>

        <div className="nav-controls-slot">
          <LanguageSelector />

          <div className="nav-engine-pill">
            <span className="live-dot" />
            <span>Adaption Engine v0.14</span>
          </div>

          <button
            className="btn-launch-engine"
            onClick={() => onLaunchWorkspace('executive')}
          >
            <span>Launch Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. Interactive Three.js WebGL Canvas (Pinned Background) */}
      <div className="webgl-canvas-mount" ref={mountRef} />

      {/* 3. Floating Raycaster Tooltip for Particle Inspection */}
      {hoveredParticleText && (
        <div
          className="particle-raycast-tooltip"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: hoveredParticleText.color,
                background: `${hoveredParticleText.color}15`,
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              {hoveredParticleText.severity}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{hoveredParticleText.category}</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#0f172a', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
            {hoveredParticleText.text}
          </p>
        </div>
      )}

      {/* 4. Dynamic Zone HUD Indicator */}
      <div className="stage-hud-tracker">
        <div className={`hud-stage-step ${activeZone === 'zone1' ? 'active' : ''}`}>
          <span className="step-num">01</span>
          <span className="step-text">Severity Blindness</span>
        </div>
        <div className="hud-stage-divider" />
        <div className={`hud-stage-step ${activeZone === 'zone2' ? 'active' : ''}`}>
          <span className="step-num">02</span>
          <span className="step-text">Adaption Conditioning</span>
        </div>
        <div className="hud-stage-divider" />
        <div className={`hud-stage-step ${activeZone === 'zone3' ? 'active' : ''}`}>
          <span className="step-num">03</span>
          <span className="step-text">Structured Decision Grid</span>
        </div>
      </div>

      {/* 5. Dynamic Story Content Overlays */}
      <div className="story-content-layer">
        {/* STAGE 1: 2D Storytelling Narrative Layer (Scroll 0% - 35%) */}
        {scrollProgress < 0.35 && (
          <div className="narrative-stage stage-1-container animate-fade-in" ref={stage1Ref}>
            <div className="stage-warning-pill">
              <ShieldAlert size={14} color="#be123c" />
              <span>Scene 01 • The Chaos of Severity Blindness</span>
            </div>

            <h1 className="hero-executive-title">
              Your business is noise.
            </h1>

            <p className="hero-executive-subtitle">
              You receive 10,000 raw customer feedback tickets, but legacy tools treat a 1-star packaging tear identically to a catastrophic $45,000 wire fraud attack.
            </p>

            {/* 2D Avatar Speech Bubble Cascade */}
            <div className="avatar-bubble-stream">
              <div className="avatar-bubble bubble-critical">
                <div className="avatar-icon-circle avatar-red">🚨</div>
                <div>
                  <div className="bubble-author">Marcus S. • FinTech Wire</div>
                  <div className="bubble-body">"Account hacked! $45,000 escrow payment diverted by unverified seller!"</div>
                </div>
              </div>

              <div className="avatar-bubble bubble-noise">
                <div className="avatar-icon-circle avatar-gray">📦</div>
                <div>
                  <div className="bubble-author">Claire D. • E-Commerce</div>
                  <div className="bubble-body">"Delivery was delayed by 3 hours, box corner slightly crumpled."</div>
                </div>
              </div>

              <div className="avatar-bubble bubble-noise">
                <div className="avatar-icon-circle avatar-gray">💬</div>
                <div>
                  <div className="bubble-author">Jordan T. • Mobile Shopper</div>
                  <div className="bubble-body">"Can you make the checkout button light violet instead of purple?"</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: Center Funnel Acceleration (Scroll 35% - 70%) */}
        {scrollProgress >= 0.35 && scrollProgress < 0.70 && (
          <div className="narrative-stage stage-2-container animate-fade-in">
            <div className="stage-indigo-pill">
              <Cpu size={14} color="#4f46e5" />
              <span>Scene 02 • Adaption Living Data Engine</span>
            </div>

            <h2 className="hero-executive-title">
              Streamlining the chaos.
            </h2>

            <p className="hero-executive-subtitle">
              Notice the particles accelerating through the central beam. Adaption Labs recipes strip emotional toxicity, redact PII, eliminate 14.2% duplicate noise, and attach 3-hop causal reasoning traces in real-time.
            </p>

            <div className="streamline-metrics-grid">
              <div className="metric-card">
                <div className="m-label">Quality Score Uplift</div>
                <div className="m-val" style={{ color: '#059669' }}>6.8 → 9.4</div>
                <div className="m-sub">Grade A+ (96th percentile)</div>
              </div>
              <div className="metric-card">
                <div className="m-label">Noise Reduction</div>
                <div className="m-val" style={{ color: '#4f46e5' }}>14.2%</div>
                <div className="m-sub">1,024 duplicates pruned</div>
              </div>
              <div className="metric-card">
                <div className="m-label">P0 Threat Isolation</div>
                <div className="m-val" style={{ color: '#f43f5e' }}>89 Threats</div>
                <div className="m-sub">Quarantined for immediate triage</div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Right Structured Grid & Final CTA (Scroll 70%+) */}
        {scrollProgress >= 0.70 && (
          <div className="narrative-stage stage-3-container animate-fade-in">
            <div className="stage-emerald-pill">
              <CheckCircle2 size={14} color="#059669" />
              <span>Scene 03 • Structured Decision Equilibrium</span>
            </div>

            <h2 className="hero-executive-title">
              Cure Severity Blindness.
            </h2>

            <p className="hero-executive-subtitle">
              Unstructured noise has crystallized into a rigid, role-conditioned Decision Matrix. High-risk fraud issues auto-dispatch to Trust & Safety, while SLA queues sync to Support Operations.
            </p>

            <div className="final-cta-cluster">
              <button
                className="btn-enter-noesis"
                onClick={() => onLaunchWorkspace('executive')}
              >
                <span>Enter NOESIS Decision Engine</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn-replay-story"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Replay Narrative
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. SPLIT-SCREEN AUTH MODAL (STAGE 3 INTEGRATION) */}
      {showSplitAuth && (
        <div className="split-auth-overlay animate-fade-in">
          <div className="split-auth-wrapper">
            {/* Left 50%: Structured Cognitive Engine Visualizer */}
            <div className="split-auth-left">
              <div className="auth-brand-pill">
                <NoesisLogo height={32} showTagline={false} />
              </div>

              <div className="auth-left-content">
                <div className="orbital-accent-badge">
                  <Sparkles size={14} color="#4f46e5" />
                  <span>Cognitive Intelligence Engine</span>
                </div>
                <h3 className="auth-left-title">
                  Unified Decision Velocity for Enterprise Teams
                </h3>
                <p className="auth-left-desc">
                  Transform 10,000 chaotic customer complaints into role-conditioned, multi-tenant action workflows with Adaption Labs recipes and Supabase Cloud sync.
                </p>

                <div className="auth-feature-list">
                  <div className="feature-item">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Real-Time Living Data Conditioning (Pillar 1)</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Automated P0 Threat Quarantine (Pillar 2)</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Multilingual Gemini Voice Resolution (Pillar 3)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 50%: Supabase Authentication & 1-Click Role Workspace */}
            <div className="split-auth-right">
              <button
                className="close-split-auth-btn"
                onClick={() => setShowSplitAuth(false)}
                aria-label="Close authentication"
              >
                <X size={20} />
              </button>

              <div className="auth-form-card">
                <h2 className="auth-form-title">Enter NOESIS Platform</h2>
                <p className="auth-form-subtitle">
                  Choose a verified enterprise role for instant access or sign in with your Supabase credentials.
                </p>

                {authError && (
                  <div className="auth-error-banner">
                    <AlertTriangle size={15} />
                    <span>{authError}</span>
                  </div>
                )}

                {/* 1-Click Demo Roles (Hackathon Evaluation Showcase) */}
                <div className="demo-roles-section">
                  <span className="demo-label">1-Click Role Workspace (Judges / Evaluation):</span>
                  <div className="role-buttons-row">
                    <button
                      type="button"
                      className="btn-role-chip role-executive"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRoleAuth('executive', 'Chief Executive / VP Product', 'Sarah Vance');
                      }}
                    >
                      <UserCheck size={14} />
                      <div>
                        <strong>Executive C-Suite</strong>
                        <span>Portfolio Risk & Briefings</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="btn-role-chip role-support"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRoleAuth('support', 'Support Operations Lead', 'Marcus Chen');
                      }}
                    >
                      <UserCheck size={14} />
                      <div>
                        <strong>Support Ops Lead</strong>
                        <span>SLA Backlog & Escalations</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="btn-role-chip role-trust"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRoleAuth('trust_safety', 'Trust & Safety Director', 'Elena Rostova');
                      }}
                    >
                      <UserCheck size={14} />
                      <div>
                        <strong>Trust & Safety</strong>
                        <span>Fraud & Escrow Quarantines</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="auth-separator">
                  <span>or enter email credentials</span>
                </div>

                {/* Standard Supabase Email/Password Form */}
                <form onSubmit={handleEmailSignIn} className="auth-standard-form">
                  <div className="input-group">
                    <label>Enterprise Email</label>
                    <div className="input-with-icon">
                      <Mail size={16} color="#94a3b8" />
                      <input
                        type="email"
                        placeholder="operator@company.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Password</label>
                    <div className="input-with-icon">
                      <Lock size={16} color="#94a3b8" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-auth-submit"
                    disabled={authLoading}
                  >
                    {authLoading ? 'Authenticating...' : 'Sign In to Workspace'}
                    <ArrowRight size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
