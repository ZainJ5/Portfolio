"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 3D simplex noise — Ian McEwan / Ashima Arts (MIT).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uPointer;
attribute float aRand;
varying float vHeat;
varying float vDepth;
${NOISE}
void main(){
  vec3 dir=normalize(position);
  float slow=snoise(position*0.95+vec3(0.0,uTime*0.16,uTime*0.11));
  float fine=snoise(position*2.7-vec3(uTime*0.09));
  float d=slow*0.36+fine*0.07;
  float touch=smoothstep(1.5,0.0,distance(position,uPointer));
  d+=touch*0.32;
  vec3 p=position+dir*d;
  vHeat=smoothstep(0.16,0.46,d);
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  gl_PointSize=uSize*uPixelRatio*(0.55+aRand*0.9)/-mv.z;
  vDepth=smoothstep(-9.4,-5.2,mv.z);
}`;

const FRAG = /* glsl */ `
uniform vec3 uBone;
uniform vec3 uSignal;
varying float vHeat;
varying float vDepth;
void main(){
  float r=length(gl_PointCoord-0.5);
  if(r>0.5) discard;
  float a=smoothstep(0.5,0.2,r);
  vec3 col=mix(uBone,uSignal,vHeat);
  gl_FragColor=vec4(col,a*(0.16+0.84*vDepth*vDepth));
}`;

function fibonacciSphere(count, radius) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pos[i * 3] = Math.cos(t) * r * radius;
    pos[i * 3 + 1] = y * radius;
    pos[i * 3 + 2] = Math.sin(t) * r * radius;
    rand[i] = Math.random();
  }
  return { pos, rand };
}

function Orb({ pointer, still }) {
  const group = useRef();
  const points = useRef();
  const hit = useMemo(() => new THREE.Vector3(), []);
  const { size, gl } = useThree();
  const small = size.width < 640;

  const { pos, rand } = useMemo(() => fibonacciSphere(small ? 7000 : 16000, 1.7), [small]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 30 },
      uPointer: { value: new THREE.Vector3(9, 9, 9) },
      uBone: { value: new THREE.Color("#ece6da") },
      uSignal: { value: new THREE.Color("#ff5a1f") },
    }),
    []
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = still ? 12 : state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uPixelRatio.value = gl.getPixelRatio();
    uniforms.uSize.value = small ? 26 : 34;

    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    const k = 1 - Math.exp(-delta * 3);
    g.rotation.y += ((still ? 0 : t * 0.07) + pointer.current.x * 0.35 + scroll * 1.2 - g.rotation.y) * k;
    g.rotation.x += (-pointer.current.y * 0.22 + scroll * 0.35 - g.rotation.x) * k;
    g.position.y += (scroll * 0.9 - g.position.y) * k;
    const s = 1 + scroll * 0.25;
    g.scale.setScalar(s);

    // Where the cursor "touches" the front of the sphere, in the orb's local space.
    hit.set(pointer.current.x * 2.1, pointer.current.y * 2.1, 1.3);
    g.worldToLocal(hit);
    uniforms.uPointer.value.lerp(hit, pointer.current.active ? 0.12 : 0.03);
  });

  return (
    <group ref={group}>
      <points ref={points} key={pos.length}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
          <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
      <Orbit radius={2.45} tilt={[1.15, 0.2, 0.3]} speed={0.32} still={still} />
      <Orbit radius={2.85} tilt={[1.75, -0.5, 0.9]} speed={-0.2} still={still} accent />
      <Orbit radius={3.3} tilt={[0.6, 0.9, -0.4]} speed={0.12} still={still} />
    </group>
  );
}

/** Hairline ring with one node travelling along it. */
function Orbit({ radius, tilt, speed, accent, still }) {
  const node = useRef();
  useFrame(({ clock }) => {
    const a = (still ? 2 : clock.elapsedTime) * speed + radius;
    node.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.0035, 6, 220]} />
        <meshBasicMaterial color="#ece6da" transparent opacity={0.16} />
      </mesh>
      <mesh ref={node}>
        <sphereGeometry args={[accent ? 0.045 : 0.03, 16, 16]} />
        <meshBasicMaterial color={accent ? "#ff5a1f" : "#ece6da"} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);

    let idle;
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.active = true;
      clearTimeout(idle);
      idle = setTimeout(() => (pointer.current.active = false), 1500);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={!visible ? "never" : still ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Orb pointer={pointer} still={still} />
      </Canvas>
    </div>
  );
}
