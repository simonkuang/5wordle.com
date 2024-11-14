import React from 'react';
import { User, Language } from '../types';
import { translations } from '../i18n/translations';
import { HelpCircle, Globe, User as UserIcon, LogIn, UserPlus, BarChart } from 'lucide-react';

interface NavigationProps {
  currentLang: string;
  user: User;
  onLanguageChange: (lang: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onStatsClick: () => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const Navigation: React.FC<NavigationProps> = ({
  currentLang,
  user,
  onLanguageChange,
  onLogin,
  onRegister,
  onLogout,
  onStatsClick
}) => {
  const t = translations[currentLang as keyof typeof translations];

  const scrollToGameGuide = () => {
    const element = document.getElementById('game-guide');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollClickEvent = () => {
    console.log("This is the event msg.");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-[#9CD4C8]">Wordle</h1>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">{t.nav.home}</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">{t.nav.leaderboard}</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">{t.nav.practice}</a>
              <button 
                onClick={onStatsClick}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
              >
                <BarChart className="w-4 h-4" />
                <span>Stats</span>
              </button>
              <a href="#" className="text-gray-600 hover:text-gray-900">{t.nav.about}</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Globe className="w-5 h-5 text-gray-600" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div> */}

            <button onClick={scrollToGameGuide} className="p-2 hover:bg-gray-100 rounded-lg">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>

            {/* {user.isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{user.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block">
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {t.nav.logout}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onLogin}
                  className="flex items-center space-x-1 px-4 py-2 text-[#9CD4C8] hover:bg-[#9CD4C8] hover:text-white rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </button>
                <button
                  onClick={onRegister}
                  className="flex items-center space-x-1 px-4 py-2 bg-[#9CD4C8] text-white hover:bg-[#7AB3A7] rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.nav.register}</span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};