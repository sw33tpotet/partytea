
import React, { useState, useEffect } from 'react';
import { getPartySuggestions } from '../services/geminiService';
import { Suggestion, PartyTheme } from '../types';

interface AISuggestionsProps {
  theme: PartyTheme;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ theme }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchSuggestions = async () => {
    setLoading(true);
    const data = await getPartySuggestions(theme, query);
    setSuggestions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, [theme]);

  const getIcon = (category: string) => {
    switch (category) {
      case 'gift': return '🎁';
      case 'attire': return '👗';
      case 'message': return '💌';
      case 'activity': return '🎉';
      default: return '✨';
    }
  };

  return (
    <div className="mt-12 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-1 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            AI Party Assistant
          </h3>
          <p className="text-gray-500 mt-1">Bingung bawa apa? Tanya asisten AI kami!</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="text" 
            placeholder="Tanya saran khusus..." 
            className="flex-1 md:w-64 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchSuggestions()}
          />
          <button 
            onClick={fetchSuggestions}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Ask'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : (
          suggestions.map((s, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {getIcon(s.category)}
              </div>
              <h4 className="font-bold text-gray-800 mb-1 capitalize text-sm">{s.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
