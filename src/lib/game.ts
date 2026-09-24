import type { BluffColor } from "./words";

export type LetterStatus = "green" | "yellow" | "red";

export interface LetterResult {
  char: string;
  status: LetterStatus;
}

export interface GuessResult {
  letters: LetterResult[];
  counts: { green: number; yellow: number; red: number };
}

export function evaluateTrue(guess: string, answer: string): LetterStatus[] {
  const statuses: LetterStatus[] = Array(5).fill("red");
  const answerChars = answer.split("");
  const used = Array(5).fill(false);

  for (let i = 0; i < 5; i++) {
    if (guess[i] === answerChars[i]) {
      statuses[i] = "green";
      used[i] = true;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (statuses[i] === "green") continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guess[i] === answerChars[j]) {
        statuses[i] = "yellow";
        used[j] = true;
        break;
      }
    }
  }

  return statuses;
}

export function evaluateGuess(
  guess: string,
  answer: string,
  bluffColor: BluffColor,
  guessIndex: number,
): GuessResult {
  const statuses = evaluateTrue(guess, answer);

  const nonBluffIndices = statuses
    .map((s, i) => (s !== bluffColor ? i : -1))
    .filter((i) => i !== -1);

  if (nonBluffIndices.length > 0) {
    const seed = guess.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + guessIndex;
    const bluffIndex = nonBluffIndices[seed % nonBluffIndices.length];
    statuses[bluffIndex] = bluffColor;
  }

  const counts = {
    green: statuses.filter((s) => s === "green").length,
    yellow: statuses.filter((s) => s === "yellow").length,
    red: statuses.filter((s) => s === "red").length,
  };

  return {
    letters: guess.split("").map((char, i) => ({ char, status: statuses[i] })),
    counts,
  };
}

export function isCorrectGuess(guess: string, answer: string): boolean {
  return guess === answer;
}
