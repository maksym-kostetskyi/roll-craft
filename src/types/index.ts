export type CellType = "cash" | "bomb" | "multiplier" | "empty";

export interface Cell {
  id: number;
  type: CellType;
  value: number;
  isRevealed: boolean;
  position: { row: number; col: number };
}

export interface GameState {
  cells: Cell[];
  balance: number;
  multiplier: number;
  gameStatus: "playing" | "won" | "lost";
  revealedCells: number[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "win" | "lose" | "claim";
  balance: number;
  cells: Cell[];
}
