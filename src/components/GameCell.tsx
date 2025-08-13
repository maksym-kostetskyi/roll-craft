import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Gem, Bomb } from "lucide-react";
import { Cell } from "../types";
import {
  useSoundEffects,
  createParticleEffect,
} from "../hooks/useSoundEffects";
import { getCashColorScheme, formatCurrency } from "../config/gameConfig";

interface GameCellProps {
  cell: Cell;
  onClick: () => void;
  gameStatus: "playing" | "won" | "lost";
  delay?: number;
}

const GameCell: React.FC<GameCellProps> = ({
  cell,
  onClick,
  gameStatus,
  delay = 0,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { playSound } = useSoundEffects();
  const cellRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cell.isRevealed || gameStatus !== "playing") return;

    playSound("click");
    setIsFlipping(true);

    setTimeout(() => {
      setIsFlipping(false);
      onClick();

      // Add particle effects after reveal
      if (cellRef.current) {
        if (cell.type === "cash") {
          createParticleEffect(cellRef.current, "cash");
          playSound("cash");
        } else if (cell.type === "multiplier") {
          createParticleEffect(cellRef.current, "multiplier");
          playSound("multiplier");
        } else if (cell.type === "bomb") {
          playSound("bomb");
        }
      }
    }, 300);
  };

  const getCellContent = () => {
    if (!cell.isRevealed) {
      return (
        <div className="w-full h-full bg-gray-600 rounded-lg border-2 border-gray-500 flex items-center justify-center cell-unrevealed">
          <span className="text-gray-400 text-2xl">$</span>
        </div>
      );
    }

    switch (cell.type) {
      case "cash":
        // Use config-based color scheme
        const colorScheme = getCashColorScheme(cell.value);

        return (
          <div
            className={`w-full h-full ${colorScheme.bg} rounded-lg border-2 ${colorScheme.border} flex flex-col items-center justify-center text-white animate-bounce-in shadow-lg`}
          >
            <Gem className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">
              {formatCurrency(cell.value)}
            </span>
          </div>
        );
      case "multiplier":
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg border-2 border-blue-400 flex items-center justify-center text-white animate-bounce-in glow-effect shadow-lg">
            <span className="text-2xl font-bold">x2</span>
          </div>
        );
      case "bomb":
        return (
          <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-lg border-2 border-red-400 flex items-center justify-center text-white animate-bounce-in bomb-explode shadow-lg">
            <Bomb className="w-8 h-8" />
          </div>
        );
      case "empty":
        return (
          <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg border-2 border-yellow-400 flex items-center justify-center text-black animate-bounce-in shadow-lg">
            <span className="text-2xl font-bold">0</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getHoverEffect = () => {
    if (cell.isRevealed || gameStatus !== "playing") return "";
    return "hover:scale-105 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/50";
  };

  return (
    <motion.div
      ref={cellRef}
      className={`aspect-square w-24 h-24 md:w-28 md:h-28 cursor-pointer transition-all duration-200 ${getHoverEffect()} ${
        isFlipping ? "animate-flip" : ""
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{
        scale: cell.isRevealed || gameStatus !== "playing" ? 1 : 1.05,
      }}
      whileTap={{
        scale: cell.isRevealed || gameStatus !== "playing" ? 1 : 0.95,
      }}
    >
      {getCellContent()}
    </motion.div>
  );
};

export default GameCell;
