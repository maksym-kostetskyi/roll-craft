import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Cell } from "../types";
import {
  useSoundEffects,
  createParticleEffect,
} from "../hooks/useSoundEffects";
import { getCashColorScheme, formatCurrency } from "../config/gameConfig";
import cashIcon from "../assets/icons/cash-l.png";
import zeroIcon from "../assets/icons/zero-l.png";
import bombIcon from "../assets/icons/bomb-l.png";
import stopIcon from "../assets/icons/stop-l.png";
import x2Icon from "../assets/icons/x2-l.png";
import lightOverlay from "../assets/light.png";

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
        } else if (cell.type === "stop") {
          playSound("click"); // Or add a specific stop sound
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
            className={`w-full h-full ${colorScheme.bg} rounded-lg border-2 ${colorScheme.border} flex flex-col items-center justify-center text-white animate-bounce-in shadow-lg relative overflow-hidden`}
            style={{
              backgroundColor: `${colorScheme.bg.replace("bg-", "")}80`,
            }}
          >
            <img
              src={lightOverlay}
              alt="Light overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
            />
            <img
              src={cashIcon}
              alt="Cash"
              className="w-1/2 h-1/2 mb-1 relative z-10"
            />
            <span className="text-xs font-bold relative z-10">
              {formatCurrency(cell.value)}
            </span>
          </div>
        );
      case "multiplier":
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/50 to-blue-700/50 rounded-lg border-2 border-blue-400 flex items-center justify-center text-white animate-bounce-in glow-effect shadow-lg relative overflow-hidden">
            <img
              src={lightOverlay}
              alt="Light overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
            />

            <img src={x2Icon} alt="x2-l" className="w-1/3 h-1/3" />
          </div>
        );
      case "bomb":
        return (
          <div className="w-full h-full bg-gradient-to-br from-red-500/50 to-red-700/50 rounded-lg border-2 border-red-400 flex items-center justify-center text-white animate-bounce-in bomb-explode shadow-lg relative overflow-hidden">
            <img
              src={lightOverlay}
              alt="Light overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
            />
            <img
              src={bombIcon}
              alt="Bomb"
              className="w-1/2 h-1/2 relative z-10"
            />
          </div>
        );
      case "empty":
        return (
          <div className="w-full h-full bg-gradient-to-br from-yellow-500/50 to-yellow-700/50 rounded-lg border-2 border-yellow-400 flex items-center justify-center text-black animate-bounce-in shadow-lg relative overflow-hidden">
            <img
              src={lightOverlay}
              alt="Light overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
            />
            <img
              src={zeroIcon}
              alt="Zero"
              className="w-1/2 h-1/2 relative z-10"
            />
          </div>
        );
      case "stop":
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-500/50 to-orange-700/50 rounded-lg border-2 border-orange-400 flex items-center justify-center text-white animate-bounce-in shadow-lg relative overflow-hidden">
            <img
              src={lightOverlay}
              alt="Light overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
            />
            <img
              src={stopIcon}
              alt="Stop"
              className="w-1/2 h-1/2 relative z-10"
            />
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
      data-cell-id={cell.id}
      className={`aspect-square w-full cursor-pointer transition-all duration-200 ${getHoverEffect()} ${
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
