// Game Configuration
export const GAME_CONFIG = {
  // Grid settings
  GRID_SIZE: 3,
  TOTAL_CELLS: 9,

  // Cell distribution
  CASH_CELLS: 5,
  BOMB_CELLS: 1,
  MULTIPLIER_CELLS: 1,
  EMPTY_CELLS: 2,

  // Cash value ranges (in order from lowest to highest)
  CASH_VALUES: [100, 500, 1000, 10000, 200000],

  // Animation timings (in milliseconds)
  CELL_FLIP_DURATION: 600,
  COUNTER_UP_DURATION: 500,
  PARTICLE_DURATION: 800,
  MODAL_DELAY: 300,

  // Multiplier settings
  DEFAULT_MULTIPLIER: 1,
  MULTIPLIER_FACTOR: 2,

  // Visual settings
  ENABLE_PARTICLES: true,
  ENABLE_HAPTICS: true,
  ENABLE_GLOW_EFFECTS: true,

  // Mobile settings
  MIN_SCREEN_WIDTH: 320,
  MOBILE_BREAKPOINT: 768,

  // Game balance
  DEFUSE_COST: 49,

  // Color schemes for different cash values
  CASH_COLORS: {
    100: {
      bg: "bg-gradient-to-br from-teal-500 to-teal-700",
      border: "border-teal-500",
    },
    500: {
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      border: "border-emerald-500",
    },
    1000: {
      bg: "bg-gradient-to-br from-green-500 to-green-700",
      border: "border-green-500",
    },
    10000: {
      bg: "bg-gradient-to-br from-green-400 to-green-600",
      border: "border-green-400",
    },
    200000: {
      bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      border: "border-yellow-400",
    },
  },
} as const;

// Helper functions
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
};

export const getCashColorScheme = (value: number) => {
  const { CASH_COLORS } = GAME_CONFIG;

  if (value >= 100000) return CASH_COLORS[200000];
  if (value >= 10000) return CASH_COLORS[10000];
  if (value >= 1000) return CASH_COLORS[1000];
  if (value >= 500) return CASH_COLORS[500];
  return CASH_COLORS[100];
};

// Difficulty levels (for future expansion)
export const DIFFICULTY_LEVELS = {
  EASY: {
    cashCells: 6,
    bombCells: 1,
    multiplierCells: 1,
    emptyCells: 1,
  },
  NORMAL: {
    cashCells: 5,
    bombCells: 1,
    multiplierCells: 1,
    emptyCells: 2,
  },
  HARD: {
    cashCells: 4,
    bombCells: 2,
    multiplierCells: 1,
    emptyCells: 2,
  },
} as const;
