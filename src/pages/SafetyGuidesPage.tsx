import React from 'react';
import { useRouter } from 'next/router';

import {
  ShieldCheck,
  Award,
  Heart,
  Plane,
  Mountain,
  Users,
  Activity,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const SafetyGuidesPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => router.push('/')} className="hover:text-sky-600">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Expedition Safety & Mountain Guide Standards</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Uncompromised Wilderness Standards
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            High-Altitude Safety & Guide Protocols
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            At Karakoram Expeditions, trekker safety and porter welfare take absolute precedence. Learn about our medical equipment, satellite monitoring, and Askari helicopter dispatch protocols.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white  p-5">
            <div className="w-10 h-10 bg-sky-500 text-slate-950 flex items-center justify-center font-bold mb-3">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Askari Heli Evac Bond</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We arrange direct military helicopter evacuation guarantee bonds with Askari Aviation for immediate medevac dispatch in emergency situations across Baltoro and high passes.
            </p>
          </div>

          <div className="bg-white  p-5">
            <div className="w-10 h-10 bg-sky-500 text-slate-950 flex items-center justify-center font-bold mb-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Gamow Bag & O2 Onsite</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Portable hyperbaric Gamow chambers, medical oxygen cylinders, and daily morning/evening pulse oximeter blood oxygen logs to preemptively detect AMS, HAPE, or HACE.
            </p>
          </div>

          <div className="bg-white  p-5">
            <div className="w-10 h-10 bg-sky-500 text-slate-950 flex items-center justify-center font-bold mb-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Licensed Balti Leaders</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% certified local Balti guides trained by the Alpine Club of Pakistan (ACP) and International Federation of Mountain Guides Associations (IFMGA) instructors.
            </p>
          </div>

          <div className="bg-white  p-5">
            <div className="w-10 h-10 bg-sky-500 text-slate-950 flex items-center justify-center font-bold mb-3">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Porter Welfare (IPPG)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict adherence to the International Porter Protection Group: strictly capped 25kg loads, full cold-weather clothing, medical insurance, and equal shelter.
            </p>
          </div>
        </div>

        {/* In-Depth Sections */}
        <div className="space-y-8">
          {/* Acclimatization Schedule */}
          <div className="bg-white  p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Gradual Altitude Acclimatization Schedules
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              The golden rule of high altitude mountaineering is <em>"Climb high, sleep low"</em>. Our Karakoram itineraries are engineered with dedicated acclimatization rest days at Paiju (3,450m) and Urdukas (4,050m) before pushing onto the active ice moraine of Concordia (4,600m) and Gondogoro La pass (5,585m).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block mb-1">Daily Elevation Cap:</span>
                <span>Ascents above 3,000m are limited to an average sleeping gain of 300m - 500m per 24 hours.</span>
              </div>
              <div className="p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block mb-1">Hydration Standards:</span>
                <span>Mandatory 4 to 5 liters of boiled, filtered water consumed daily by every participant.</span>
              </div>
              <div className="p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block mb-1">Medical Monitoring:</span>
                <span>Daily Lake Louise AMS score evaluations conducted by expedition leader before evening meal.</span>
              </div>
            </div>
          </div>

          {/* Emergency Satellite Tracking */}
          <div className="bg-white  p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Garmin InReach Satellite Communications & 24/7 Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every Karakoram Expeditions group carries two redundant Garmin InReach satellite devices transmitting 10-minute GPS tracking breadcrumbs directly to our operational command centers in Skardu and Islamabad. Families at home can follow live trek progress on a private satellite tracking dashboard.
            </p>
          </div>

          {/* Porter Welfare Pledge */}
          <div className="bg-sky-50  p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 text-sky-600" />
              <span>Our Porter Welfare Pledge</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Fair Wages, Ethical Loads & Full Mountain Gear
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              The Balti porters are the true heroes of the Karakoram. Without their immense strength and cheerfulness, no expedition to K2 is possible. We provide our porter crews with high-quality warm jackets, windproof trousers, mountain boots, sunglasses, crampons, insulated sleeping mats, and comprehensive medical insurance.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-900">
              <span>✓ Maximum 25kg load limit</span>
              <span>✓ Guaranteed heated shelter tents</span>
              <span>✓ Full high-altitude rescue coverage</span>
              <span>✓ 20% higher base pay than industry averages</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Have questions regarding high altitude fitness?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Talk to our certified medical and expedition directors directly.</p>
          </div>
          <a
            href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20have%20questions%20about%20high%20altitude%20safety"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 flex items-center gap-2 transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consult Safety Director</span>
          </a>
        </div>
      </div>
    </div>
  );
};


export default SafetyGuidesPage;

