"use client";

import {
  Environment,
  Lightformer,
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
import { THEME_COLORS, type Theme } from "@/lib/theme";

export type SceneHandle = {
  rotateBy: (radians: number) => void;
};

export type LightboxSceneProps = {
  light: boolean;
  /** Motyw strony: tło sceny ma kolor strony, żeby kadr zlewał się z tłem. */
  theme: Theme;
  active: boolean;
  handle?: RefObject<SceneHandle | null>;
  onReady?: () => void;
};

const MODEL_URL = "/models/glowbox-lightbox.glb";
const SCALE = 10; // model jest w metrach, scena w decymetrach
const BASE_DISTANCE = 5.2;
const INITIAL_AZIMUTH = 0.26;
const INITIAL_ELEVATION = 0.03;
const BLOOM = 0.8;

// Kolory światła: część niebieska, część biała i niebieska poświata przed frontem.
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

  const model = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.geometry = toCreasedNormals(
        obj.geometry,
        THREE.MathUtils.degToRad(28),
      );
      const name = obj.name;
      if (name === "ring" || name === "logoBlue") obj.material = mats.blue;
      else if (name === "logoWhite") obj.material = mats.white;
      else if (name === "face") obj.material = mats.face;
      else obj.material = mats.housing;
    });
    return root;
  }, [scene, mats]);

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
  );
}

// Zgaszony lightbox stoi w jasnym świetle studyjnym. Po włączeniu światło
// studyjne przygasa, żeby podświetlenie było lepiej widoczne.
function StudioLights({ level }: { level: RefObject<number> }) {
  const key = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    if (key.current) {
      key.current.intensity = THREE.MathUtils.lerp(5.5, 1.1, level.current);
    }
  });
  return <directionalLight ref={key} position={[-4, 5, 2.5]} />;
}

// Poświata (bloom) rośnie razem ze światłem, więc zgaszony lightbox nie świeci.
// Na jasnym tle jej nie ma: jasne tło samo przekracza próg i całe by się prześwietliło.
function LightBloom({
  level,
  enabled,
}: {
  level: RefObject<number>;
  enabled: boolean;
}) {
  const bloom = useRef<BloomEffect>(null);
  useFrame(() => {
    if (bloom.current) {
      bloom.current.intensity = enabled ? level.current * BLOOM : 0;
    }
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

function CameraRig({
  handle,
  rotation,
}: {
  handle?: RefObject<SceneHandle | null>;
  rotation: RefObject<number>;
}) {
  const { camera } = useThree();
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
  }));

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
  theme,
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
      <color attach="background" args={[THEME_COLORS[theme]]} />
      <fog attach="fog" args={[THEME_COLORS[theme], 7, 16]} />
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
        <LightBloom level={level} enabled={theme === "dark"} />
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
