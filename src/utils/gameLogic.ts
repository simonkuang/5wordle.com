export const evaluateGuess = (guess: string, solution: string) => {
  const evaluation = new Array(5).fill('absent');
  const solutionChars = [...solution];
  const guessChars = [...guess];

  // Find correct positions
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      evaluation[i] = 'correct';
      solutionChars[i] = null;
    }
  });

  // Find present but wrong position
  guessChars.forEach((char, i) => {
    if (evaluation[i] !== 'correct') {
      const index = solutionChars.indexOf(char);
      if (index > -1) {
        evaluation[i] = 'present';
        solutionChars[index] = null;
      }
    }
  });

  return evaluation;
};