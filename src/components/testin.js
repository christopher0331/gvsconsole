// int sensorValue;
// int sensorLow = 1023; int sensorHigh = 0;
// const int ledPin = 13;


// void setup() {
//     // turn on LED to signal start of calibration phase pinMode(ledPin, OUTPUT);
//     digitalWrite(ledPin, HIGH);
//     //calibrate during initial 5 second period
//     while (millis() < 5000) {
//         sensorValue = analogRead(A0);
//         //record max sensor value
//         if (sensorValue > sensorHigh) {
//             sensorHigh = sensorValue;
//         }
//         //record min sensor value
//         if (sensorValue < sensorLow) {
//             sensorLow = sensorValue;
//         }
//     }
//     //calibration is over digitalWrite(ledPin, LOW);
// };

// void loop() {
//     //read input that LDR gives to analog pin 0
//     sensorValue = analogRead(A0);
//     //map sensor values to range of pitches
//     //adjust the values below to conform to the max and min //numbers you get from your sensor
//     //here 50 and 1000 refer to frequencies in hertz. Feel free to change them. int pitch = map (sensorValue, sensorLow, sensorHigh, 50, 1000);
//     //play the tone
//     // tone(pin, frequency, duration) tone creates a square wave that is on 50% of the time
//     tone(8, pitch, 20); //wait for a moment delay (10);
// }