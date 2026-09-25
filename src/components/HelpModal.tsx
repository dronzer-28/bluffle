interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 text-lg"
        >
          x
        </button>

        <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">How to Play</h2>

        <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            Guess the 5-letter word in <strong>9 tries</strong>.
          </p>

          <p>
            After each guess, you'll see a count of how many letters are{" "}
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> green
            </span>{" "}
            (right letter, right spot),{" "}
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> yellow
            </span>{" "}
            (right letter, wrong spot), and{" "}
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> red
            </span>{" "}
            (not in the word).
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="font-semibold mb-1">The Bluff</p>
            <p>
              One of the three colors is <strong>lying</strong>. Its count is always
              inflated by 1. The bluffing color stays the same for the entire day.
            </p>
          </div>

          <p>
            The letters won't be colored for you — only the counts are shown.
            Click on each letter tile to assign your own colors and work out the puzzle.
          </p>

          <p>
            Figure out which color is bluffing, and use that to find the word!
          </p>
        </div>
      </div>
    </div>
  );
}
