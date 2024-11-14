import dictionary from '../../data/dictionary.json';

export const WORDS = Object.keys(dictionary);

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].toUpperCase();
};

export const isValidWord = (word: string): boolean => {
  return word in dictionary;
};