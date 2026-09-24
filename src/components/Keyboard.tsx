const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

interface KeyboardProps {
  onKey: (key: string) => void;
}

export default function Keyboard({ onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 pb-4">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => {
            const isWide = key === "Enter" || key === "Backspace";
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`${
                  isWide ? "px-3 text-xs" : "w-9"
                } h-12 rounded bg-gray-200 font-semibold text-sm uppercase flex items-center justify-center active:bg-gray-300 select-none`}
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
