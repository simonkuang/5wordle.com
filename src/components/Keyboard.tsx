import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedKeys: Record<string, string>;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedKeys }) => {
  return (
    <div className="w-full max-w-xl mx-auto p-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => {
            const status = usedKeys[key] || '';
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`px-2 py-4 rounded font-bold text-sm transition-colors
                  ${key.length > 1 ? 'px-4' : 'min-w-[40px]'}
                  ${
                    status === 'correct'
                      ? 'bg-[#9CD4C8] text-white'
                      : status === 'present'
                      ? 'bg-[#EEDFA5] text-white'
                      : status === 'absent'
                      ? 'bg-[#D4D4D4] text-white'
                      : 'bg-[#F5F5F5] hover:bg-[#E8E8E8]'
                  }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};