import { useState, useEffect } from "react";
import GameGrid from "./components/GameGrid";
import Header from "./components/Header";
import GameModal from "./components/GameModal";
import BottomNavigation from "./components/BottomNavigation";
import StatsPanel from "./components/StatsPanel";
import FlyingMoney from "./components/FlyingMoney";
import { GameState, Cell, CellType } from "./types";
import { motion } from "framer-motion";
import { GAME_CONFIG } from "./config/gameConfig";
import bgImage from "./assets/bg.png";

// Generate random game board
const generateGameBoard = (): Cell[] => {
  const types: CellType[] = [
    ...Array(GAME_CONFIG.CASH_CELLS).fill("cash"),
    ...Array(GAME_CONFIG.BOMB_CELLS).fill("bomb"),
    ...Array(GAME_CONFIG.MULTIPLIER_CELLS).fill("multiplier"),
    ...Array(GAME_CONFIG.EMPTY_CELLS).fill("empty"),
    ...Array(GAME_CONFIG.STOP_CELLS).fill("stop"),
  ];

  // Shuffle the types
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  return types.map((type, index) => {
    let value = 0;
    if (type === "cash") {
      value =
        GAME_CONFIG.CASH_VALUES[
          Math.floor(Math.random() * GAME_CONFIG.CASH_VALUES.length)
        ];
    }

    return {
      id: index,
      type,
      value,
      isRevealed: false,
      position: {
        row: Math.floor(index / 3),
        col: index % 3,
      },
    };
  });
};

function App() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    cells: generateGameBoard(),
    balance: 0,
    multiplier: 1,
    gameStatus: "playing",
    revealedCells: [],
    endReason: undefined,
  }));

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "claim" as "win" | "lose" | "claim" | "stop",
  });

  const [flyingMoney, setFlyingMoney] = useState<{
    isVisible: boolean;
    amount: number;
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
    key: number; // Add unique key for each animation
  }>({
    isVisible: false,
    amount: 0,
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 0 },
    key: 0,
  });

  const handleCellClick = (cellId: number) => {
    if (gameState.gameStatus !== "playing") return;

    const cell = gameState.cells[cellId];
    if (cell.isRevealed) return;

    // Calculate positions for flying money animation
    if (cell.type === "cash") {
      const cellElement = document.querySelector(`[data-cell-id="${cellId}"]`);
      const headerBalance = document.querySelector("[data-header-balance]");

      if (cellElement && headerBalance) {
        const cellRect = cellElement.getBoundingClientRect();
        const headerRect = headerBalance.getBoundingClientRect();

        const startPosition = {
          x: cellRect.left + cellRect.width / 2,
          y: cellRect.top + cellRect.height / 2,
        };

        const endPosition = {
          x: headerRect.left + headerRect.width / 2,
          y: headerRect.top + headerRect.height / 2,
        };

        // Start flying money animation after a short delay
        setTimeout(() => {
          setFlyingMoney({
            isVisible: true,
            amount: cell.value * gameState.multiplier,
            startPosition,
            endPosition,
            key: Date.now(), // Unique key for each animation
          });
        }, 300);
      }
    }

    setGameState((prev) => {
      const newCells = [...prev.cells];
      newCells[cellId] = { ...cell, isRevealed: true };

      let newBalance = prev.balance;
      let newMultiplier = prev.multiplier;
      let newGameStatus = prev.gameStatus;

      if (cell.type === "cash") {
        newBalance += cell.value * prev.multiplier;
      } else if (cell.type === "multiplier") {
        newMultiplier = prev.multiplier * 2;
        // Apply multiplier retroactively to already revealed cash
        const additionalBalance = prev.revealedCells.reduce((total, id) => {
          const revealedCell = prev.cells[id];
          if (revealedCell.type === "cash") {
            return total + revealedCell.value;
          }
          return total;
        }, 0);
        newBalance += additionalBalance;
      } else if (cell.type === "bomb") {
        newGameStatus = "lost";
        // Reveal all cells
        newCells.forEach((c) => (c.isRevealed = true));
      } else if (cell.type === "stop") {
        // Stop field - game ends but player can claim winnings or pay to continue
        newGameStatus = "won";
        // Reveal all cells like with bomb
        newCells.forEach((c) => (c.isRevealed = true));
      }

      const endReason =
        cell.type === "bomb"
          ? ("bomb" as const)
          : cell.type === "stop"
          ? ("stop" as const)
          : prev.endReason;

      return {
        ...prev,
        cells: newCells,
        balance: newBalance,
        multiplier: newMultiplier,
        gameStatus: newGameStatus,
        revealedCells: [...prev.revealedCells, cellId],
        endReason,
      };
    });
  };

  const handleClaim = () => {
    if (gameState.gameStatus === "playing") {
      setGameState((prev) => ({ ...prev, gameStatus: "won" }));
      setModalState({ isOpen: true, type: "claim" });
    }
  };

  const handleFlyingMoneyComplete = () => {
    setFlyingMoney((prev) => ({ ...prev, isVisible: false }));
  };

  const handleNewGame = () => {
    setGameState({
      cells: generateGameBoard(),
      balance: 0,
      multiplier: 1,
      gameStatus: "playing",
      revealedCells: [],
      endReason: undefined,
    });
    setModalState({ isOpen: false, type: "claim" });
  };

  // Auto-open modal when game ends
  useEffect(() => {
    if (gameState.gameStatus === "lost") {
      setModalState({ isOpen: true, type: "lose" });
    } else if (gameState.gameStatus === "won") {
      const modalType = gameState.endReason === "stop" ? "stop" : "win";
      setModalState({ isOpen: true, type: modalType });
    }
  }, [gameState.gameStatus, gameState.endReason]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header balance={gameState.balance} multiplier={gameState.multiplier} />

      <motion.div
        className="flex-1 flex flex-col items-center justify-center p-4 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GameGrid
          cells={gameState.cells}
          onCellClick={handleCellClick}
          gameStatus={gameState.gameStatus}
        />

        <StatsPanel cells={gameState.cells} />

        {gameState.gameStatus === "playing" && (
          <motion.button
            onClick={gameState.balance > 0 ? handleClaim : undefined}
            className={`mt-8 w-full max-w-xs py-3 px-6 rounded-lg font-bold transition-all duration-200 ${
              gameState.balance > 0
                ? "game-button"
                : "bg-transparent text-gray-400 border-2 border-dashed border-gray-400 cursor-not-allowed"
            }`}
            whileHover={gameState.balance > 0 ? { scale: 1.05 } : {}}
            whileTap={gameState.balance > 0 ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {gameState.balance > 0 ? "Claim" : "Claim Rewards"}
          </motion.button>
        )}
      </motion.div>

      <BottomNavigation />

      <FlyingMoney
        key={flyingMoney.key}
        isVisible={flyingMoney.isVisible}
        amount={flyingMoney.amount}
        startPosition={flyingMoney.startPosition}
        endPosition={flyingMoney.endPosition}
        onComplete={handleFlyingMoneyComplete}
      />

      <GameModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        balance={gameState.balance}
        onNewGame={handleNewGame}
      />
    </div>
  );
}

export default App;
