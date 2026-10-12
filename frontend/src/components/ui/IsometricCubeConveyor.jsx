import React from 'react';

/**
 * IsometricCubeConveyor — 3D Isometric Folding Cube Assembly
 * From Uiverse.io by Admin12121
 */
export function IsometricCubeConveyor({
  duration = '3s',
  scale = 0.85,
  className = '',
  style = {}
}) {
  return (
    <div
      className={`uiverse-isometric-conveyor-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        perspective: '1000px',
        ...style
      }}
    >
      <div
        className="uiverse-isometric-loader"
        style={{
          transform: `scale(${scale})`,
          '--duration': duration,
          '--primary': 'rgba(79, 70, 229, 1)',
          '--primary-light': '#818cf8',
          '--primary-rgba': 'rgba(79, 70, 229, 0)'
        }}
      >
        <div className="ground">
          <div></div>
        </div>
        <div className="box box0"><div></div></div>
        <div className="box box1"><div></div></div>
        <div className="box box2"><div></div></div>
        <div className="box box3"><div></div></div>
        <div className="box box4"><div></div></div>
        <div className="box box5"><div></div></div>
        <div className="box box6"><div></div></div>
        <div className="box box7"><div></div></div>
      </div>

      <style>{`
        .uiverse-isometric-loader {
          --duration: 3s;
          --primary: rgba(79, 70, 229, 1);
          --primary-light: #818cf8;
          --primary-rgba: rgba(79, 70, 229, 0);
          width: 200px;
          height: 280px;
          position: relative;
          transform-style: preserve-3d;
        }

        .uiverse-isometric-loader:before,
        .uiverse-isometric-loader:after {
          --r: 20.5deg;
          content: "";
          width: 320px;
          height: 140px;
          position: absolute;
          right: 32%;
          bottom: -11px;
          background: #f8fafc;
          transform: translateZ(200px) rotate(var(--r));
          animation: isoMask var(--duration) linear forwards infinite;
          pointer-events: none;
        }

        .uiverse-isometric-loader:after {
          --r: -20.5deg;
          right: auto;
          left: 32%;
        }

        .uiverse-isometric-loader .ground {
          position: absolute;
          left: -50px;
          bottom: -120px;
          transform-style: preserve-3d;
          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
        }

        .uiverse-isometric-loader .ground div {
          transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
          width: 200px;
          height: 200px;
          background: var(--primary);
          background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
          transform-style: preserve-3d;
          animation: isoGround var(--duration) linear forwards infinite;
        }

        .uiverse-isometric-loader .ground div:before,
        .uiverse-isometric-loader .ground div:after {
          --rx: 90deg;
          --ry: 0deg;
          --x: 44px;
          --y: 162px;
          --z: -50px;
          content: "";
          width: 156px;
          height: 300px;
          opacity: 0;
          background: linear-gradient(var(--primary), var(--primary-rgba));
          position: absolute;
          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
          animation: isoGroundShine var(--duration) linear forwards infinite;
        }

        .uiverse-isometric-loader .ground div:after {
          --rx: 90deg;
          --ry: 90deg;
          --x: 0;
          --y: 177px;
          --z: 150px;
        }

        .uiverse-isometric-loader .box {
          --x: 0;
          --y: 0;
          position: absolute;
          animation: var(--duration) linear forwards infinite;
          transform: translate(var(--x), var(--y));
        }

        .uiverse-isometric-loader .box div {
          background-color: var(--primary);
          width: 48px;
          height: 48px;
          position: relative;
          transform-style: preserve-3d;
          animation: var(--duration) ease forwards infinite;
          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
        }

        .uiverse-isometric-loader .box div:before,
        .uiverse-isometric-loader .box div:after {
          --rx: 90deg;
          --ry: 0deg;
          --z: 24px;
          --y: -24px;
          --x: 0;
          content: "";
          position: absolute;
          background-color: inherit;
          width: inherit;
          height: inherit;
          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
          filter: brightness(var(--b, 1.2));
        }

        .uiverse-isometric-loader .box div:after {
          --rx: 0deg;
          --ry: 90deg;
          --x: 24px;
          --y: 0;
          --b: 1.4;
        }

        .uiverse-isometric-loader .box.box0 { --x: -220px; --y: -120px; left: 58px; top: 108px; }
        .uiverse-isometric-loader .box.box1 { --x: -260px; --y: 120px; left: 25px; top: 120px; }
        .uiverse-isometric-loader .box.box2 { --x: 120px; --y: -190px; left: 58px; top: 64px; }
        .uiverse-isometric-loader .box.box3 { --x: 280px; --y: -40px; left: 91px; top: 120px; }
        .uiverse-isometric-loader .box.box4 { --x: 60px; --y: 200px; left: 58px; top: 132px; }
        .uiverse-isometric-loader .box.box5 { --x: -220px; --y: -120px; left: 25px; top: 76px; }
        .uiverse-isometric-loader .box.box6 { --x: -260px; --y: 120px; left: 91px; top: 76px; }
        .uiverse-isometric-loader .box.box7 { --x: -240px; --y: 200px; left: 58px; top: 87px; }

        .uiverse-isometric-loader .box0 { animation-name: isoBoxMove0; }
        .uiverse-isometric-loader .box0 div { animation-name: isoBoxScale0; }
        .uiverse-isometric-loader .box1 { animation-name: isoBoxMove1; }
        .uiverse-isometric-loader .box1 div { animation-name: isoBoxScale1; }
        .uiverse-isometric-loader .box2 { animation-name: isoBoxMove2; }
        .uiverse-isometric-loader .box2 div { animation-name: isoBoxScale2; }
        .uiverse-isometric-loader .box3 { animation-name: isoBoxMove3; }
        .uiverse-isometric-loader .box3 div { animation-name: isoBoxScale3; }
        .uiverse-isometric-loader .box4 { animation-name: isoBoxMove4; }
        .uiverse-isometric-loader .box4 div { animation-name: isoBoxScale4; }
        .uiverse-isometric-loader .box5 { animation-name: isoBoxMove5; }
        .uiverse-isometric-loader .box5 div { animation-name: isoBoxScale5; }
        .uiverse-isometric-loader .box6 { animation-name: isoBoxMove6; }
        .uiverse-isometric-loader .box6 div { animation-name: isoBoxScale6; }
        .uiverse-isometric-loader .box7 { animation-name: isoBoxMove7; }
        .uiverse-isometric-loader .box7 div { animation-name: isoBoxScale7; }

        @keyframes isoBoxMove0 {
          12% { transform: translate(var(--x), var(--y)); }
          25%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale0 {
          6% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove1 {
          16% { transform: translate(var(--x), var(--y)); }
          29%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale1 {
          10% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove2 {
          20% { transform: translate(var(--x), var(--y)); }
          33%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale2 {
          14% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove3 {
          24% { transform: translate(var(--x), var(--y)); }
          37%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale3 {
          18% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove4 {
          28% { transform: translate(var(--x), var(--y)); }
          41%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale4 {
          22% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove5 {
          32% { transform: translate(var(--x), var(--y)); }
          45%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale5 {
          26% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove6 {
          36% { transform: translate(var(--x), var(--y)); }
          49%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale6 {
          30% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoBoxMove7 {
          40% { transform: translate(var(--x), var(--y)); }
          53%, 52% { transform: translate(0, 0); }
          80% { transform: translate(0, -32px); }
          90%, 100% { transform: translate(0, 188px); }
        }
        @keyframes isoBoxScale7 {
          34% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
          42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
        }

        @keyframes isoGround {
          0%, 65% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); }
          75%, 90% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1); }
          100% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); }
        }

        @keyframes isoGroundShine {
          0%, 70% { opacity: 0; }
          75%, 87% { opacity: 0.25; }
          100% { opacity: 0; }
        }

        @keyframes isoMask {
          0%, 65% { opacity: 0; }
          66%, 100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default IsometricCubeConveyor;
