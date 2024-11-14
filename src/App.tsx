import React, { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { Statistics } from './components/Statistics';
import { GameGuide } from './components/GameGuide';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import { GameState, Statistics as StatsType, User } from './types';
import { getRandomWord, isValidWord } from './utils/wordList';
import { evaluateGuess } from './utils/gameLogic';

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [user, setUser] = useState<User>({ isAuthenticated: false });
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [shake, setShake] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>(() => ({
    currentGuess: '',
    guesses: [],
    history: [],
    gameStatus: 'playing',
    currentRowIndex: 0,
    solution: getRandomWord(),
  }));

  const [stats, setStats] = useState<StatsType>(() => ({
    gamesPlayed: 0,
    winRate: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: Array(6).fill(0),
  }));

  const [usedKeys, setUsedKeys] = useState<Record<string, string>>({});

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleKeyInput = (key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'Backspace') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key === 'Enter' && gameState.currentGuess.length === 5) {
      if (!isValidWord(gameState.currentGuess.toLowerCase())) {
        setShake(true);
        showToast('Word not in dictionary');
        setTimeout(() => setShake(false), 500);
        return;
      }

      const newGuesses = [...gameState.guesses, gameState.currentGuess];
      const evaluation = evaluateGuess(gameState.currentGuess, gameState.solution);
      
      const newUsedKeys = { ...usedKeys };
      [...gameState.currentGuess].forEach((letter, i) => {
        const currentStatus = newUsedKeys[letter];
        const newStatus = evaluation[i];
        if (!currentStatus || (currentStatus !== 'correct' && newStatus === 'correct')) {
          newUsedKeys[letter] = newStatus;
        }
      });
      setUsedKeys(newUsedKeys);

      const won = gameState.currentGuess === gameState.solution;
      const lost = newGuesses.length === 6 && !won;

      setGameState(prev => ({
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        currentRowIndex: prev.currentRowIndex + 1,
        gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
      }));

      if (won || lost) {
        setStats(prev => {
          const newStats = {
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            winRate: ((prev.gamesPlayed * prev.winRate + (won ? 100 : 0)) / (prev.gamesPlayed + 1)),
            currentStreak: won ? prev.currentStreak + 1 : 0,
            maxStreak: won ? Math.max(prev.currentStreak + 1, prev.maxStreak) : prev.maxStreak,
            guessDistribution: [...prev.guessDistribution],
          };
          if (won) {
            newStats.guessDistribution[newGuesses.length - 1]++;
          }
          return newStats;
        });
      }
    } else if (key.length === 1 && /^[A-Za-z]$/.test(key) && gameState.currentGuess.length < 5) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key.toUpperCase(),
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyInput(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, gameState.currentGuess, gameState.guesses]);

  const handleKeyPress = (key: string) => {
    handleKeyInput(key === '⌫' ? 'Backspace' : key);
  };

  const handleLogin = () => {
    setUser({ isAuthenticated: true, username: 'Demo User' });
  };

  const handleRegister = () => {
    // Implement registration logic
  };

  const handleLogout = () => {
    setUser({ isAuthenticated: false });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        currentLang={currentLang}
        user={user}
        onLanguageChange={setCurrentLang}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onStatsClick={() => setIsStatsOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-8">
          <Grid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            solution={gameState.solution}
            shake={shake}
          />
          <Keyboard onKeyPress={handleKeyPress} usedKeys={usedKeys} />
        </div>

        {gameState.gameStatus !== 'playing' && (
          <div className="mt-8 text-center">
            <div className={`inline-block px-6 py-3 rounded-lg ${
              gameState.gameStatus === 'won'
                ? 'bg-[#9CD4C8] text-white'
                : 'bg-[#FFB5BA] text-white'
            }`}>
              {gameState.gameStatus === 'won'
                ? 'Congratulations! You won! 🎉'
                : `Game Over! The word was "${gameState.solution}"`}
            </div>
            <button
              onClick={() => {
                setGameState({
                  currentGuess: '',
                  guesses: [],
                  history: [],
                  gameStatus: 'playing',
                  currentRowIndex: 0,
                  solution: getRandomWord(),
                });
                setUsedKeys({});
              }}
              className="mt-4 px-6 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              Play Again
            </button>
          </div>
        )}
      </main>

      <GameGuide />

      <Modal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        title="Statistics"
      >
        <Statistics stats={stats} />
      </Modal>

      <Toast show={toast.show} message={toast.message} />

      <Footer currentLang={currentLang} />
    </div>
  );
}

export default App;