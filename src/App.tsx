import { useState, useEffect } from "react";
import GameGrid from "./components/GameGrid";
import Header from "./components/Header";
import GameModal from "./components/GameModal";
import BottomNavigation from "./components/BottomNavigation";
import StatsPanel from "./components/StatsPanel";
import { GameState, Cell, CellType } from "./types";
import { motion } from "framer-motion";
import { GAME_CONFIG } from "./config/gameConfig";

// Generate random game board
const generateGameBoard = (): Cell[] => {
  const types: CellType[] = [
    ...Array(GAME_CONFIG.CASH_CELLS).fill("cash"),
    ...Array(GAME_CONFIG.BOMB_CELLS).fill("bomb"),
    ...Array(GAME_CONFIG.MULTIPLIER_CELLS).fill("multiplier"),
    ...Array(GAME_CONFIG.EMPTY_CELLS).fill("empty"),
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
  }));

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "claim" as "win" | "lose" | "claim",
  });

  const handleCellClick = (cellId: number) => {
    if (gameState.gameStatus !== "playing") return;

    const cell = gameState.cells[cellId];
    if (cell.isRevealed) return;

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
      }

      return {
        ...prev,
        cells: newCells,
        balance: newBalance,
        multiplier: newMultiplier,
        gameStatus: newGameStatus,
        revealedCells: [...prev.revealedCells, cellId],
      };
    });
  };

  const handleClaim = () => {
    if (gameState.gameStatus === "playing") {
      setGameState((prev) => ({ ...prev, gameStatus: "won" }));
      setModalState({ isOpen: true, type: "claim" });
    }
  };

  const handleNewGame = () => {
    setGameState({
      cells: generateGameBoard(),
      balance: 0,
      multiplier: 1,
      gameStatus: "playing",
      revealedCells: [],
    });
    setModalState({ isOpen: false, type: "claim" });
  };

  // Auto-open modal when game ends
  useEffect(() => {
    if (gameState.gameStatus === "lost") {
      setModalState({ isOpen: true, type: "lose" });
    }
  }, [gameState.gameStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex flex-col">
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

        <StatsPanel />

        {gameState.gameStatus === "playing" && (
          <motion.button
            onClick={handleClaim}
            className="mt-8 game-button w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Claim
          </motion.button>
        )}
      </motion.div>

      <BottomNavigation />

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
