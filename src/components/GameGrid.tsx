import { useEffect, useRef, useState } from "react";
import type { GuessResult, LetterStatus } from "../lib/game";

const MAX_GUESSES = 9;
const WORD_LENGTH = 5;

interface GameGridProps {
  guesses: string[];
  currentGuess: string;
  results: GuessResult[];
  userColors: (LetterStatus | null)[][];
  onTileClick: (rowIndex: number, colIndex: number) => void;
  gameOver: boolean;
  trueStatuses: LetterStatus[][];
  shakeCurrentRow: boolean;
}

const STATUS_COLORS: Record<LetterStatus, string> = {
  green: "bg-green-500 text-white border-green-500",
  yellow: "bg-yellow-500 text-white border-yellow-500",
  red: "bg-red-400 text-white border-red-400",
};

export default function GameGrid({
  guesses,
  currentGuess,
  results,
  userColors,
  onTileClick,
  gameOver,
  trueStatuses,
  shakeCurrentRow,
}: GameGridProps) {
  const [mountFlip, setMountFlip] = useState(false);
  const initialCount = useRef(guesses.length);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMountFlip(true));
    });
  }, []);

  return (
    <div className="flex flex-col gap-1.5 items-center py-4">
      {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
        const isSubmitted = rowIndex < guesses.length;
        const isCurrentRow = rowIndex === guesses.length;
        const word = guesses[rowIndex] ?? (isCurrentRow ? currentGuess : "");
        const result = results[rowIndex];
        const shouldFlip = isSubmitted && (rowIndex >= initialCount.current || mountFlip);
        const baseDelay = rowIndex < initialCount.current ? rowIndex * 200 : 0;

        return (
          <div key={rowIndex} className="flex items-center gap-2 sm:gap-4 px-2">

            <div className={`flex gap-0.5 sm:gap-1 ${isCurrentRow && shakeCurrentRow ? "shake" : ""}`}>
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = word[colIndex] ?? "";
                const hasLetter = letter !== "";
                const tileColor = gameOver && isSubmitted
                  ? trueStatuses[rowIndex]?.[colIndex]
                  : isSubmitted ? userColors[rowIndex]?.[colIndex] : undefined;

                return (
                  <div
                    key={colIndex}
                    onClick={isSubmitted && !gameOver ? () => onTileClick(rowIndex, colIndex) : undefined}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold uppercase transition-colors ${
                      tileColor
                        ? STATUS_COLORS[tileColor]
                        : hasLetter
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                    } ${isSubmitted && !gameOver ? "cursor-pointer" : ""}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-0.5 sm:gap-1">
              {(["green", "yellow", "red"] as const).map((color, i) => {
                const bg = color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-400";
                return (
                  <div key={color} className="w-10 h-10 sm:w-12 sm:h-12" style={{ perspective: "600px" }}>
                    <div
                      className="relative w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                        transition: `transform 0.5s ease-in-out ${baseDelay + i * 150}ms`,
                        transform: shouldFlip ? "rotateX(180deg)" : "none",
                      }}
                    >
                      <div
                        className={`absolute inset-0 rounded-lg ${bg}`}
                        style={{ backfaceVisibility: "hidden" }}
                      />
                      <div
                        className={`absolute inset-0 rounded-lg ${bg} text-white text-base sm:text-lg font-bold flex items-center justify-center`}
                        style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                      >
                        {isSubmitted ? result.counts[color] : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
