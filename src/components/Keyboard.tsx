const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

interface KeyboardProps {
  onKey: (key: string) => void;
  usedLetters: Set<string>;
}

export default function Keyboard({ onKey, usedLetters }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 pb-4 w-full px-1">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-0.5 sm:gap-1 justify-center w-full">
          {row.map((key) => {
            const isWide = key === "Enter" || key === "Backspace";
            const used = usedLetters.has(key);
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`${
                  isWide ? "px-2 sm:px-3 text-[10px] sm:text-xs min-w-[40px] sm:min-w-[50px]" : "flex-1 max-w-[36px] sm:max-w-[40px]"
                } h-11 sm:h-12 rounded font-semibold text-sm uppercase flex items-center justify-center active:bg-gray-300 dark:active:bg-gray-600 select-none ${
                  used ? "bg-gray-400 dark:bg-gray-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {key === "Backspace" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
