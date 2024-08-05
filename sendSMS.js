// require('dotenv').config({ path: '.configuration.env' });
// const ltmDbConn = require('./config/legendTimeDb.config');
// const twilio = require('twilio');

// const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

// if (!client) {
//     throw new Error('Twilio account SID and auth token are required');
// }

// const formatPhoneNumber = (phoneNumber) => {
//     if (phoneNumber.startsWith('0')) {
//         return `+27${phoneNumber.slice(1)}`;
//     }
//     return phoneNumber;
// };

// const sendSMS = async (clientName, phoneNumber) => {
//     try {
//         const newNumber = formatPhoneNumber(phoneNumber);

//         let msgOptions = {
//             from: '+13343360977',
//             to: newNumber,
//             body: `Dear ${clientName}, your ticket has been logged and is currently pending. Our support team will be working on it shortly. Thank you for your patience.`
//         }

//         const message = await client.messages.create(msgOptions)
//         console.log('SMS sent successfully', message);

//     } catch (error) {
//         console.error('Error sending SMS', error);
//     }
// }

// module.exports = { sendSMS };