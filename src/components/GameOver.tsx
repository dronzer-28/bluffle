import type { LetterStatus } from "../lib/game";
import type { BluffColor } from "../lib/words";

interface TrueResult {
  char: string;
  status: LetterStatus;
}

interface GameOverProps {
  won: boolean;
  answer: string;
  bluffColor: BluffColor;
  guesses: string[];
  trueResults: TrueResult[][];
  bluffedResults: TrueResult[][];
  onClose: () => void;
}

const STATUS_COLORS: Record<LetterStatus, string> = {
  green: "bg-green-500 text-white",
  yellow: "bg-yellow-500 text-white",
  red: "bg-red-400 text-white",
};

const BLUFF_LABEL: Record<BluffColor, string> = {
  green: "Green",
  yellow: "Yellow",
  red: "Red",
};

const BLUFF_DOT: Record<BluffColor, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

export default function GameOver({
  won,
  answer,
  bluffColor,
  guesses,
  trueResults,
  bluffedResults,
  onClose,
}: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 text-lg"
        >
          x
        </button>
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-white">
          {won ? "You got it!" : "Better luck tomorrow"}
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          The word was{" "}
          <span className="font-bold tracking-wider">{answer}</span>
        </p>

        <div className="flex items-center justify-center gap-2 mb-5 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className={`w-4 h-4 rounded-full ${BLUFF_DOT[bluffColor]}`} />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {BLUFF_LABEL[bluffColor]} was bluffing
          </span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-3">
          True colors vs what you were shown
        </p>

        <div className="flex flex-col gap-2">
          {guesses.map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-3 justify-center">
              <div className="flex gap-0.5">
                {trueResults[rowIndex].map((letter, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold uppercase rounded ${STATUS_COLORS[letter.status]}`}
                  >
                    {letter.char}
                  </div>
                ))}
              </div>

              <span className="text-gray-300 dark:text-gray-600 text-xs">vs</span>

              <div className="flex gap-0.5">
                {bluffedResults[rowIndex].map((letter, i) => {
                  const wasBluffed = letter.status !== trueResults[rowIndex][i].status;
                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold uppercase rounded ${STATUS_COLORS[letter.status]} ${wasBluffed ? "ring-2 ring-gray-800 dark:ring-white" : ""}`}
                    >
                      {letter.char}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
          Ringed letters were bluffed
        </p>
      </div>
    </div>
  );
}
