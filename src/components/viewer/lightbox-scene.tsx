"use client";

import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { BloomEffect } from "postprocessing";
import {
  type RefObject,
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type SceneHandle = {
  rotateBy: (radians: number) => void;
  zoomBy: (factor: number) => void;
};

export type LightboxSceneProps = {
  light: boolean;
  active: boolean;
  handle?: RefObject<SceneHandle | null>;
  onReady?: () => void;
};

const MODEL_URL = "/models/glowbox-lightbox.glb";
const SCALE = 10; // model jest w metrach, scena w decymetrach
const BASE_DISTANCE = 5.5;
const INITIAL_AZIMUTH = -0.62;
const INITIAL_ELEVATION = 0.1;
const BLOOM = 0.8;

// Kolory światła: część niebieska, część biała, poświata na podłodze.
const GLOW = { blue: "#0055ff", white: "#ffffff", spill: "#1a7cff" };

function useLightboxMaterials() {
  return useMemo(
    () => ({
      housing: new THREE.MeshStandardMaterial({
        color: "#16181c",
        roughness: 0.55,
        metalness: 0.05,
      }),
      face: new THREE.MeshStandardMaterial({
        color: "#060708",
        roughness: 0.45,
        metalness: 0.0,
      }),
      blue: new THREE.MeshStandardMaterial({
        color: "#0a5fc4",
        roughness: 0.45,
        emissive: new THREE.Color(GLOW.blue),
        emissiveIntensity: 0,
        toneMapped: false,
      }),
      white: new THREE.MeshStandardMaterial({
        color: "#e4e5e7",
        roughness: 0.45,
        emissive: new THREE.Color(GLOW.white),
        emissiveIntensity: 0,
        toneMapped: false,
      }),
    }),
    [],
  );
}

function Lightbox({
  light,
  level,
  rotation,
}: {
  light: boolean;
  level: RefObject<number>;
  rotation: RefObject<number>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const mats = useLightboxMaterials();
  const group = useRef<THREE.Group>(null);
  const spill = useRef<THREE.PointLight>(null);
  const pool = useRef<THREE.MeshBasicMaterial>(null);

  const model = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.geometry = toCreasedNormals(
        obj.geometry,
        THREE.MathUtils.degToRad(28),
      );
      obj.castShadow = true;
      const name = obj.name;
      if (name === "ring" || name === "logoBlue") obj.material = mats.blue;
      else if (name === "logoWhite") obj.material = mats.white;
      else if (name === "face") obj.material = mats.face;
      else obj.material = mats.housing;
    });
    return root;
  }, [scene, mats]);

  const poolTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    const target = light ? 1 : 0;
    level.current = THREE.MathUtils.damp(
      level.current,
      target,
      light ? 7 : 9,
      delta,
    );
    const l = level.current;
    mats.blue.emissiveIntensity = l * 1.7;
    mats.white.emissiveIntensity = l * 1.05;
    if (spill.current) spill.current.intensity = l * 6;
    if (pool.current) pool.current.opacity = l * 0.55;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        rotation.current,
        6,
        delta,
      );
    }
  });

  return (
    <>
      <group ref={group}>
        {/* środek modelu w osi Z: front w z=0, tył w z=-32,4 mm */}
        <primitive object={model} scale={SCALE} position={[0, 0, 0.162]} />
        <pointLight
          ref={spill}
          position={[0, -0.4, 1.4]}
          color={GLOW.spill}
          distance={5}
          decay={2}
          intensity={0}
        />
      </group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.019, 0.5]}
        renderOrder={1}
      >
        <planeGeometry args={[4.2, 3]} />
        <meshBasicMaterial
          ref={pool}
          map={poolTexture}
          color={GLOW.spill}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

// Zgaszony lightbox stoi w jasnym świetle studyjnym. Po włączeniu światło
// studyjne przygasa, żeby podświetlenie było lepiej widoczne.
function StudioLights({ level }: { level: RefObject<number> }) {
  const key = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    if (key.current) {
      key.current.intensity = THREE.MathUtils.lerp(3.8, 1.1, level.current);
    }
  });
  return <directionalLight ref={key} position={[-3.5, 4.5, 4]} />;
}

// Poświata (bloom) rośnie razem ze światłem, więc zgaszony lightbox nie świeci.
function LightBloom({ level }: { level: RefObject<number> }) {
  const bloom = useRef<BloomEffect>(null);
  useFrame(() => {
    if (bloom.current) bloom.current.intensity = level.current * BLOOM;
  });
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        ref={bloom}
        mipmapBlur
        luminanceThreshold={0.25}
        luminanceSmoothing={0.1}
        intensity={0}
        radius={0.35}
      />
    </EffectComposer>
  );
}

function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.02, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial
        blur={[300, 90]}
        resolution={512}
        mixBlur={1}
        mixStrength={10}
        roughness={0.92}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#07090c"
        metalness={0.55}
        mirror={0.5}
      />
    </mesh>
  );
}

function CameraRig({
  handle,
  rotation,
}: {
  handle?: RefObject<SceneHandle | null>;
  rotation: RefObject<number>;
}) {
  const { camera } = useThree();
  const zoom = useRef(1);
  const target = useMemo(() => new THREE.Vector3(0, -0.05, 0), []);

  useEffect(() => {
    const [az, el, d] = [INITIAL_AZIMUTH, INITIAL_ELEVATION, BASE_DISTANCE];
    camera.position.set(
      Math.sin(az) * Math.cos(el) * d,
      Math.sin(el) * d - 0.05,
      Math.cos(az) * Math.cos(el) * d,
    );
    camera.lookAt(target);
  }, [camera, target]);

  useImperativeHandle(handle, () => ({
    rotateBy: (radians) => {
      rotation.current += radians;
    },
    zoomBy: (factor) => {
      zoom.current = THREE.MathUtils.clamp(zoom.current * factor, 0.7, 1.9);
    },
  }));

  useFrame((_, delta) => {
    const desired = BASE_DISTANCE / zoom.current;
    const offset = camera.position.clone().sub(target);
    const length = THREE.MathUtils.damp(offset.length(), desired, 6, delta);
    camera.position.copy(target).add(offset.setLength(length));
  });

  return null;
}

// Model pokazujemy dopiero po skompilowaniu shaderów i kilku klatkach,
// żeby przejście z plakatu było płynne i bez przycięć.
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const { gl, scene, camera } = useThree();
  const compiled = useRef(false);
  const frames = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) compiled.current = true;
    };
    gl.compileAsync(scene, camera).then(finish, finish);
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera]);

  useFrame(() => {
    if (done.current || !compiled.current) return;
    frames.current += 1;
    if (frames.current > 12) {
      done.current = true;
      onReady?.();
    }
  });
  return null;
}

export default function LightboxScene({
  light,
  active,
  handle,
  onReady,
}: LightboxSceneProps) {
  const rotation = useRef(0);
  const level = useRef(light ? 1 : 0);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 28, near: 0.1, far: 60, position: [0, 0, BASE_DISTANCE] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        // Pionowy gest przewija stronę, poziomy obraca model.
        gl.domElement.style.touchAction = "pan-y";
      }}
    >
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 7, 16]} />
      <ambientLight intensity={0.12} />
      <StudioLights level={level} />
      <spotLight
        position={[4, 3, -3]}
        angle={0.5}
        penumbra={1}
        intensity={30}
        color="#7fb8ff"
      />
      <Suspense fallback={null}>
        <Lightbox light={light} level={level} rotation={rotation} />
        <Floor />
        <ContactShadows
          position={[0, -1.015, 0]}
          opacity={0.6}
          scale={5}
          blur={2.6}
          far={1.5}
        />
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 4, 2]} scale={[6, 1.5, 1]} />
          <Lightformer
            intensity={1.4}
            position={[-5, 1, 1]}
            rotation-y={Math.PI / 2}
            scale={[4, 2, 1]}
          />
          <Lightformer
            intensity={0.6}
            color="#4a9dff"
            position={[5, 1, -1]}
            rotation-y={-Math.PI / 2}
            scale={[4, 2, 1]}
          />
        </Environment>
        <LightBloom level={level} />
        <ReadySignal onReady={onReady} />
      </Suspense>
      <CameraRig handle={handle} rotation={rotation} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.54}
        target={[0, -0.05, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
