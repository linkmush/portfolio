// import * as THREE from "three";
// import { Points, PointMaterial } from "@react-three/drei";
// import { useMemo } from "react";

// export function Galaxy() {
//   const galaxy = useMemo(() => {
//     const count = 80000; // fler stjärnor = tätare
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);

//     const colorInside = new THREE.Color("#ffffff");  // vit kärna
//     const colorMiddle = new THREE.Color("#66aaff"); // blå mitt
//     const colorOuter = new THREE.Color("#ff8844");  // orange/röd ytterkant

//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;

//       // spiralform
//       const radius = Math.random() * 35; // större galax
//       const spinAngle = radius * 1.2;
//       const branchAngle = ((i % 5) / 5) * Math.PI * 2;

//       positions[i3] =
//         Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;
//       positions[i3 + 1] = (Math.random() - 0.5) * 4; // tjockare på höjd
//       positions[i3 + 2] =
//         Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;

//       // färginterpolering
//       const mixedColor = colorInside.clone();
//       mixedColor.lerpColors(colorMiddle, colorOuter, radius / 35);

//       colors[i3] = mixedColor.r;
//       colors[i3 + 1] = mixedColor.g;
//       colors[i3 + 2] = mixedColor.b;
//     }

//     return { positions, colors, count };
//   }, []);

//   return (
//     <group position={[0, -1, 0]} scale={3}>
//       <Points
//         positions={galaxy.positions}
//         stride={3}
//         frustumCulled={false}
//         colors={galaxy.colors}
//       >
//         <PointMaterial
//           transparent
//           vertexColors
//           size={0.08}
//           sizeAttenuation
//           depthWrite={false}
//         />
//       </Points>
//     </group>
//   );
// }

import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

export function Galaxy() {
  const galaxy = useMemo(() => {
    const count = 80000; // fler stjärnor = tätare
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // färger för olika typer av stjärnor
    const colorInside = new THREE.Color("#ffffff");   // vit kärna
    const colorBlue = new THREE.Color("#88caff");    // blå stjärnor
    const colorOrange = new THREE.Color("#ff9966");  // orange/röd stjärnor
    const colorYellow = new THREE.Color("#ffe066");  // gula stjärnor
    const colorPurple = new THREE.Color("#bb66ff");  // lila nyanser för variation

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // spiralform
      const radius = Math.random() * 35;
      const spinAngle = radius * 1.2;
      const branchAngle = ((i % 5) / 5) * Math.PI * 2;

      positions[i3] =
        Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;

      // basfärg beroende på avstånd
      let mixedColor = colorInside.clone();
      mixedColor.lerp(colorBlue, radius / 40);

      // slumpmässiga variationer för mer liv
      const rand = Math.random();
      if (rand < 0.15) mixedColor = colorOrange.clone(); // 15% orange
      else if (rand < 0.3) mixedColor = colorYellow.clone(); // 15% gul
      else if (rand < 0.45) mixedColor = colorPurple.clone(); // 15% lila
      else if (rand > 0.85) mixedColor = colorBlue.clone(); // 15% extra blå
      // resten blir vit/blå mix

      // extra glow nära mitten (ljusare stjärnor)
      if (radius < 5) {
        mixedColor.lerp(colorInside, 0.7); // gör centrum mer vit/lysande
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors, count };
  }, []);

  return (
    <group position={[0, -1, 0]} scale={3}>
      <Points
        positions={galaxy.positions}
        stride={3}
        frustumCulled={false}
        colors={galaxy.colors}
      >
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
