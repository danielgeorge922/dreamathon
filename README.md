# Heart Health Educational Aid - CHF & BPM Visualizer 

## Overview![image-removebg-preview](https://github.com/user-attachments/assets/6c9b0c89-14fa-4c18-a20e-dc8405de71ec)


This project is an educational web-based application designed to teach users about the dangers of Congestive Heart Failure (CHF) and how it affects heart health. The app visualizes the heart's BPM (Beats Per Minute) with a comparison between a healthy heart and one with CHF. Users can modify the BPM using a slider and change the heart's color to visualize different heart conditions. Additionally, LED lights can reflect the BPM and color selections via a hardware integration using an Arduino.

## Features

- **Heart Health Comparison**: Visual comparison of a healthy heart and a heart affected by CHF, including visual indicators of blood pressure and BPM.
- **Customizable Heart BPM**: Users can control their heart's BPM using a slider and compare it to CHF symptoms.
- **LED Color Control**: Users can change the heart's color, which is then reflected in the LED hardware.
- **Personalized Insights**: The app provides tips based on the selected BPM and suggests ways to maintain heart health or mitigate CHF symptoms.
- **Responsive Design**: The app is fully responsive, with a smooth UI experience across devices.

## Technology Stack

- **Frontend**: 
  - React.js
  - Material UI for sliders
  - React-Color for color picker
  - FontAwesome icons for better UI representation
  - Chart.js for visual trends
- **Backend**: 
  - Flask (Python) to handle BPM and LED color data.
  - Arduino integration using ESP8266 for hardware control.
  
## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** and **npm** (for frontend development)
- **Python** and **Flask** (for backend development)
- **Arduino IDE** or **PlatformIO** (for the ESP8266 and LED integration)
- **PostgreSQL** (if a database is used)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/dreamathon.git
   cd dreamathon
   ```

2. **Install Backend Dependencies**:

   Navigate to the `api` folder and install the necessary Python packages:

   ```bash
   cd api
   pip install -r requirements.txt
   ```

3. **Install Frontend Dependencies**:

   Navigate to the root folder and install the required npm packages:

   ```bash
   npm install
   ```

4. **Install Arduino Dependencies**:

   Make sure you have the necessary libraries for your Arduino/ESP8266 setup (e.g., `ESP8266WiFi.h`). Upload the `pulse_sensor.ino` file to your ESP8266.

## Usage

1. **Start the Backend (Flask API)**:
   
   From the `api` folder, run the Flask app:

   ```bash
   flask run
   ```

2. **Start the Frontend (React App)**:
   
   From the root folder, start the React app:

   ```bash
   npm start
   ```

3. **Hardware Setup**:
   
   Ensure the Arduino is connected and running the `pulse_sensor.ino` code. The ESP8266 will communicate with the backend to update the BPM and LED color based on user input.

4. **View the Application**:

   Once both the frontend and backend are running, open the browser and visit:

   ```
   http://localhost:3000
   ```

   You can now interact with the heart BPM slider, color picker, and see real-time updates reflected on the website and LED hardware.

## API Endpoints

The backend Flask server exposes the following endpoints:

- `POST /send_pulse_data`: Accepts BPM data from the frontend or Arduino.
- `GET /get_pulse_data`: Returns the current BPM data.
- `POST /set_color`: Accepts RGB values to set the color of the LED.

## Arduino Integration

- **ESP8266 Module**: This project uses the ESP8266 to communicate with the backend server and update the BPM and LED color based on user input.
- **Pulse Sensor**: The `pulse_sensor.ino` script runs on the ESP8266 to collect BPM data and send it to the backend.

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License.

---
