import React from 'react';

const BPMComparison = ({ bpm, color }) => {
  return (
    <section id="compare-bpm" className="scroll-margin-top-16 py-12 bg-[#f8f9fa] text-black text-center">
      <h2 className="text-3xl font-bold mb-4">Compare Your Heart Rate to CHF</h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        {/* Left: User's Heart (controlled by BPM slider) */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mx-4">
          <h3 className="text-xl font-semibold">Your Heart Rate</h3>
          <div className="bg-gray-200 w-full p-4 rounded-lg text-center mt-4">
            <p className="text-lg">BPM: {bpm}</p>
            <p className="text-lg">Blood Pressure: --/--</p> {/* Placeholder for blood pressure */}
          </div>
          <div
            className={`mt-4 w-full h-16 rounded-lg animate-pulse`}
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Right: CHF Heart */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mx-4 mt-4 md:mt-0">
          <h3 className="text-xl font-semibold">Heart with CHF</h3>
          <div className="bg-gray-200 w-full p-4 rounded-lg text-center mt-4">
            <p className="text-lg">BPM: 110</p>
            <p className="text-lg">Blood Pressure: 140/90</p>
          </div>
          <div className="mt-4 w-full h-16 rounded-lg bg-red-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default BPMComparison;
