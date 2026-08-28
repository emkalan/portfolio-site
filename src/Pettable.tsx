import { useEffect, useRef } from "react";
import { useReward } from "partycles";

interface PettableProps {
  children: React.ReactNode;
}

export default function Pettable({ children }: PettableProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPet = useRef(0);

  const { reward, isAnimating } = useReward(
    targetRef as unknown as React.RefObject<HTMLElement>,
    "hearts",
    {
      particleCount: 8,
      spread: 30,
      elementSize: 60,
      lifetime: 105,
      physics: {
        gravity: 0.2,
        wind: -0.1,
      }
    }
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();

      if (lastMouse.current) {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;

        const distance = Math.hypot(dx, dy);
        const elapsed = now - lastMouse.current.time;
        const speed = distance / Math.max(elapsed, 1);

        if (speed > 0.1) {
          if (timer.current) {
            clearTimeout(timer.current);
          }

          if (
            now - lastPet.current > 5 &&
            !isAnimating
          ) {
            timer.current = setTimeout(() => {
              reward();
              lastPet.current = performance.now();
            }, 1);
          }
        }
      }

      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
        time: now,
      };
    };

    target.addEventListener("mousemove", handleMouseMove);

    return () => {
      target.removeEventListener("mousemove", handleMouseMove);

      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [reward, isAnimating]);

  return (
    <div ref={targetRef}>
      {children}
    </div>
  );
}