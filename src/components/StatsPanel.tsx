import React from "react";
import { motion } from "framer-motion";
import { Cell } from "../types";
import cashIcon from "../assets/icons/cash.png";
import x2Icon from "../assets/icons/x2.png";
import zeroIcon from "../assets/icons/zero.png";
import bombIcon from "../assets/icons/bomb.png";
import stopIcon from "../assets/icons/stop.png";

interface StatsPanelProps {
  cells: Cell[];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ cells }) => {
  // Count unrevealed cells by type
  const unrevealed = cells.filter((cell) => !cell.isRevealed);
  const cashCount = unrevealed.filter((cell) => cell.type === "cash").length;
  const multiplierCount = unrevealed.filter(
    (cell) => cell.type === "multiplier"
  ).length;
  const emptyCount = unrevealed.filter((cell) => cell.type === "empty").length;
  const bombCount = unrevealed.filter((cell) => cell.type === "bomb").length;
  const stopCount = unrevealed.filter((cell) => cell.type === "stop").length;
  return (
    <motion.div
      className="flex justify-between items-center mt-6 w-full max-w-sm mx-auto px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex flex-col items-center space-y-1">
        <img src={cashIcon} alt="Cash" className="w-8 h-8" />
        <span className="text-green-400 font-bold text-lg">{cashCount}</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <img src={x2Icon} alt="x2 Multiplier" className="w-8 h-8" />
        <span className="text-blue-400 font-bold text-lg">
          {multiplierCount}
        </span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <img src={zeroIcon} alt="Zero" className="w-8 h-8" />
        <span className="text-yellow-400 font-bold text-lg">{emptyCount}</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <img src={bombIcon} alt="Bomb" className="w-8 h-8" />
        <span className="text-red-400 font-bold text-lg">{bombCount}</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <img src={stopIcon} alt="Stop" className="w-8 h-8" />
        <span className="text-orange-400 font-bold text-lg">{stopCount}</span>
      </div>
    </motion.div>
  );
};

export default StatsPanel;
