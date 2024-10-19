import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from './components/LandingPage';
import HeartComparison from './components/HeartComparison';
import BPMComparison from './components/BPMComparison';
import ModifyBPM from './components/ModifyBPM';

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: '#fff',
        },
      },
    },
  },
});

function HeroSection() {
  const [selectedTab, setSelectedTab] = useState('healthy');
  const [bpm, setBpm] = useState(80);
  const [color, setColor] = useState('#6C63FF');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleScrollToHero = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBpmChange = (event, newValue) => {
    setBpm(newValue);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <LandingPage handleScrollToHero={handleScrollToHero} />
        <HeartComparison selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <BPMComparison bpm={bpm} color={color} />
        <ModifyBPM bpm={bpm} color={color} handleBpmChange={handleBpmChange} handleColorChange={handleColorChange} />
      </div>
    </ThemeProvider>
  );
}

export default HeroSection;
