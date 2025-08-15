import React from "react";
import { motion } from "framer-motion";
import GameCell from "./GameCell";
import { Cell } from "../types";

interface GameGridProps {
  cells: Cell[];
  onCellClick: (cellId: number) => void;
  gameStatus: "playing" | "won" | "lost";
}

const GameGrid: React.FC<GameGridProps> = ({
  cells,
  onCellClick,
  gameStatus,
}) => {
  return (
    <motion.div
      className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto p-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {cells.map((cell, index) => (
        <GameCell
          key={cell.id}
          cell={cell}
          onClick={() => onCellClick(cell.id)}
          gameStatus={gameStatus}
          delay={index * 0.05}
        />
      ))}
    </motion.div>
  );
};

export default GameGrid;
