
import React, { useState, useEffect } from 'react';
import { RSVPData } from '../types';

interface RSVPFormProps {
  onSubmit: (data: RSVPData) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    attendance: 'yes',
    guests: 1,
    dietaryNotes: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit(formData);
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-white/90 backdrop-blur rounded-[40px] shadow-2xl border-2 border-[#d14d28] reveal-anim">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#d14d28]">
          <svg className="w-10 h-10 text-[#d14d28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2 font-serif italic">Sampai Jumpa, {formData.name}!</h3>
        <p className="text-gray-600">RSVP Anda telah tercatat dalam daftar tamu kehormatan.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[#1a4d6e] font-bold hover:underline tracking-widest text-xs"
        >
          PERBARUI RSVP
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-6 glass-card p-10 rounded-[40px] shadow-2xl transition-all duration-1000 ease-out transform border-t-8 border-[#d14d28] ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 font-serif italic">Konfirmasi Kehadiran</h2>
        <div className="h-0.5 w-16 bg-[#d14d28] mx-auto mt-2"></div>
      </div>
      
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#d14d28] transition-all outline-none bg-white/50"
          placeholder="Nama Anda..."
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(['yes', 'no', 'maybe'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFormData({ ...formData, attendance: status })}
            className={`py-4 px-2 rounded-2xl border-2 transition-all text-[10px] font-black uppercase tracking-tighter ${
              formData.attendance === status 
              ? 'bg-[#d14d28] border-[#d14d28] text-white shadow-lg' 
              : 'bg-white border-gray-50 text-gray-400 hover:border-orange-200'
            }`}
          >
            {status === 'yes' ? 'Hadir' : status === 'no' ? 'Maaf' : 'Ragu'}
          </button>
        ))}
      </div>

      {formData.attendance !== 'no' && (
        <div className="animate-reveal">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Jumlah Tamu</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#d14d28] outline-none bg-white/50"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Catatan Alergi / Pesan</label>
        <textarea
          rows={2}
          value={formData.dietaryNotes}
          onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#d14d28] transition-all outline-none resize-none bg-white/50"
          placeholder="Tulis pesan atau catatan diet..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-[#d14d28] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#b03a1a] transition-all transform hover:-translate-y-1"
      >
        KIRIM KONFIRMASI
      </button>
    </form>
  );
};

export default RSVPForm;
