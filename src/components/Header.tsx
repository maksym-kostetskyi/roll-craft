import React from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { CounterUpAnimation } from "./FlyingMoney";

interface HeaderProps {
  balance: number;
  multiplier: number;
}

const Header: React.FC<HeaderProps> = ({ balance, multiplier }) => {
  return (
    <motion.header
      className="bg-black bg-opacity-30 backdrop-blur-sm p-4 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center text-white text-sm mb-4">
        <div className="flex items-center space-x-1">
          <span>9:41</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="text-xs ml-2">📶</span>
          <span className="text-xs">📶</span>
          <span className="text-xs">🔋</span>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          ST⭐R
        </motion.div>
        <div className="text-xs text-gray-300 uppercase tracking-wider">
          Casino
        </div>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-center space-x-2">
        <Gem className="w-6 h-6 text-green-400" />
        <motion.span
          className="text-3xl font-bold text-white"
          key={balance}
          initial={{ scale: 1.2, color: "#4ade80" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.5 }}
        >
          <CounterUpAnimation value={balance} />
        </motion.span>

        {multiplier > 1 && (
          <motion.div
            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold ml-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="w-4 h-4 mr-1 text-xs font-bold">x</span>
            {multiplier}
          </motion.div>
        )}
      </div>

      {/* Bottom Stats */}
      <div className="flex justify-center items-center space-x-6 mt-4 text-sm">
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
      </div>
    </motion.header>
  );
};

export default Header;
