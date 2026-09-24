import type { GuessResult, LetterStatus } from "../lib/game";

const MAX_GUESSES = 9;
const WORD_LENGTH = 5;

interface GameGridProps {
  guesses: string[];
  currentGuess: string;
  results: GuessResult[];
  userColors: (LetterStatus | null)[][];
  onTileClick: (rowIndex: number, colIndex: number) => void;
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
}: GameGridProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center py-4">
      {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
        const isSubmitted = rowIndex < guesses.length;
        const isCurrentRow = rowIndex === guesses.length;
        const word = guesses[rowIndex] ?? (isCurrentRow ? currentGuess : "");
        const result = results[rowIndex];

        return (
          <div key={rowIndex} className="flex items-center gap-4">

            <div className="flex gap-1">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = word[colIndex] ?? "";
                const hasLetter = letter !== "";
                const userColor = isSubmitted ? userColors[rowIndex]?.[colIndex] : undefined;

                return (
                  <div
                    key={colIndex}
                    onClick={isSubmitted ? () => onTileClick(rowIndex, colIndex) : undefined}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold uppercase transition-colors ${
                      userColor
                        ? STATUS_COLORS[userColor]
                        : hasLetter
                          ? "bg-gray-200 text-gray-800"
                          : "bg-gray-100"
                    } ${isSubmitted ? "cursor-pointer" : ""}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-400">
                  {isSubmitted ? result.counts.green : "-"}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                <span className="text-sm font-medium text-gray-400">
                  {isSubmitted ? result.counts.yellow : "-"}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-gray-400">
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
