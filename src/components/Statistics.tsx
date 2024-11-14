import React from 'react';
import { Statistics as StatsType } from '../types';
import { Trophy } from 'lucide-react';

interface StatisticsProps {
  stats: StatsType;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  const maxGuesses = Math.max(...stats.guessDistribution);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Played', value: stats.gamesPlayed },
          { label: 'Win Rate', value: `${Math.round(stats.winRate)}%` },
          { label: 'Current Streak', value: stats.currentStreak },
          { label: 'Max Streak', value: stats.maxStreak },
        ].map(({ label, value }) => (
          <div key={label} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#9CD4C8]">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFB5BA]" />
          <h3 className="font-semibold">Guess Distribution</h3>
        </div>
        <div className="space-y-2">
          {stats.guessDistribution.map((count, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 text-gray-600 font-medium">{i + 1}</div>
              <div className="flex-grow bg-gray-100 rounded">
                <div
                  className="bg-[#FFB5BA] rounded px-2 py-1 text-white text-sm font-medium"
                  style={{
                    width: `${(count / maxGuesses) * 100}%`,
                    minWidth: count > 0 ? '2rem' : '0',
                  }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};