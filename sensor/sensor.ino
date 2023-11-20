// Import Dependencies
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <HTTPClient.h>
#include <time.h>
#include <WiFi.h>

// Setup Wifi
const char* ssid = "wifi";
const char* password = "password";

void connectToWiFi() {
  Serial.print("Connecting to Wi-Fi");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

#define DHTPIN 2  // Connect the DHT11 sensor to pin 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Address 0x27, 16 columns, 2 rows

void setup() {
  Serial.begin(9600);
  lcd.begin();
  dht.begin();
  // Connect to Wi-Fi
  connectToWiFi();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperature);
  lcd.print(" C");

  lcd.setCursor(0, 1);
  lcd.print("Humidity: ");
  lcd.print(humidity);
  lcd.print("%");

  // Add code to send data to Flask API 
  sendSensorData(temperature, humidity, asctime(timeinfo));

  delay(5000);  // Delay for 5 seconds before reading again
}

void sendSensorData(float temperature, float humidity, const char* currentTime) {
  HTTPClient http;

  // Construct the POST data
  String postData = "temp=" + String(temperature) + "&humidity=" + String(humidity) + "&time=" + String(currentTime);

  http.begin("http://127.0.0.1:5000/weather");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  // Make the POST request
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP Request failed. Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
