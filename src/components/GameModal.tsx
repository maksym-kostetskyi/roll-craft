import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, RotateCcw, X } from "lucide-react";
import stopIcon from "../assets/icons/stop-l.png";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "win" | "lose" | "claim" | "stop";
  balance: number;
  onNewGame: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  type,
  balance,
  onNewGame,
}) => {
  const getModalContent = () => {
    switch (type) {
      case "lose":
        return {
          title: "Danger ahead!",
          subtitle:
            "You're on a Bomb Square! You hit a bomb and lose all rewards from this field.",
          buttonText: "Take a hit",
          buttonColor: "bg-red-500 hover:bg-red-600",
          showDefuse: true,
        };
      case "stop":
        return {
          title: "Game over!",
          subtitle: "You've landed on a Stop field",
          buttonText: "Claim",
          buttonColor: "bg-green-500 hover:bg-green-600",
          showDefuse: false,
        };
      case "win":
      case "claim":
        return {
          title: "Game over!",
          subtitle: "You've reached the end of this run...",
          buttonText: "Claim",
          buttonColor: "bg-green-500 hover:bg-green-600",
          showDefuse: false,
        };
      default:
        return {
          title: "Game over!",
          subtitle: "",
          buttonText: "Continue",
          buttonColor: "bg-green-500 hover:bg-green-600",
          showDefuse: false,
        };
    }
  };

  const content = getModalContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-b from-purple-800 to-purple-900 rounded-2xl p-8 max-w-sm w-full mx-4 relative"
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center">
              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {content.title}
              </motion.h2>

              <motion.p
                className="text-gray-300 text-sm mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {content.subtitle}
              </motion.p>

              {/* Bomb visual for lose state */}
              {type === "lose" && (
                <motion.div
                  className="mb-6 relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-3xl">💣</span>
                  </div>
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-sm">🔥</span>
                  </motion.div>
                </motion.div>
              )}

              {/* Stop visual for stop state */}
              {type === "stop" && (
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-2 flex items-center justify-center border-4 border-white">
                    <img src={stopIcon} alt="Stop" className="w-10 h-10" />
                  </div>
                </motion.div>
              )}

              {/* Balance display */}
              <motion.div
                className="flex items-center justify-center space-x-2 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Gem className="w-8 h-8 text-green-400" />
                <span className="text-4xl font-bold text-white">
                  {balance >= 100000
                    ? `${(balance / 1000).toFixed(0)}K`
                    : balance.toLocaleString()}
                </span>
              </motion.div>

              {type === "stop" && (
                <motion.p
                  className="text-green-300 text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Your earnings amount is{" "}
                  {balance >= 100000
                    ? `${(balance / 1000).toFixed(0)}K`
                    : balance.toLocaleString()}
                </motion.p>
              )}

              {type === "lose" && (
                <motion.p
                  className="text-yellow-300 text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ...claim and return to the main board
                </motion.p>
              )}

              {type === "lose" && balance > 0 && (
                <motion.p
                  className="text-yellow-300 text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ...or defuse it and save your run!
                </motion.p>
              )}

              {/* Action buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={onNewGame}
                  className={`w-full ${content.buttonColor} text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.buttonText}
                </motion.button>

                {content.showDefuse && balance > 0 && (
                  <motion.button
                    onClick={onNewGame}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Defuse for</span>
                    <Gem className="w-4 h-4" />
                    <span>49</span>
                  </motion.button>
                )}

                <motion.button
                  onClick={onNewGame}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Game</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
