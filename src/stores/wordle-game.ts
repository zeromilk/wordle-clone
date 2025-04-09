import { MAX_GAME_ROUND } from "@/constants/wordle-game";
import { create } from "zustand";
import { Updater } from "./interface";
import { applyUpdate } from "./utils";

type GameState = "idle" | "in_progress" | "fail" | "success";
type ValidState = "idle" | "invalid" | "valid";

export const GAME_STAT_KEY_LIST = [
  "gamePlayed",
  "gameWon",
  "maxStreak",
  "currentStreak",
] as const;
export type GameStatKey = (typeof GAME_STAT_KEY_LIST)[number];

type GameStats = {
  [K in GameStatKey]: number;
} & {
  guesses: number[];
};

export type SavedGame = {
  gameState: GameState;
  boardState: string[];
  currentRoundIndex: number;
  stats: GameStats;
  duration: number;
};

export type TWordleGame = {
  validState: ValidState;
} & SavedGame;

type GameStoreState = {
  setGameState: (gameState: GameState) => void;
  setValidState: (validState: ValidState) => void;
  setBoardState: (boardState: string[]) => void;
  setCurrentRoundIndex: (index: number) => void;
  setStats: (updater: Updater<GameStats>) => void;
  getShouldSaveState: () => SavedGame;
  setState: (updater: Updater<TWordleGame>) => void;
  reset: () => void;
} & TWordleGame;

const initialValue = {
  gameState: "idle",
  validState: "idle",
  boardState: new Array(MAX_GAME_ROUND).fill(""),
  currentRoundIndex: 0,
  stats: {
    gamePlayed: 0,
    gameWon: 0,
    maxStreak: 0,
    currentStreak: 0,
    guesses: new Array(MAX_GAME_ROUND).fill(0),
  },
  duration: 0,
} as TWordleGame;

export const useWordleGameState = create<GameStoreState>((set, get) => ({
  ...initialValue,
  setGameState: (gameState) => set({ gameState }),
  setValidState: (validState) => set({ validState }),
  setBoardState: (boardState: string[]) => set({ boardState }),
  setCurrentRoundIndex: (currentRoundIndex: number) =>
    set({ currentRoundIndex }),
  setStats: (updater: Updater<GameStats>) =>
    set((state) => ({
      stats: applyUpdate(state.stats, updater),
    })),
  setState: (updater: Updater<TWordleGame>) =>
    set((state) => ({
      ...applyUpdate(state, updater),
    })),
  getShouldSaveState: () => {
    const { gameState, boardState, currentRoundIndex, stats, duration } = get();

    return {
      gameState,
      boardState,
      currentRoundIndex,
      stats,
      duration,
    };
  },
  reset: () => {
    set((state) => ({
      ...state,
      ...initialValue,
    }));
  },
}));

interface GameTimeStampStore {
  timestamp: number;
  setTimestamp: (timestamp: number) => void;
}

export const useGameTimeStamp = create<GameTimeStampStore>((set) => ({
  timestamp: 0,
  setTimestamp: (timestamp: number) => set({ timestamp }),
}));
