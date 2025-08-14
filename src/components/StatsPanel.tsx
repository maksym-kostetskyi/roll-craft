import React from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";

const StatsPanel: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-center items-center space-x-6 mt-6 text-sm bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center space-x-1">
        <Gem className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-semibold">5</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">x2</span>
        </div>
        <span className="text-blue-400 font-semibold">1</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
          <span className="text-black font-bold text-xs">0</span>
        </div>
        <span className="text-yellow-400 font-semibold">1</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">💣</span>
        </div>
        <span className="text-red-400 font-semibold">1</span>
      </div>
    </motion.div>
  );
};

export default StatsPanel;
