import type { LetterStatus } from "./game";

export interface GameState{
    date: string;
    guesses: string[];
    userColors: (LetterStatus | null)[][];
    gameOver: boolean;
}

const STORAGE_KEY = "buffle_state"


export function saveGameState(state:GameState): void{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGameState(): GameState | null{
    const saved = localStorage.getItem(STORAGE_KEY);
    if(!saved) return null;
    const state = JSON.parse(saved);
    return state.date == new Date().toISOString().slice(0, 10) ? state : null;
}