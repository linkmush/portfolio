import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loader({ onLoaded }: { onLoaded: () => void }) {
  const { progress } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);

  // ⏱ minimitid på 3 sek
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && minTimePassed) {
      onLoaded();
    }
  }, [progress, minTimePassed, onLoaded]);

  return null;
}
