import { useCallback } from "react";

export type SoundType =
  | "click"
  | "win"
  | "lose"
  | "multiplier"
  | "cash"
  | "bomb";

export const useSoundEffects = () => {
  const playSound = useCallback((type: SoundType) => {
    // In a real implementation, you would play actual sound files
    // For now, we'll just provide haptic feedback on mobile devices
    if ("vibrate" in navigator) {
      switch (type) {
        case "click":
          navigator.vibrate(50);
          break;
        case "cash":
          navigator.vibrate([100, 50, 100]);
          break;
        case "multiplier":
          navigator.vibrate([200, 100, 200, 100, 200]);
          break;
        case "bomb":
          navigator.vibrate([500, 200, 500]);
          break;
        case "win":
          navigator.vibrate([100, 50, 100, 50, 100, 50, 200]);
          break;
        case "lose":
          navigator.vibrate([300, 100, 300]);
          break;
        default:
          navigator.vibrate(50);
      }
    }
  }, []);

  return { playSound };
};

// Utility for visual feedback
export const createParticleEffect = (
  element: HTMLElement,
  type: "cash" | "multiplier"
) => {
  // Simple particle effect using CSS animations
  const particles = Array.from({ length: 6 }, (_, i) => {
    const particle = document.createElement("div");
    particle.className = `fixed pointer-events-none w-2 h-2 rounded-full z-50`;

    if (type === "cash") {
      particle.style.background = "linear-gradient(45deg, #22c55e, #16a34a)";
    } else {
      particle.style.background = "linear-gradient(45deg, #3b82f6, #1d4ed8)";
    }

    const rect = element.getBoundingClientRect();
    particle.style.left = `${rect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top + rect.height / 2}px`;

    // Random direction
    const angle = (Math.PI * 2 * i) / 6;
    const velocity = 100 + Math.random() * 50;
    const deltaX = Math.cos(angle) * velocity;
    const deltaY = Math.sin(angle) * velocity;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      particle.remove();
    };

    document.body.appendChild(particle);
    return particle;
  });

  return particles;
};
