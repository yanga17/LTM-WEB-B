const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendEmail } = require('./sendEmails')
const { sendSMS } = require('./sendSMS')
const { handler } = require("./src/controllers/index")


const corsOptions = {
    origin: '*',
    credentials: true,           
    optionSuccessStatus: 200
}

//.ENV
//require('dotenv').config({ path: './.configuration.env' });
require('dotenv').config({ path: '.configuration.env' });

//require('dotenv').config({ path: './configurationLtm.env' });

// Instantiate an Express application
const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// setup the server port
const port = process.env.SERVERPORT;

const UserRoutes = require('./src/routes/user.route')
app.use('/user', UserRoutes);

const TicketsRoutes = require('./src/routes/tickets.route')
app.use('/tickets', TicketsRoutes);

const CustomersRoutes = require('./src/routes/customers.route')
app.use('/customers', CustomersRoutes);

const DeletedLogsRoutes = require('./src/routes/deletedlogs.route')
app.use('/deletedlogs', DeletedLogsRoutes);

const FollowUpRoutes = require('./src/routes/followups.route')
app.use('/followups', FollowUpRoutes);

const DashboardRoutes = require('./src/routes/dashboard.route')
app.use('/dashboard', DashboardRoutes);

const ReportsRoutes = require('./src/routes/reports.route')
app.use('/reports', ReportsRoutes);

app.post('/send-email', async (req, res) => {
    const { callid } = req.body; // Get callid from the request body
    try {
        await sendEmail(callid);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
})

// app.post('/send-sms', async (req, res) => {
//     const { clientName, phonenumber } = req.body;

//     try {
//         await sendSMS(clientName, phonenumber);
//         res.status(200).send("SMS sent successfully!");
//     } catch (error) {
//         console.error('Error sending sms', error);
//         res.status(500).send('Error sending sms');
//     }
// })

/* TELEGRAM CODE TELEGRAM CODE 8 */
app.post("*", async (req, res) => {
    console.log(req.body);
    // res.send("HELLO POST");
    res.send(await handler(req, "POST"));
})

app.get("*", async (req, res) => {
    console.log(req.body);
    // res.send("HELLO GET");
    res.send(await handler(req, "GET"));
})

// console.log("ENVIRONMENTAL VARIABLES:", process.env); // This will log all environment variables to the console.
// console.log('TWILIO_SID:', process.env.TWILIO_SID);
// console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);



// listen to the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
});