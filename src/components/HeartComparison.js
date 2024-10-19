import React from 'react';

const HeartComparison = ({ selectedTab, handleTabClick }) => {
  return (
    <section
      id="hero-section"
      className="scroll-margin-top-16 flex flex-col items-center justify-center min-h-screen bg-[#1A1A2E] text-white"
    >
      <div className="flex items-center justify-between w-full max-w-4xl px-4">
        {/* Left: Healthy Heart */}
        <div className="flex flex-col items-center">
          <div className="relative rounded-full p-6 bg-white">
            <div
              className={`absolute inset-0 rounded-full ${selectedTab === 'healthy' ? 'bg-[#6C63FF]/60 animate-pulseBlurHealthy' : 'opacity-50'}`}
            />
            <img
              src="/healthy_heart.png"
              alt="Healthy Heart"
              className="relative z-10 max-w-full max-h-64 object-contain"
            />
          </div>
          <h2 className="pt-6 text-xl font-semibold text-white">Healthy Heart</h2>
          <ul className="mt-2 text-sm text-white max-w-xs list-disc list-inside">
            <li>120/80 mmHg average blood pressure</li>
            <li>80 beats per minute (BPM)</li>
            <li>Efficient blood circulation</li>
            <li>Normal oxygen delivery to organs</li>
          </ul>
        </div>

        {/* Middle: Tabs */}
        <div className="flex flex-col items-center justify-center mx-6">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabClick('healthy')}
              className={`px-4 py-2 border-b-2 ${selectedTab === 'healthy' ? 'border-[#6C63FF] text-[#6C63FF]' : 'border-gray-400 text-white'}`}
            >
              Healthy Heart
            </button>
            <button
              onClick={() => handleTabClick('chf')}
              className={`px-4 py-2 border-b-2 ${selectedTab === 'chf' ? 'border-[rgb(212,81,109)] text-[rgb(212,81,109)]' : 'border-gray-400 text-white'}`}
            >
              CHF Heart
            </button>
          </div>
        </div>

        {/* Right: CHF Heart */}
        <div className="flex flex-col items-center">
          <div className="relative rounded-full p-6 bg-white">
            <div
              className={`absolute inset-0 rounded-full ${selectedTab === 'chf' ? 'bg-[#c52044]/60 animate-pulseBlurCHF' : 'opacity-50'}`}
            />
            <img
              src="/CHF_heart.png"
              alt="CHF Heart"
              className="relative z-10 max-w-full max-h-64 object-contain"
            />
          </div>
          <h2 className="pt-6 text-xl font-semibold text-white">Heart with CHF</h2>
          <ul className="mt-2 text-sm text-white max-w-xs list-disc list-inside">
            <li>140/90 mmHg average blood pressure</li>
            <li>110 beats per minute (BPM)</li>
            <li>Weakened blood circulation</li>
            <li>Fluid buildup and oxygen inefficiency</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeartComparison;
