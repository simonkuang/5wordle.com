import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Wordle?",
    answer: "Wordle is a word guessing game where you have 6 attempts to guess a 5-letter word. After each guess, the color of the tiles changes to show how close your guess was to the word."
  },
  {
    question: "What do the colors mean?",
    answer: "Green means the letter is correct and in the right spot. Yellow means the letter is in the word but in the wrong spot. Gray means the letter is not in the word."
  },
  {
    question: "Can I use the same letter more than once?",
    answer: "Yes! The target word might have repeated letters. For example, the word might be 'HAPPY' which has two P's."
  },
  {
    question: "Are there any tips for beginners?",
    answer: "Start with words that have common letters like E, A, R, T, or S. This helps eliminate or confirm multiple letters at once. Also, use your previous guesses to inform your next guess."
  }
];

const ExampleTile: React.FC<{ letter: string; status: 'correct' | 'present' | 'absent' }> = ({ letter, status }) => (
  <div className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded border-2 
    ${status === 'correct' ? 'bg-[#9CD4C8] text-white border-[#9CD4C8]' : 
      status === 'present' ? 'bg-[#EEDFA5] text-white border-[#EEDFA5]' : 
      'bg-[#D4D4D4] text-white border-[#D4D4D4]'}`}>
    {letter}
  </div>
);

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600">{item.answer}</p>
      )}
    </div>
  );
};

export const GameGuide: React.FC = () => {
  return (
    <section id="game-guide" className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-6 h-6 text-[#9CD4C8]" />
          <h2 className="text-2xl font-bold">How to Play</h2>
        </div>

        <div className="space-y-8">
          <div className="prose prose-slate">
            <p className="text-gray-600">
              Guess the word in 6 tries. After each guess, the color of the tiles will
              change to show how close your guess was to the word.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ExampleTile letter="W" status="correct" />
              <div className="text-gray-600">
                <span className="font-medium text-gray-900">W</span> is in the word and in the correct spot
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ExampleTile letter="I" status="present" />
              <div className="text-gray-600">
                <span className="font-medium text-gray-900">I</span> is in the word but in the wrong spot
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ExampleTile letter="U" status="absent" />
              <div className="text-gray-600">
                <span className="font-medium text-gray-900">U</span> is not in the word
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} item={faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};