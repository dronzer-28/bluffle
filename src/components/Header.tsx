import { useState } from "react";
import HelpModal from "./HelpModal";

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="pt-4 pb-2 text-center w-full relative">
        <button
          onClick={() => setShowHelp(true)}
          className="absolute right-4 top-4 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm hover:bg-gray-100"
        >
          ?
        </button>
        <h1 className="text-3xl font-extrabold tracking-[0.2em]">BLUFFLE</h1>
        <p className="text-sm text-gray-500 mt-1">
          Same word. Not all clues tell the truth.
        </p>
      </header>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
}
