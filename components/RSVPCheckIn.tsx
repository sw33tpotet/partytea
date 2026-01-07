
import React, { useState } from 'react';
import { RSVPData } from '../types';

interface RSVPCheckInProps {
  rsvps: RSVPData[];
}

const RSVPCheckIn: React.FC<RSVPCheckInProps> = ({ rsvps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundGuest, setFoundGuest] = useState<RSVPData | null | 'not_found'>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const guest = rsvps.find(
      (r) => r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFoundGuest(guest || 'not_found');
  };

  return (
    <div className="glass-card p-10 rounded-[40px] border-2 border-[#1a4d6e]/10 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#1a4d6e] font-serif italic">Guest Check-in</h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Cari Namamu di Daftar Tamu</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama..."
          className="w-full pl-5 pr-32 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#1a4d6e] outline-none transition-all shadow-inner bg-white/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-[#1a4d6e] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#d14d28] transition-colors"
        >
          CARI
        </button>
      </form>

      {foundGuest === 'not_found' && (
        <div className="p-5 bg-orange-50 border border-orange-100 rounded-3xl reveal-anim flex items-center gap-4">
          <span className="text-2xl">🏮</span>
          <p className="text-xs text-orange-700 font-bold leading-relaxed">
            Nama <strong>"{searchTerm}"</strong> belum ada di daftar. Yuk, isi RSVP dulu!
          </p>
        </div>
      )}

      {foundGuest && foundGuest !== 'not_found' && (
        <div className="p-8 bg-[#fdfcfb] border-2 border-[#d14d28]/20 rounded-[40px] reveal-anim shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#d14d28]/5 rounded-bl-full"></div>
          <div className="flex items-center gap-5 mb-6 relative z-10">
            <div className="w-14 h-14 bg-[#d14d28] rounded-2xl flex items-center justify-center text-white shadow-xl text-2xl">
              ✓
            </div>
            <div>
              <h4 className="text-2xl font-black text-gray-900 font-serif italic leading-none">{foundGuest.name}</h4>
              <p className="text-[10px] font-black text-[#d14d28] uppercase tracking-[0.2em] mt-1">Tamu Kehormatan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest block mb-1">Status</span>
              <span className="font-bold text-[#1a4d6e] text-sm">
                {foundGuest.attendance === 'yes' ? 'Hadir' : foundGuest.attendance === 'maybe' ? 'Mungkin' : 'Batal'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest block mb-1">Tamu</span>
              <span className="font-bold text-[#1a4d6e] text-sm">{foundGuest.guests} Orang</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPCheckIn;
