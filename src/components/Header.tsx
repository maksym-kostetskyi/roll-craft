import React from "react";
import { motion } from "framer-motion";
import { CounterUpAnimation } from "./FlyingMoney";
import cashIcon from "../assets/icons/cash.png";
import logo from "../assets/logo.svg";
import cellularIcon from "../assets/icons/Cellular Connection.svg";
import wifiIcon from "../assets/icons/Wifi.svg";
import batteryIcon from "../assets/icons/Battery.svg";

interface HeaderProps {
  balance: number;
  multiplier: number;
}

const Header: React.FC<HeaderProps> = ({ balance, multiplier }) => {
  return (
    <motion.header
      className="p-4 px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center text-white text-sm mb-4">
        <div className="flex items-center space-x-1">
          <span>9:41</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={cellularIcon} alt="Cellular" className="w-4 h-4" />
          <img src={wifiIcon} alt="Wifi" className="w-4 h-4" />
          <img src={batteryIcon} alt="Battery" className="w-4 h-4" />
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <motion.div
          className="flex justify-center items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <img src={logo} alt="Star Industry" className="h-12 w-auto" />
        </motion.div>
      </div>

      {/* Decorative lines around Roll Craft */}
      <motion.div
        className="flex items-center justify-center px-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex-1 h-px bg-white opacity-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        ></motion.div>
        <span className="px-4 text-xl md:text-2xl font-bold text-white">
          Roll Craft
        </span>
        <motion.div
          className="flex-1 h-px bg-white opacity-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        ></motion.div>
      </motion.div>

      {/* Balance */}
      <div className="flex items-center justify-between px-4">
        {/* Multiplier on the left */}
        <div className="flex items-center">
          {multiplier > 1 && (
            <motion.div
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="w-4 h-4 mr-1 text-xs font-bold">x</span>
              {multiplier}
            </motion.div>
          )}
        </div>

        {/* Balance in the center */}
        <div className="flex items-center space-x-2" data-header-balance>
          <img src={cashIcon} alt="Cash" className="w-6 h-6" />
          <motion.span
            className="text-3xl font-bold text-white"
            key={balance}
            initial={{ scale: 1.2, color: "#4ade80" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.5 }}
          >
            <CounterUpAnimation value={balance} />
          </motion.span>
        </div>

        {/* Empty space on the right for balance */}
        <div className="w-16"></div>
      </div>
    </motion.header>
  );
};

export default Header;
