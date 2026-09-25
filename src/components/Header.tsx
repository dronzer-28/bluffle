import { useState } from "react";
import HelpModal from "./HelpModal";

interface HeaderProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Header({ dark, onToggleDark }: HeaderProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="pt-4 pb-2 text-center w-full relative">
        <div className="absolute left-4 top-4 flex gap-2">
          <button
            onClick={onToggleDark}
            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            {dark ? "☀" : "☾"}
          </button>
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="absolute right-4 top-4 w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          ?
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-gray-900 dark:text-white">BLUFFLE</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Same word. Not all clues tell the truth.
        </p>
      </header>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
}
