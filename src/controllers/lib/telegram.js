const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./helper");
const ltmDbConn = require('../../../config/legendTimeDb.config'); 


const MY_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

const state = {};

function sendMessage(chatId, messageText) {
    return axiosInstance 
        .get("sendMessage", {
            chat_id: chatId,
            text: messageText,
        })
        .catch((ex) => {
            errorHandler(ex, "sendMessage", "axios");
        });
}

async function saveInfo(data) {
    const { Customer, Problem, Name, Phone_Number, Email_Address, Clients_Anydesk } = data;
    try {
        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query(
                `INSERT INTO tblcalls(Customer, Problem, Name, Phone_Number, Time, Email_Address, Clients_Anydesk) VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
                [Customer, Problem, Name, Phone_Number, Email_Address, Clients_Anydesk],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query results:', results);
                    resolve(results);
                }
            );
        });
        return results;
    } catch (error) {
        errorHandler(error, "saveInfo", "database");
        return null;
    }
}


async function returnCallID(name, email) {
    try {
        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query(
                `SELECT Call_ID FROM legendtime.tblcalls WHERE name = ? AND Email_Address = ?`,
                [name, email],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query ReturnCallId Results:', results);
                    resolve(results);
                }
            );
        });
        return results;
    } catch (error) {
        errorHandler(error, "returnCallID", "database");
        return null;
    }
}

async function handleMessage(messageObj) {
    const messageText = messageObj.text || "";

    if (!messageText) {
        errorHandler("No message text", "handleMessage");
        return "";
    }

    try {
        const chatId = messageObj.chat.id;

        if (messageText.charAt(0) === "/") {
            const command = messageText.substr(1);
            state[chatId] = state[chatId] || {}; // Initialize the state if not already initialized
            state[chatId].command = command; // Update the state with the command

            switch (command) {
                case "start":
                    return sendMessage(chatId, "Hi! This is Legend Systems Telegram Bot, how may I help you today?");
                
                case "company":
                    state[chatId].command = "company";  // Set the state to expect company name
                    return sendMessage(chatId, "Please enter the full name of the company");
                
                case "problem":
                    state[chatId].command = "problem";  // Set the state to expect problem description
                    return sendMessage(chatId, "Please explain the error you have encountered. Keep it short but very descriptive");

                case "name":
                    state[chatId].command = "name";  // Set the state to expect user name
                    return sendMessage(chatId, "Please enter your name...");

                case "number":
                    state[chatId].command = "number";  // Set the state to expect phone number
                    return sendMessage(chatId, "Please enter your phone number so a Technician can contact you about the error...");

                case "email":
                    state[chatId].command = "email";  // Set the state to expect email address
                    return sendMessage(chatId, "Please enter your email address so a Technician can contact you about the error...");

                case "anydesk":
                    state[chatId].command = "anydesk";  // Set the state to expect Anydesk ID
                    return sendMessage(chatId, "Please enter your anydesk so a Technician can remotely connect to your computer...");

                case "complete":
                    const userState = state[chatId];

                    if (userState.company && userState.problem && userState.name && userState.number && userState.email && userState.anydesk) {
                        await saveInfo({
                            Customer: userState.company,
                            Problem: userState.problem,
                            Name: userState.name,
                            Phone_Number: userState.number,
                            Email_Address: userState.email,
                            Clients_Anydesk: userState.anydesk
                        });

                        const callIdResults = await returnCallID(userState.name, userState.email);
                        state[chatId] = {}; // Clear the state after saving
                        
                        //const callId = callIdResults?.Call_ID || "not found";
                        const callId = callIdResults && callIdResults.length > 0 ? callIdResults[0].Call_ID : "not found";
                        return sendMessage(chatId, `All the information has been retrieved and saved successfully. Thank you! Your Call ID is ${callId}.`);
                    } else {
                        return sendMessage(chatId, "Some information is missing. Please ensure all fields are filled before completing.");
                    }

                default:
                    return sendMessage(chatId, "Hey hi, I don't know that command");
            }
        } else {
            const userState = state[chatId] || {};
            const { command } = userState;

            if (command) {
                const value = messageText.trim();
                userState[command] = value;

                let responseMessage = "";

                switch (command) {
                    case "company":
                        responseMessage = `Company name "${value}" saved successfully!`;
                        break;
                    case "problem":
                        responseMessage = `Problem "${value}" saved successfully!`;
                        break;
                    case "name":
                        responseMessage = `Name "${value}" saved successfully!`;
                        break;
                    case "number":
                        responseMessage = `Phone number "${value}" saved successfully!`;
                        break;
                    case "email":
                        responseMessage = `Email "${value}" saved successfully!`;
                        break;
                    case "anydesk":
                        responseMessage = `Anydesk "${value}" saved successfully!`;
                        break;
                    default:
                        responseMessage = value;
                }

                // Update the state with the received value and clear the last command
                state[chatId] = { ...userState, command: null };

                return sendMessage(chatId, responseMessage);
            } else {
                return sendMessage(chatId, "Please enter a valid command first.");
            }
        }
    } catch (error) {
        errorHandler(error, "handleMessage");
    }
}

module.exports = { sendMessage, handleMessage };
