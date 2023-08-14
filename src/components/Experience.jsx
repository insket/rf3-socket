import React, { useState } from "react";
import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimationWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./ScoketManager";
import * as THREE from "three"

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);

  useCursor(onFloor);
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <ContactShadows blur={2} />
      <OrbitControls />

      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.01}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={"#55efc4"} />
      </mesh>

      {characters.map((character) => (
        <AnimationWoman
          key={character.id}
          position={new THREE.Vector3(...character.position)}
          hairColor={character.hairColor}
          topColor={character.topColor}
          bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};
