import { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type PrimitiveProps = Omit<React.ComponentPropsWithoutRef<"primitive">, "object">;

export default function SpaceModel(props: PrimitiveProps) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/scene-compressed.glb");

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  return <primitive ref={ref} object={scene} {...props} />;
}

// (valfritt – snabbare första render)
useGLTF.preload("/scene-compressed.glb");
