import React, { useState } from 'react';
import { Slider } from '@mui/material'; // For the 3D heart drag bar
import { SketchPicker } from 'react-color'; // For color picker
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme to apply white tick marks and labels for the slider
const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: '#fff', // Makes tick labels white
        },
      },
    },
  },
});

function Hero() {
  const [selectedTab, setSelectedTab] = useState('healthy');
  const [bpm, setBpm] = useState(80); // Controlled BPM value
  const [color, setColor] = useState('#6C63FF'); // Default color for user's heart

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Scrolls smoothly to the hero section
  const handleScrollToHero = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle slider change for BPM
  const handleBpmChange = (event, newValue) => {
    setBpm(newValue);
  };

  // Handle color picker change
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Landing Page with video background */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-white">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/heart.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay on the video */}
          <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

          {/* Content on top of the video */}
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to the Heart Health Comparison</h1>
            <p className="text-xl mb-8">Scroll down to learn more about healthy and unhealthy hearts</p>
            <button
              onClick={handleScrollToHero}
              className="neon-button px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Hero Section */}
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

        {/* Personalized Insights Section */}
        <section className="scroll-margin-top-16 py-12 bg-[#1A1A2E] text-white text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Personalized Health Insights</h2>
            <p className="text-black">
              {bpm < 100 ? (
                "Your BPM is in a healthy range. Keep maintaining a balanced diet and regular exercise!"
              ) : (
                "Your BPM is elevated. It's advised to follow the mitigation steps below, reduce sodium intake, and monitor your physical activity."
              )}
            </p>
          </div>
        </section>

        {/* Mitigation Tips Section */}
        <section className="scroll-margin-top-16 py-12 bg-[#f8f9fa] text-black text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">How to Mitigate CHF Effects</h2>
            <ul className="text-left max-w-2xl mx-auto list-disc list-inside text-black">
              <li className="mb-2">Adopt a low-sodium diet to help reduce fluid buildup.</li>
              <li className="mb-2">Engage in regular physical activity like walking to strengthen the heart.</li>
              <li className="mb-2">Take medications as prescribed by your doctor to help manage symptoms.</li>
              <li className="mb-2">Monitor your weight daily to track fluid retention.</li>
              <li className="mb-2">Quit smoking and reduce alcohol intake to support heart health.</li>
            </ul>
          </div>
        </section>

        {/* Modify BPM Section with Slider and Color Picker */}
        <section className="scroll-margin-top-16 py-12 bg-[#1A1A2E] text-white text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Modify the BPM of Your Heart</h2>
            <p className="mb-6 text-black">Use the slider to control your heart's BPM:</p>
            <Slider
              value={bpm}
              min={50}
              max={150}
              step={1}
              onChange={handleBpmChange}
              aria-labelledby="bpm-slider"
              marks={[
                { value: 80, label: 'Healthy (80 BPM)' },
                { value: 110, label: 'CHF (110 BPM)' },
              ]}
              valueLabelDisplay="auto"
              sx={{
                color: color, // Use selected color for slider thumb and track
                '& .MuiSlider-thumb': { backgroundColor: color }, // Color the slider thumb
                '& .MuiSlider-track': { backgroundColor: color }, // Color the slider track
              }}
            />
            <p className="mt-4 text-black">Current BPM: {bpm}</p>
          </div>

          {/* Color Picker for Heart */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-black">Choose Your Heart Color</h3>
            <div className="flex justify-center">
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default Hero;
