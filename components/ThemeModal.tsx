
import React, { useState, useEffect } from 'react';
import { PartyTheme, ThemeDetails } from '../types';
import { getThemeDescription } from '../services/geminiService';

interface ThemeModalProps {
  theme: PartyTheme;
  onClose: () => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ theme, onClose }) => {
  const [details, setDetails] = useState<ThemeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getThemeDescription(theme);
      setDetails(data);
      setLoading(false);
    };
    fetch();
  }, [theme]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-float">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-48 bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 relative flex items-end p-10">
          <div className="absolute inset-0 bg-black/10"></div>
          <h2 className="text-3xl font-black text-white relative z-10 font-serif italic">{theme}</h2>
        </div>

        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
            </div>
          ) : (
            details && (
              <>
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed italic">"{details.description}"</p>
                </section>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">The Vibe</h3>
                    <p className="text-gray-600">{details.vibe}</p>
                  </section>
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-pink-600 mb-2">Dress Code</h3>
                    <p className="text-gray-600">{details.dressCode}</p>
                  </section>
                </div>

                <div className="pt-4">
                   <img 
                    src={`https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800`} 
                    alt="Theme mood" 
                    className="w-full h-48 object-cover rounded-3xl"
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
