import React from 'react';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  shake: boolean;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, solution, shake }) => {
  const empties = Array(6 - (guesses.length + 1)).fill('');
  const currentGuessArray = [...currentGuess.padEnd(5)];

  return (
    <div className="grid grid-rows-6 gap-2 w-full max-w-sm mx-auto p-2">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {[...guess].map((letter, j) => {
            const isCorrect = solution[j] === letter;
            const isPresent = !isCorrect && solution.includes(letter);
            return (
              <div
                key={j}
                className={`w-full aspect-square flex items-center justify-center text-2xl font-bold rounded
                  ${
                    isCorrect
                      ? 'bg-[#9CD4C8] text-white'
                      : isPresent
                      ? 'bg-[#EEDFA5] text-white'
                      : 'bg-[#D4D4D4] text-white'
                  } transition-colors`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
      {guesses.length < 6 && (
        <div className={`grid grid-cols-5 gap-2 ${shake ? 'animate-shake' : ''}`}>
          {currentGuessArray.map((letter, i) => (
            <div
              key={i}
              className="w-full aspect-square flex items-center justify-center text-2xl font-bold rounded border-2 border-[#FFB5BA]"
            >
              {letter}
            </div>
          ))}
        </div>
      )}
      {empties.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, j) => (
            <div
              key={j}
              className="w-full aspect-square flex items-center justify-center text-2xl font-bold rounded border-2 border-[#E8E8E8]"
            />
          ))}
        </div>
      ))}
    </div>
  );
};