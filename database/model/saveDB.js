// const Message = require('./message');

// // Function to save data to MongoDB
// const saveDataToMongoDB = (jsonData) => {
//     // Create a new message instance based on your schema
//     const newMessage = new Message({
//         type: jsonData.type,
//         channel: jsonData.channel,
//         repeat: jsonData.repeat,
//         mmsi: jsonData.mmsi,
//         navStatus: jsonData.navStatus,
//         rateOfTurn: jsonData.rateOfTurn,
//         speedOverGround: jsonData.speedOverGround,
//         accuracy: jsonData.accuracy,
//         lon: jsonData.lon,
//         lat: jsonData.lat,
//         courseOverGround: jsonData.courseOverGround,
//         heading: jsonData.heading,
//         utcSecond: jsonData.utcSecond,
//         specialManoeuver: jsonData.specialManoeuver,
//         raim: jsonData.raim,
//         radio: jsonData.radio,
//         sentences: jsonData.sentences.join('') // Convert array of sentences to a single string
//     });

//     // Save the new message to MongoDB
//     newMessage.save()
//         .then(savedMessage => {
//             console.log("OK:", savedMessage);
//         })
//         .catch(error => {
//             console.error("Error saving message:", error);
//         });
// };

// // Continuously process incoming data
// const processIncomingData = () => {
//     // Assuming you have some way to continuously receive and decode data
//     // For demonstration purposes, I'm simulating incoming data with a setInterval function
//     setInterval(() => {
//         const jsonData = /* Your logic to get updated JSON data */;
//         saveDataToMongoDB(jsonData);
//     }, 1000); // Adjust the interval as needed (e.g., 1000 milliseconds for once per second)
// };

// // Start processing incoming data
// processIncomingData();
