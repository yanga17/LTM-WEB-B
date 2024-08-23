const nodemailer = require("nodemailer");
// const user = "yangagovuza@gmail.com";
// const password = "moneybags888_";
// const path = require("path");
const events = require("events");
const cron = require("node-cron");
const ltmDbConn = require('./config/legendTimeDb.config');

const eventEmitter = new events.EventEmitter();

const transporter = nodemailer.createTransport({
    host: "remote.bitgroup.co.za", // Replace with your Exchange server address
    port: 465, // Common port for TLS; use 465 for SSL if required
    secure: true, // true for 465, false for other ports (use true if port is 465)
    auth: {
        user: "support@legendsystems.co.za", // Your Exchange email address
        pass: "", // Leave empty if no password is required; otherwise, provide the password
    },
    tls: {
        rejectUnauthorized: false, // Adjust based on your server's security requirements
    },
});

const sendManagerEmail = async () => {
    try {
        const Technicians = ['Markus', 'Kats', 'Robin', 'Milton', 'Thoriso', 'Yanga', 'Michael', 'Shaun'];

        const results = await new Promise((resolve, reject) => {
            ltmDbConn.query('SELECT DISTINCT Empl FROM legendtime.tblcalls WHERE Taken = 0',
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
            throw new Error('No Employees have been found');
        }

        // Extract the employee names from the results
        const employeeNames = results.map(result => result.Empl);

        // Find the technicians who are not in the list of employee names
        const missingEmployees = Technicians.filter(technician => !employeeNames.includes(technician));
        console.log("Missing Employees:", missingEmployees);

        const mailOptions = {
            from: {
                name: "Legend Systems",
                address: "support@legendsystems.co.za",
            },
            to: 'manny@legendsystems.co.za', 
            subject: "Employees Without Logged Tickets - Daily Report",
            text: missingEmployees.length > 0 ? `
Dear Manny,
    
This email provides a list of employees who haven't logged any tickets for today, ${new Date().toLocaleDateString()}.
    
Employees:
- ${missingEmployees.join('\n- ')} 
    
We recommend following up with these employees.
Best regards,
    
Legend Systems
010 013 2465
www.legendsystems.co.za
`
: `
Dear Manny,
    
All Employees have logged tickets for the current day, ${new Date().toLocaleDateString()}.
    
No further action is required.
Best regards,
    
Legend Systems
010 013 2465
www.legendsystems.co.za
`,
};

        await transporter.sendMail(mailOptions);
        console.log("Legend Manager Email sent successfully!");
    } catch (error) {
        console.error("Error sending Legend manager-email", error);
    }
};

// Event listener for sending the email
eventEmitter.on('sendDailyReportEmail', () => {
    console.log('Triggered sendDailyReportEmail event');
    sendManagerEmail();
});

// Schedule the event trigger to run every day at 4:00 PM
cron.schedule('0 16 * * *', () => {
    console.log('Scheduling the sendDailyReportEmail event at 4:00 PM');
    eventEmitter.emit('sendDailyReportEmail');
});

/* 
// * * * * * *
| | | | | |
| | | | | +---- Day of week (0 - 7) (Sunday is both 0 and 7)
| | | | +------ Month (1 - 12)
| | | +-------- Day of month (1 - 31)
| | +---------- Hour (0 - 23)
| +------------ Minute (0 - 59)
+-------------- Second (0 - 59, optional)
*/


module.exports = { sendManagerEmail };
