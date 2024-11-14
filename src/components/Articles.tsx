import React from 'react';
import { BookOpen } from 'lucide-react';

const articles = [
  {
    title: 'Mastering Wordle: Essential Strategies',
    excerpt: 'Learn the fundamental strategies that will improve your Wordle game...',
    image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'The Science Behind Word Games',
    excerpt: 'Discover how word games like Wordle enhance cognitive function...',
    image: 'https://images.unsplash.com/photo-1629652487043-c2d2caa4686c?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'Best Starting Words in Wordle',
    excerpt: 'Analysis of the most effective starting words based on letter frequency...',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1600',
  },
];

export const Articles: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-[#FFB5BA]" />
          <h2 className="text-2xl font-bold">Wordle Insights</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.excerpt}</p>
                <button className="mt-4 text-[#9CD4C8] font-semibold hover:text-[#7AB3A7]">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};