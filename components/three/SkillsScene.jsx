"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, useTexture } from "@react-three/drei";
import * as THREE from "three";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function Ball({ texture, home, radius, index, active, pointer, onHover, still }) {
  const group = useRef();
  const mesh = useRef();
  const spin = useRef(0);
  const scale = useRef(1);
  const was = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = still ? 0 : state.clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 6);
    const p = pointer.current;

    // Kick off one full turn each time this ball becomes the active one.
    if (active && !was.current) spin.current = Math.PI * 2;
    was.current = active;
    spin.current += (0 - spin.current) * (1 - Math.exp(-delta * 3.2));

    let tx = home.x;
    let ty = home.y + Math.sin(t * 0.9 + index * 1.7) * radius * 0.12;
    let ry = Math.sin(t * 0.55 + index) * 0.35;
    let rx = Math.cos(t * 0.45 + index * 1.3) * 0.2;

    if (p.inside) {
      const dx = home.x - p.x;
      const dy = home.y - p.y;
      const dist = Math.hypot(dx, dy);
      const reach = radius * 4.2;
      // Look at the cursor…
      ry = clamp(-dx / (radius * 5), -0.9, 0.9);
      rx = clamp(dy / (radius * 5), -0.7, 0.7);
      // …and get nudged out of its way.
      if (dist < reach && dist > 0.0001 && !active) {
        const push = (1 - dist / reach) * radius * 0.5;
        tx += (dx / dist) * push;
        ty += (dy / dist) * push;
      }
    }

    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    g.rotation.y += (ry + spin.current - g.rotation.y) * k * 1.4;
    g.rotation.x += (rx - g.rotation.x) * k;

    scale.current += ((active ? 1.2 : 1) - scale.current) * k;
    g.scale.setScalar(radius * scale.current);
    g.position.z = (scale.current - 1) * 4;
  });

  return (
    <group ref={group} position={[home.x, home.y, 0]} scale={radius}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(index);
        }}
        onPointerOut={() => onHover(null)}
        onClick={() => onHover(index)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#efe9dd" roughness={0.75} metalness={0.05} flatShading polygonOffset polygonOffsetFactor={-5} />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.05} map={texture} />
      </mesh>
    </group>
  );
}

function Field({ items, active, onHover, pointer, still }) {
  const { viewport } = useThree();
  const textures = useTexture(items.map((i) => i.icon));

  useMemo(() => {
    textures.forEach((t) => {
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
  }, [textures]);

  const layout = useMemo(() => {
    const n = items.length;
    const cols = viewport.aspect > 1.7 ? Math.ceil(n / 2) : 4;
    const rows = Math.ceil(n / cols);
    const cw = viewport.width / cols;
    const ch = viewport.height / rows;
    const radius = Math.min(cw, ch) * 0.39;
    const homes = items.map((_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: (c + 0.5) * cw - viewport.width / 2,
        y: viewport.height / 2 - (r + 0.5) * ch,
      };
    });
    return { homes, radius };
  }, [items, viewport.width, viewport.height, viewport.aspect]);

  // Convert r3f's normalised pointer into world units on the z=0 plane.
  useFrame((state) => {
    pointer.current.x = (state.pointer.x * viewport.width) / 2;
    pointer.current.y = (state.pointer.y * viewport.height) / 2;
  });

  return items.map((item, i) => (
    <Ball
      key={item.name}
      index={i}
      texture={textures[i]}
      home={layout.homes[i]}
      radius={layout.radius}
      active={active === i}
      pointer={pointer}
      onHover={onHover}
      still={still}
    />
  ));
}

export default function SkillsScene({ items, active, onHover }) {
  const wrap = useRef(null);
  const pointer = useRef({ x: 0, y: 0, inside: false });
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="h-full w-full"
      onPointerEnter={(e) => (pointer.current.inside = e.pointerType !== "touch")}
      onPointerLeave={() => {
        pointer.current.inside = false;
        onHover(null);
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 40], fov: 14 }}
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 10]} intensity={2.4} />
        <directionalLight position={[-8, -4, 6]} intensity={0.9} color="#ff5a1f" />
        <Suspense fallback={null}>
          <Field items={items} active={active} onHover={onHover} pointer={pointer} still={still} />
        </Suspense>
      </Canvas>
    </div>
  );
}
