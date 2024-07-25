require('dotenv').config({ path: './configuration.env' });
//const twilio = require('twilio');
var ltmDbConn = require("../LTM-WEB-b/config/legendTimeDb.config");

const accountSID = process.env.TWILIO_ACC_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSID, authToken);

const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('0')) {
        return `+27${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
};

const sendSMS = async (clientName, phoneNumber) => {
    try {
        const newNumber = formatPhoneNumber(phoneNumber);

        let msgOptions = {
            from: process.env.TWILIO_NUMBER,
            to: newNumber,
            body: `Dear ${clientName}, your ticket has been logged and is currently pending. Our support team will be working on it shortly. Thank you for your patience.`
        }

        const message = await client.messages.create(msgOptions)
        console.log('SMS sent successfully', message);

    } catch (error) {
        console.error('Error sending SMS', error);
    }
}

module.exports = { sendSMS };