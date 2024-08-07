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

async function logTicket(data) {
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
        errorHandler(error, "logTicket", "database");
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

async function saveClient(message, customer, problem, phoneNumber, emailAddress, clientsAnydesk) {
    try {
        const {message_id, chat: { id: chat_id, first_name, last_name, username, type }, text } = message;

        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query(
                `INSERT INTO legendtime.telegramusers(chatid, message_id, name, surname, username, date, chat_text, type, customer, problem, phone_number, email_address, clients_anydesk) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
                [chat_id, message_id, first_name, last_name, username, text, type, customer, problem, phoneNumber, emailAddress, clientsAnydesk],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query SaveClient Results:', results);
                    resolve(results);
                }
            );
        });
        return results;
    } catch (error) {
        errorHandler(error, "saveClient", "database");
        return null;
    }
}

async function checkClient(chatID) {
    try {
        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query(
                `SELECT customer, name, phone_number, email_address, clients_anydesk FROM legendtime.telegramusers WHERE chatid = ?`,
                [chatID],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query CheckClient Results:', results);
                    resolve(results);
                }
            );
        });
        return results;
    } catch (error) {
        errorHandler(error, "checkClient", "database");
        return null;
    }
}

async function logExistingClientInfo() {
    try {
        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query(
                `SELECT chatid, name, surname, username, customer, problem, phone_number, email_address FROM legendtime.telegramusers`,
                [],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query LogExistingClientInfo Results:', results);
                    resolve(results);
                }
            );
        });
        return results;
    } catch (error) {
        errorHandler(error, "logExistingClientInfo", "database");
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

            if (command === "start") {
                const clientExists = await checkClient(chatId);

                if (clientExists && clientExists.length > 0) {
                    const { name, surname } = clientExists[0];
                    //const fullName = `${name} ${surname}`.trim();
                    // Client exists, restrict to "problem" and "email" commands
                    return sendMessage(chatId, `Welcome back to Legends Telegram Ticket Management ${name}. Please select the problem command and enter the error you're dealing with.\n\n` +
                        "Step 1: Select The Command\n" +
                        "Step 2: Enter the required information\n\n" +
                        "/problem - Enter the error you're having troubles with\n" +
                        "/complete - Once the error has been entered for the command, use this command to log the ticket to the Technicians"
                    );
                } else {
                    // New client, allow all commands
                    return sendMessage(chatId, "Hi! This is Legends Telegram Ticket Management Bot. This is an automated self-service program designed for clients to log tickets directly to our company technicians. Please select the available commands and provide the required information for each command before submitting your ticket.\n\n" +
                        "Step 1: Select The Command\n" +
                        "Step 2: Enter the required information\n\n" +
                        "/company - Enter the company name\n" +
                        "/problem - Enter the error you're having troubles with\n" +
                        "/name - Enter your name (the person who is experiencing this error)\n" +
                        "/number - Enter the contact number\n" +
                        "/email - Enter your email address\n" +
                        "/anydesk - Enter the anydesk number\n" +
                        "/complete - Once all the values have been entered for the previous commands, use this command to log the ticket to the Technicians. Ensure all fields are filled before completing."
                    );
                }
            }

            // Handle other commands based on the current state
            switch (command) {
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
                    const clientExists = await checkClient(chatId);

                    if (clientExists && clientExists.length > 0) {
                        // Client exists, log the ticket using existing client info and problem value
                        await logTicket({
                            Customer: clientExists[0].customer,
                            Problem: state[chatId].problem,
                            Name: clientExists[0].name,
                            Phone_Number: clientExists[0].phone_number,
                            Email_Address: clientExists[0].email_address,
                            Clients_Anydesk: clientExists[0].clients_anydesk
                        });
                        const callIdResults = await returnCallID(clientExists[0].name, clientExists[0].email_address);
                        const callId = callIdResults.length > 0 ? callIdResults[0].Call_ID : null;
                        delete state[chatId];

                        //return sendMessage(chatId, `Existing User Ticket has been logged successfully ${clientExists[0].name}. Your reference number is: ${callId}. A Technician will contact you shortly regarding the error.`);
                        return sendMessage(chatId, `Ticket has been logged successfully. Your reference number is: ${callId}. A Technician will contact you shortly regarding the error.`);
                    } else {
                        const userState = state[chatId];

                        if (userState.company && userState.problem && userState.name && userState.number && userState.email && userState.anydesk) {
                            await logTicket({
                                Customer: userState.company,
                                Problem: userState.problem,
                                Name: userState.name,
                                Phone_Number: userState.number,
                                Email_Address: userState.email,
                                Clients_Anydesk: userState.anydesk
                            });

                            // Save client info
                            await saveClient(messageObj, userState.company, userState.problem, userState.number, userState.email, userState.anydesk);

                            const callIdResults = await returnCallID(userState.name, userState.email);
                            const callId = callIdResults.length > 0 ? callIdResults[0].Call_ID : null;
                            delete state[chatId];

                            return sendMessage(chatId, `Ticket has been logged successfully. Your reference number is: ${callId}. A Technician will contact you shortly regarding the error.`);
                        } else {
                            return sendMessage(chatId, "Some information is missing. Please ensure all fields are filled before completing.");
                        }
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
                        //check if the client exists first:
                        const clientExists = await checkClient(chatId);
                        if (clientExists && clientExists.length > 0) {
                            responseMessage = `The existing clients Problem "${value}" has been saved successfully!`
                        }

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
