// app/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Itinerary } from '@/lib/schema';
import LocationImage from '@/components/LocationImage';

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false, 
  loading: () => <div className="h-full bg-white/50 backdrop-blur-md animate-pulse rounded-2xl border border-white/30 flex items-center justify-center text-gray-800 font-semibold text-lg shadow-xl">Loading map...</div>
});

// Added interface for Weather Data
interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  
  // Added State for Weather
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null); 
    setWeather(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      const destination = formData.get('destination') as string;
      
      // Fetch Weather and AI Itinerary in parallel for speed!
      const [weatherRes, planRes] = await Promise.all([
        fetch(`/api/weather?city=${destination}`),
        fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: destination,
            budget: formData.get('budget'),
            days: formData.get('days'),
          }),
        })
      ]);

      const planData = await planRes.json();
      const weatherData = await weatherRes.json();
      
      if (planData.error) {
        alert("Failed to plan trip: " + planData.error);
      } else {
        setItinerary(planData.itinerary);
      }

      if (!weatherData.error) {
        setWeather(weatherData);
      }
      
    } catch (err) {
      alert("Network error. Check your terminal.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById('itinerary-content');
    if (!element) return;

    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin:       0.5,
      filename:     `${itinerary?.destination || 'trip'}-itinerary.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <main className="min-h-screen bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000')] bg-cover bg-center bg-fixed flex p-8 gap-8">
      
      <div className="w-1/2 flex flex-col gap-8 h-[calc(100vh-4rem)] overflow-y-auto pr-4 text-white custom-scrollbar">
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold drop-shadow-lg"
        >
          AI Travel Planner
        </motion.h1>
        
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8"
        >
          <input 
            name="destination" 
            placeholder="Where to? (e.g., Tokyo)" 
            required 
            className="p-4 bg-white/90 border-none rounded-xl text-black shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
          
          {/* NEW: Travel Dates (Start and End) */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold text-white/90 ml-1">Start Date</label>
              <input name="startDate" type="date" required className="p-3 bg-white/90 border-none rounded-xl text-black shadow-inner focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold text-white/90 ml-1">End Date</label>
              <input name="endDate" type="date" required className="p-3 bg-white/90 border-none rounded-xl text-black shadow-inner focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <select name="budget" className="p-4 bg-white/90 border-none rounded-xl flex-1 text-black shadow-inner focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
              <option value="budget">Budget-friendly</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
            <input 
              name="days" 
              type="number" 
              placeholder="Days" 
              min="1" 
              max="7" 
              required 
              className="p-4 bg-white/90 border-none rounded-xl w-32 text-black shadow-inner focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading} 
            className="relative w-full py-4 mt-2 rounded-xl text-white font-bold text-lg overflow-hidden group bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:bg-gradient-to-br transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Planning Trip...
              </span>
            ) : (
              'Generate Trip'
            )}
          </motion.button>
        </motion.form>

        {itinerary && (
          <div className="flex flex-col gap-8 mt-4">
            
            {/* UPDATED: Header area with Weather Widget */}
            <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold drop-shadow-md"
              >
                {itinerary.destination}
              </motion.h2>

              <div className="flex items-center gap-4">
                
                {/* 🌤️ NEW WEATHER WIDGET HERE */}
                {weather && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-xl shadow-lg"
                  >
                    <img 
                      src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
                      alt="weather icon" 
                      className="w-8 h-8"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight">{weather.temp}°C</span>
                      <span className="text-[10px] capitalize leading-tight text-white/80">{weather.description}</span>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPDF}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  📥 PDF
                </motion.button>
              </div>
            </div>
            
            <div id="itinerary-content" className="flex flex-col gap-6 p-6 rounded-2xl" style={{ backgroundColor: '#ffffff' }}>
              
              <div className="border-b pb-4 mb-2" style={{ borderColor: '#e2e8f0' }}>
                <h2 className="text-3xl font-extrabold" style={{ color: '#111827' }}>
                  Your Trip to {itinerary.destination}
                </h2>
              </div>

              {itinerary.days.map((day, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  key={day.dayNumber} 
                  className="rounded-2xl p-6 mb-4 border"
                  style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="font-bold h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-md" style={{ backgroundColor: '#2563eb', color: '#ffffff' }}>
                      {day.dayNumber}
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: '#1e293b' }}>{day.theme}</h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="p-5 rounded-xl shadow-sm border border-l-4" style={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9', borderLeftColor: '#2563eb' }}>
                        
                        <LocationImage 
                          query={`${act.placeName} ${itinerary.destination}`} 
                          alt={act.placeName} 
                        />

                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold" style={{ color: '#111827' }}>{act.placeName}</h4>
                          <span className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#dbeafe' }}>
                            {act.time}
                          </span>
                        </div>
                        <p className="leading-relaxed" style={{ color: '#475569' }}>{act.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-1/2 h-[calc(100vh-4rem)] sticky top-8 bg-white/20 backdrop-blur-lg border border-white/30 p-2 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="w-full h-full rounded-xl overflow-hidden">
           <Map itinerary={itinerary} />
        </div>
      </motion.div>
    </main>
  );
}