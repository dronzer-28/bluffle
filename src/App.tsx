import { useCallback, useEffect, useMemo, useState } from "react";
import GameGrid from "./components/GameGrid";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { evaluateGuess, evaluateTrue, isCorrectGuess, type GuessResult, type LetterStatus } from "./lib/game";
import { getDailyBluffColor, getDailyWord, isValidWord } from "./lib/words";
import { loadGameState, saveGameState } from "./lib/storage";

const WORD_LENGTH = 5;
const MAX_GUESSES = 9;

function App() {
  const answer = useMemo(() => getDailyWord(), []);
  const bluffColor = useMemo(() => getDailyBluffColor(), []);

  const [guesses, setGuesses] = useState<string[]>(() => {
    const saved = loadGameState();
    return saved ? saved.guesses : [];
  });
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(() => {
    const saved = loadGameState();
    return saved ? saved.gameOver : false;
  });
  const [userColors, setUserColors] = useState<(LetterStatus | null)[][]>(() => {
    const saved = loadGameState();
    return saved ? saved.userColors : [];
  });
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(() => {
    const saved = loadGameState();
    return saved ? saved.gameOver : false;
  });

  const results: GuessResult[] = useMemo(
    () => guesses.map((g, i) => evaluateGuess(g, answer, bluffColor, i)),
    [guesses, answer, bluffColor],
  );

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;

      if (key === "Enter") {
        if (currentGuess.length < WORD_LENGTH) return;
        if (!isValidWord(currentGuess)) {
          setToast("Not in word list");
          setTimeout(() => setToast(""), 1500);
          return;
        }
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");
        setUserColors((prev) => [...prev, Array(WORD_LENGTH).fill(null)]);

        if (isCorrectGuess(currentGuess, answer) || newGuesses.length >= MAX_GUESSES) {
          setGameOver(true);
          setShowModal(true);
        }
        return;
      }

      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [currentGuess, guesses, answer, gameOver],
  );

  const handleTileClick = useCallback((rowIndex: number, colIndex: number) => {
    setUserColors((prev) => {
      const next = prev.map((row) => [...row]);
      const current = next[rowIndex][colIndex];
      const cycle: (LetterStatus | null)[] = [null, "red", "yellow", "green"];
      const currentIdx = cycle.indexOf(current);
      next[rowIndex][colIndex] = cycle[(currentIdx + 1) % cycle.length];
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  useEffect(() => {                                                                
    saveGameState({                                                                
      date: new Date().toISOString().slice(0, 10),                                 
      guesses,                                                                     
      userColors,                                                                  
      gameOver,                                                                    
    });                                                                            
  }, [guesses, userColors, gameOver]);  
  const won = guesses.length > 0 && guesses[guesses.length - 1] === answer;

  const trueResults = useMemo(
    () =>
      guesses.map((g) => {
        const statuses = evaluateTrue(g, answer);
        return g.split("").map((char, i) => ({ char, status: statuses[i] }));
      }),
    [guesses, answer],
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center max-w-lg mx-auto relative">
      {toast && (
        <div className="absolute top-16 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
          {toast}
        </div>
      )}
      <Header />
      <GameGrid
        guesses={guesses}
        currentGuess={currentGuess}
        results={results}
        userColors={userColors}
        onTileClick={handleTileClick}
      />
      {showModal && (
        <GameOver
          won={won}
          answer={answer}
          bluffColor={bluffColor}
          guesses={guesses}
          trueResults={trueResults}
          bluffedResults={results.map((r) => r.letters)}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="mt-auto w-full px-2">
        <p className="text-center text-sm text-gray-400 mb-2">
          Guess {guesses.length} / {MAX_GUESSES}
        </p>
        <Keyboard onKey={handleKey} />
      </div>
    </div>
  );
}

export default App;
