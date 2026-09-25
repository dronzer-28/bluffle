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
}: GameGridProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center py-4">
      {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
        const isSubmitted = rowIndex < guesses.length;
        const isCurrentRow = rowIndex === guesses.length;
        const word = guesses[rowIndex] ?? (isCurrentRow ? currentGuess : "");
        const result = results[rowIndex];

        return (
          <div key={rowIndex} className="flex items-center gap-2 sm:gap-4 px-2">

            <div className="flex gap-0.5 sm:gap-1">
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

            <div className="flex items-center gap-1.5 sm:gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-2 sm:px-3 py-1">
              <span className="flex items-center gap-0.5">
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-500">
                  {isSubmitted ? result.counts.green : "-"}
                </span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-500">
                  {isSubmitted ? result.counts.yellow : "-"}
                </span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-500">
                  {isSubmitted ? result.counts.red : "-"}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
