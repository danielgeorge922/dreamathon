import React from 'react';

const tips = [
  "Adopt a low-sodium diet",
  "Engage in regular physical activity",
  "Take medications as prescribed",
  "Monitor your weight daily",
  "Quit smoking and reduce alcohol",
  "Stay hydrated and eat healthily",
  "Get regular check-ups",
  "Adopt a low-sodium diet",
  "Engage in regular physical activity",
  "Take medications as prescribed",
  "Monitor your weight daily",
  "Quit smoking and reduce alcohol",
  "Stay hydrated and eat healthily",
  "Get regular check-ups",
  "Adopt a low-sodium diet",
  "Engage in regular physical activity",
  "Take medications as prescribed",
  "Monitor your weight daily",
  "Quit smoking and reduce alcohol",
  "Stay hydrated and eat healthily",
  "Get regular check-ups",
];

function MitigationCarousel() {
  return (
    <section className="py-12 bg-[#1A1A2E] text-white text-center">
      <div className="component-container bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-black">How to Mitigate CHF Effects</h2>

        {/* Carousel wrapper */}
        <div className="relative w-full overflow-hidden h-40 flex items-center">
          {/* Carousel grid */}
          <div className="flex animate-scroll gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-gray-100 text-black py-4 px-6 rounded-lg shadow-lg text-lg font-semibold whitespace-nowrap transform hover:scale-105 transition duration-300"
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MitigationCarousel;