import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import cashIcon from "../assets/icons/cash.png";

interface FlyingMoneyProps {
  isVisible: boolean;
  amount: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
}

const FlyingCashIcon: React.FC<{
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  delay: number;
  onComplete?: () => void;
}> = ({ startPosition, endPosition, delay, onComplete }) => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{
        x: startPosition.x - 24, // Center the 48px icon (doubled size)
        y: startPosition.y - 24,
        scale: 2, // Start twice as big
        opacity: 1,
      }}
      animate={{
        x: endPosition.x - 12,
        y: endPosition.y - 12,
        scale: 0.5,
        opacity: 0, // Fade out completely at the end
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      <img src={cashIcon} alt="Cash" className="w-6 h-6" />
    </motion.div>
  );
};

const FlyingMoney: React.FC<FlyingMoneyProps> = ({
  isVisible,
  // amount is passed but not used in current implementation - could be used for dynamic icon count
  amount: _amount,
  startPosition,
  endPosition,
  onComplete,
}) => {
  const totalIcons = 5;

  const handleIconComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {Array.from({ length: totalIcons }, (_, index) => (
            <FlyingCashIcon
              key={`cash-${index}`}
              startPosition={startPosition}
              endPosition={endPosition}
              delay={index * 0.1} // Stagger each icon by 100ms
              onComplete={
                index === totalIcons - 1 ? handleIconComplete : undefined
              }
            />
          ))}
        </>
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
