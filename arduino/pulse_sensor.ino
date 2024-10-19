#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid = "Gustavo's iPhone";
const char* password = "12345678";

// Create a server on port 80
WiFiServer server(80);

// Pin definitions
int pulsePin = A0;         // Pin connected to the pulse sensor
int motorPin = D2;         // Pin connected to the motor

// Variables for pulse calculation
int bpm = 0;               // To store the calculated BPM
unsigned long lastPulseTime = 0;  // To track the last pulse time

// Variables to store user-specified BPM
int userBpm = 60;          // Default BPM (can be set by user)

// Setup function
void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);

  // Set up motor control pin
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW); // Start motor off

  // Connect to Wi-Fi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected to WiFi.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Start the server
  server.begin();
}

// Loop function
void loop() {
  // Check if there's a new client
  WiFiClient client = server.available();
  if (client) {
    // Wait for the client to send data
    String request = client.readStringUntil('\r');
    client.flush();
    
    // Handle GET request for BPM
    if (request.indexOf("/get_bpm") != -1) {
      handleGetBpm(client);
    }

    // Handle POST request to set BPM
    if (request.indexOf("/set_bpm") != -1) {
      handleSetBpm(client);
    }

    client.stop();  // Close connection with client
  }

  // Read and calculate BPM from pulse sensor
  calculateBpm();

  // Control the motor speed based on the set BPM
  controlMotor(userBpm);
}

// Function to calculate BPM from pulse sensor
void calculateBpm() {
  int pulseValue = analogRead(pulsePin);  // Read pulse sensor data
  if (pulseValue > 512) {  // Simulate pulse detection (adjust threshold as needed)
    unsigned long currentTime = millis();
    bpm = 60000 / (currentTime - lastPulseTime);  // Calculate BPM
    lastPulseTime = currentTime;
  }
}

// Function to handle the GET /get_bpm request
void handleGetBpm(WiFiClient &client) {
  // Return the current BPM as JSON
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: application/json");
  client.println();
  client.println("{\"bpm\": " + String(bpm) + "}");
}

// Function to handle the POST /set_bpm request
void handleSetBpm(WiFiClient &client) {
  // Read the body of the POST request (JSON)
  if (client.available()) {
    String body = client.readStringUntil('\r');
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (error) {
      client.println("HTTP/1.1 400 Bad Request");
      client.println("Content-Type: application/json");
      client.println();
      client.println("{\"error\": \"Invalid JSON format\"}");
      return;
    }

    // Extract BPM from JSON
    int newBpm = doc["bpm"];

    // Input validation: Ensure BPM is within the valid range (e.g., 40 - 120)
    if (newBpm < 40 || newBpm > 120) {
      client.println("HTTP/1.1 400 Bad Request");
      client.println("Content-Type: application/json");
      client.println();
      client.println("{\"error\": \"BPM out of range. Must be between 40 and 120.\"}");
      return;
    }

    // Update the user-specified BPM if valid
    userBpm = newBpm;
    
    // Respond with confirmation
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println();
    client.println("{\"status\": \"BPM updated\", \"bpm\": " + String(userBpm) + "}");
  }
}

// Function to control the motor based on the given BPM
void controlMotor(int bpm) {
  // Convert BPM to motor speed (PWM value)
  int motorSpeed = map(bpm, 40, 120, 50, 255);  // Map BPM to a PWM range (adjust range as needed)
  
  // Use PWM to adjust motor speed based on BPM
  analogWrite(motorPin, motorSpeed);

  // Simulate heartbeat timing based on BPM (1 beat per period defined by BPM)
  int beatDuration = 60000 / bpm;
  digitalWrite(motorPin, HIGH);  // Motor on (heartbeat)
  delay(beatDuration / 2);       // Half period on
  digitalWrite(motorPin, LOW);   // Motor off (rest between beats)
  delay(beatDuration / 2);       // Half period off
}
