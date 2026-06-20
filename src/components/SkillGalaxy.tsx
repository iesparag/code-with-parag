'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Billboard, Text, Stars } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '@/data/skills-data';

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#a78bfa', // violet
  backend: '#22d3ee', // cyan
  tools: '#f472b6', // pink
  other: '#34d399', // emerald
};

type SkillNode = { skill: string; color: string; position: THREE.Vector3 };

/** Evenly distribute N points on a sphere (Fibonacci lattice). */
function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const offset = 2 / samples;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push(
      new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius)
    );
  }
  return pts;
}

function Label({ node }: { node: SkillNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Billboard position={node.position}>
      <Text
        fontSize={hovered ? 0.48 : 0.34}
        color={hovered ? '#ffffff' : node.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor={node.color}
        outlineOpacity={hovered ? 1 : 0.45}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {node.skill}
      </Text>
    </Billboard>
  );
}

/** Pulsing wireframe "AI core" at the centre. */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y += 0.004;
    ref.current.rotation.x += 0.002;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.85}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/** Faint "synapse" lines from the core out to each skill node. */
function Synapses({ nodes }: { nodes: SkillNode[] }) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((n) => {
      positions.push(0, 0, 0, n.position.x, n.position.y, n.position.z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes]);
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#6d28d9" transparent opacity={0.12} />
    </lineSegments>
  );
}

function Galaxy() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo<SkillNode[]>(() => {
    const all: { skill: string; cat: string }[] = [];
    Object.entries(skillsData).forEach(([cat, c]) =>
      c.skills.forEach((s) => all.push({ skill: s, cat }))
    );
    const pts = fibonacciSphere(all.length, 5.2);
    return all.map((a, i) => ({
      skill: a.skill,
      color: CATEGORY_COLORS[a.cat] ?? '#a78bfa',
      position: pts[i],
    }));
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    // gentle wobble + float for a more "alive" feel
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
  });

  return (
    <group ref={group}>
      <Core />
      <Synapses nodes={nodes} />
      {nodes.map((n) => (
        <Label key={n.skill} node={n} />
      ))}
    </group>
  );
}

export default function SkillGalaxy() {
  return (
    <div className="w-full h-[520px] sm:h-[640px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#22d3ee" />
        <Suspense fallback={null}>
          <Stars radius={60} depth={40} count={1800} factor={4} saturation={0} fade speed={1} />
          <Galaxy />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
