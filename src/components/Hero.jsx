import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material'; // For the 3D heart drag bar
import { SketchPicker } from 'react-color'; // For color picker
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTint } from '@fortawesome/free-solid-svg-icons';
import MitigationCarousel from './MitigationCarousel'; // Assuming this exists

// Custom theme to apply white tick marks and labels for the slider
const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: 'black', // Makes tick labels black
        },
      },
    },
  },
});

function Hero() {
  const [selectedTab, setSelectedTab] = useState('healthy');
  const [bpm, setBpm] = useState(80); // Default BPM value
  const [color, setColor] = useState('#6C63FF'); // Default color for user's heart

  // Function to send BPM to the backend
  const sendBpmToBackend = async (bpmValue) => {
    try {
      const response = await fetch('http://localhost:5000/send_pulse_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bpm: bpmValue }), // Send BPM to backend
      });
      const data = await response.json();
      console.log('BPM sent to backend:', data);
    } catch (error) {
      console.error('Error sending BPM:', error);
    }
  };

  // Function to send color to the backend
  const sendColorToBackend = async (rgb) => {
    try {
      const response = await fetch('http://localhost:5000/set_color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ red: rgb.r, green: rgb.g, blue: rgb.b }), // Send RGB values to the backend
      });
      const data = await response.json();
      console.log('Color sent to backend:', data);
    } catch (error) {
      console.error('Error sending color:', error);
    }
  };

  // Handle slider change for BPM
  const handleBpmChange = (event, newValue) => {
    setBpm(newValue);
    sendBpmToBackend(newValue); // Send BPM to backend when slider changes
  };

  // Handle color picker change
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    sendColorToBackend(newColor.rgb); // Send color to backend when changed
  };

  // Fetch BPM data from backend on page load
  const fetchBpmFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_pulse_data');
      const data = await response.json();
      setBpm(data.bpm);
    } catch (error) {
      console.error('Error fetching BPM:', error);
    }
  };

  // Fetch color data from backend on page load
  const fetchColorFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_color');
      const data = await response.json();
      const rgbColor = `rgb(${data.red}, ${data.green}, ${data.blue})`;
      setColor(rgbColor); // Set color from backend
    } catch (error) {
      console.error('Error fetching color:', error);
    }
  };

  // Fetch BPM and color on component mount
  useEffect(() => {
    fetchBpmFromBackend();
    fetchColorFromBackend();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Landing Page with video background */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-white">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/heart.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to the Heart Health Comparison</h1>
            <p className="text-xl mb-8">Scroll down to learn more about healthy and unhealthy hearts</p>
            <button
              onClick={() => {
                document.getElementById('hero-section').scrollIntoView({ behavior: 'smooth' });
              }}
              className="neon-button px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Hero Section */}
        <section id="hero-section" className="scroll-margin-top-16 flex flex-col items-center justify-center min-h-screen bg-[#1A1A2E] text-white">
          <div className="flex items-center justify-between w-full max-w-4xl px-4">
            {/* Left: Healthy Heart */}
            <div className="flex flex-col items-center">
              <div className="relative rounded-full p-6 bg-white">
                <div className={`absolute inset-0 rounded-full ${selectedTab === 'healthy' ? 'bg-[#6C63FF]/60 animate-pulseBlurHealthy' : 'opacity-50'}`} />
                <img src="/healthy_heart.png" alt="Healthy Heart" className="relative z-10 max-w-full max-h-64 object-contain" />
              </div>
              <h2 className="pt-6 text-xl font-semibold text-white">Healthy Heart</h2>
              <ul className="mt-2 text-sm text-white max-w-xs list-disc list-inside">
                <li><FontAwesomeIcon icon={faTint} className="text-blue-500 mr-2" /> <strong className="text-blue-500">120/80 mmHg</strong> average blood pressure</li>
                <li><FontAwesomeIcon icon={faHeartbeat} className="text-red-500 mr-2" /> <strong className="text-green-500">80 BPM</strong> beats per minute</li>
                <li>Efficient blood circulation</li>
                <li>Normal oxygen delivery to organs</li>
              </ul>
            </div>

            {/* Middle: Tabs */}
            <div className="flex flex-col items-center justify-center mx-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedTab('healthy');
                    handleBpmChange(null, 80); // Set BPM to 80 when Healthy Heart is clicked
                  }}
                  className={`px-4 py-2 border-b-2 ${selectedTab === 'healthy' ? 'border-[#6C63FF] text-[#6C63FF]' : 'border-gray-400 text-white'}`}
                >
                  Healthy Heart
                </button>
                <button
                  onClick={() => {
                    setSelectedTab('chf');
                    handleBpmChange(null, 110); // Set BPM to 110 when CHF Heart is clicked
                  }}
                  className={`px-4 py-2 border-b-2 ${selectedTab === 'chf' ? 'border-[rgb(212,81,109)] text-[rgb(212,81,109)]' : 'border-gray-400 text-white'}`}
                >
                  CHF Heart
                </button>
              </div>
            </div>

            {/* Right: CHF Heart */}
            <div className="flex flex-col items-center">
              <div className="relative rounded-full p-6 bg-white">
                <div className={`absolute inset-0 rounded-full ${selectedTab === 'chf' ? 'bg-[#c52044]/60 animate-pulseBlurCHF' : 'opacity-50'}`} />
                <img src="/CHF_heart.png" alt="CHF Heart" className="relative z-10 max-w-full max-h-64 object-contain" />
              </div>
              <h2 className="pt-6 text-xl font-semibold text-white">Heart with CHF</h2>
              <ul className="mt-2 text-sm text-white max-w-xs list-disc list-inside">
                <li><FontAwesomeIcon icon={faTint} className="text-red-500 mr-2" /> <strong className="text-red-500">140/90 mmHg</strong> average blood pressure</li>
                <li><FontAwesomeIcon icon={faHeartbeat} className="text-red-500 mr-2" /> <strong className="text-red-500">110 BPM</strong> beats per minute</li>
                <li>Weakened blood circulation</li>
                <li>Fluid buildup and oxygen inefficiency</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Personalized Insights Section */}
        <section className="scroll-margin-top-16 py-12 bg-[#1A1A2E] text-white text-center">
          <div className="component-container personalized-health-container bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Personalized Health Insights</h2>
            <p className="text-black">
              {bpm < 100 ? (
                <>
                  <FontAwesomeIcon icon={faHeartbeat} className="text-green-500 mr-2" />
                  <strong className="text-green-500">{bpm} BPM</strong> is in a healthy range. Keep maintaining a balanced diet and regular exercise!
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHeartbeat} className="text-red-500 mr-2" />
                  <strong className="text-red-500">{bpm} BPM</strong> is elevated. It's advised to follow the mitigation steps below, reduce sodium intake, and monitor your physical activity.
                </>
              )}
            </p>
          </div>
        </section>

        {/* Mitigation Tips Section */}
        <MitigationCarousel />

        {/* Modify BPM Section */}
        <section className="scroll-margin-top-16 py-12 bg-[#1A1A2E] text-white text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Modify Your Heart</h2>
            <p className="mb-6 text-black">Use the slider to control your heart's BPM and pick a color for your heart:</p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* BPM Slider */}
              <div className="flex flex-col items-center md:w-1/2 w-full mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-black mb-2">Modify BPM</h3>
                <Slider
                  value={bpm}
                  min={50}
                  max={150}
                  step={1}
                  onChange={handleBpmChange}
                  aria-labelledby="bpm-slider"
                  marks={[
                    { value: 80, label: <span className="text-green-800 font-semibold">Healthy (80 BPM)</span> },
                    { value: 110, label: <span className="text-red-800 font-semibold">CHF (110 BPM)</span> },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{
                    color: color, // Use selected color for slider thumb and track
                    '& .MuiSlider-thumb': { backgroundColor: color }, // Color the slider thumb
                    '& .MuiSlider-track': { backgroundColor: color }, // Color the slider track
                    '& .MuiSlider-markLabel': { color: 'black' }, // Make tick labels black
                  }}
                />
                <p className="mt-2 text-black">Current BPM: {bpm}</p>
              </div>

              {/* Color Picker */}
              <div className="flex flex-col items-center md:w-1/2 w-full">
                <h3 className="text-lg font-semibold text-black mb-2">Choose Your Heart Color</h3>
                <SketchPicker color={color} onChange={handleColorChange} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default Hero;
