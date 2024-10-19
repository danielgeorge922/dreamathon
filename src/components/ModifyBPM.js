import React from 'react';
import { Slider } from '@mui/material';
import { SketchPicker } from 'react-color';

const ModifyBPM = ({ bpm, color, handleBpmChange, handleColorChange }) => {
  return (
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
            color: color,
            '& .MuiSlider-thumb': { backgroundColor: color },
            '& .MuiSlider-track': { backgroundColor: color },
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
  );
};

export default ModifyBPM;
