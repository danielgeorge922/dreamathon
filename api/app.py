from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variable to store pulse data (could be expanded for more complex data)
pulse_data = {'bpm': 0}

# Endpoint to receive pulse data from Arduino (POST request)
@app.route('/send_pulse_data', methods=['POST'])
def receive_pulse_data():
    global pulse_data
    # Expecting a JSON payload like: {"bpm": 72}
    pulse_data = request.json

    # You can add validation here to ensure the data is in the correct format
    if not pulse_data or 'bpm' not in pulse_data:
        return jsonify({"error": "Invalid data"}), 400

    print(f"Received pulse data: {pulse_data}")
    return jsonify({"message": "Pulse data received"}), 200

# Endpoint to get the current pulse data (GET request)
@app.route('/get_pulse_data', methods=['GET'])
def get_pulse_data():
    # Return the current pulse data in JSON format
    return jsonify(pulse_data), 200

# New endpoint to handle LED color updates from the frontend
@app.route('/set_color', methods=['POST'])
def set_color():
    color_data = request.json
    # Expecting a JSON payload like: {"red": 255, "green": 0, "blue": 0}
    if not color_data or not all(k in color_data for k in ('red', 'green', 'blue')):
        return jsonify({"error": "Invalid color data"}), 400

    print(f"Received color data: {color_data}")
    # Here, you would add the logic to change the LED color based on the received data.
    # For now, we're just printing the received values.
    
    return jsonify({"message": "Color updated"}), 200

# Main entry point to run the Flask app
if __name__ == '__main__':
    # Run the app on localhost, port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
