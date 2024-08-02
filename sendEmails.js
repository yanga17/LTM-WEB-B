const nodemailer = require("nodemailer");
const user = "yangagovuza@gmail.com";
const password = "moneybags888_";
const path = require("path"); // Import the path module
//var ltmDbConn = require("../LTM-WEB-b/config/legendTimeDb.config");
const ltmDbConn = require('./config/legendTimeDb.config');

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "yangagovuza@gmail.com",
        pass: "empk curi cyit gfyi"
    },
})


const sendEmail = async (callid) => {
    try {
        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query('SELECT ID, name, Employee, Email_Address, Duration FROM legendtime.tbltime where ID = ?',[callid],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Query results:', results);
                    resolve(results);
                }
            );
        });

        if (results.length === 0) {
            throw new Error(`No ticket found with ID ${callid}`);
        }

        const { ID, name, Employee, Email_Address, Duration } = results[0];

        const mailOptions = {
            from: {
                name: "Legend Systems",
                address: "Windsor East",
            },
            to: Email_Address, 
            subject: "Your Ticket has been Completed!",
            text: `
Dear ${name}

We are pleased to inform you that your ticket has been successfully completed.

Ticket Details:

Ticket ID: ${ID}
Employee: ${Employee}
Duration: ${Duration}

Thank you for your patience and for choosing our services. If you have any further questions or need additional assistance, please feel free to contact us.

Best regards,

Legend Systems
010 013 2465
www.legendsystems.co.za
            `,
            // Uncomment and modify the html property if you need an HTML version of the email
            // html: `...`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email", error);
    }
};

module.exports = { sendEmail };

