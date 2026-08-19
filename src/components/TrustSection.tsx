import React, { useState } from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Play, Users, MapPin, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="trust-safety-section" className="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Media with Play Badge (matching screenshot layout) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-96 sm:h-[450px] overflow-hidden border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
                alt="Trekkers at Concordia K2 Base Camp"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/30" />

              {/* Play Video Trigger Overlay */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                title="Watch Karakoram Expedition Highlight Video"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 fill-slate-950 text-slate-950 ml-1" />
              </button>

              {/* Float Experience Badge */}
              <div className="absolute bottom-4 left-4 bg-slate-950/95 border border-sky-500 p-3 flex items-center gap-3">
                <Award className="w-8 h-8 text-sky-400 shrink-0" />
                <div>
                  <div className="text-base font-extrabold text-white">15+ Years</div>
                  <div className="text-[11px] text-slate-400">High-Altitude Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trust Details & 4 Stats (Matching screenshot circular stat boxes) */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Why Trek With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-4">
              Your Karakoram Companion
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Karakoram Expeditions is a premier government-registered adventure operator headquartered in Skardu and Islamabad. Administered by veteran high-altitude mountaineers and certified Balti guides, we provide comprehensive logistical mastery from satellite emergency communications to four-season base camp comfort.
            </p>

            {/* Value Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-slate-200">
              <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>100% Government Licensed:</strong> DTS License # ID-2891 & Alpine Club of Pakistan.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Emergency Rescue Protocols:</strong> Garmin InReach satellite tracking & Askari Heli dispatch.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Expedition Chef Cuisine:</strong> Fresh hygienic hot meals & clean filtered mountain water.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Zero Hidden Costs:</strong> Permits, domestic flights, porters, and meals included.</span>
              </div>
            </div>

            {/* 4 Stats Boxes (Matching reference screenshot metric counters) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800 border border-slate-700 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-sky-400">7,640+</div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold mt-1">Trekkers Guided</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold mt-1">Safety Record</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-sky-400">186+</div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold mt-1">Annual Groups</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold mt-1">Local Balti Crew</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full p-4 relative">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800"
            >
              CLOSE ✕
            </button>
            <div className="pt-6">
              <h3 className="text-lg font-bold text-white mb-2">Karakoram Expeditions: Journey to K2</h3>
              <p className="text-xs text-slate-300 mb-4">
                Watch our team navigate the Baltoro Glacier, set up high camps at Concordia, and assist trekkers across Gondogoro La pass.
              </p>
              <div className="aspect-video bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                  alt="Karakoram preview"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute flex flex-col items-center">
                  <Play className="w-12 h-12 text-sky-400 mb-2" />
                  <span className="text-xs text-white font-bold bg-slate-900/80 px-3 py-1">
                    Expedition Documentary Footage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
