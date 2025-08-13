import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem } from "lucide-react";
import { useState, useEffect } from "react";

interface FlyingMoneyProps {
  isVisible: boolean;
  amount: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
}

const FlyingMoney: React.FC<FlyingMoneyProps> = ({
  isVisible,
  amount,
  startPosition,
  endPosition,
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          initial={{
            x: startPosition.x,
            y: startPosition.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: endPosition.x,
            y: endPosition.y,
            scale: 0.7,
            opacity: 0.8,
          }}
          exit={{
            scale: 0.3,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          onAnimationComplete={onComplete}
        >
          <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg">
            <Gem className="w-4 h-4" />
            <span>+{amount.toLocaleString()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CounterUpAnimationProps {
  value: number;
  duration?: number;
}

export const CounterUpAnimation: React.FC<CounterUpAnimationProps> = ({
  value,
  duration = 500,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    const totalChange = endValue - startValue;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + totalChange * easeOutQuart);

      setDisplayValue(currentValue);

      if (progress === 1) {
        clearInterval(timer);
        setDisplayValue(endValue);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [value, duration, displayValue]);

  return (
    <motion.span
      key={value}
      initial={{ y: 10, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
};

export default FlyingMoney;
