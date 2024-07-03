const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,           
    optionSuccessStatus: 200
}

//.ENV
require('dotenv').config({ path: './configuration.env' });

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

const CheckinRoutes = require('./src/routes/checkin.route')
app.use('/checkin', CheckinRoutes);

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
// listen to the port
// app.listen(port, () => {
//     console.log(`Express is running at port ${port}`);
// });
app.listen(port || 4200, () => {
    console.log(`Express is running at port ${port || 4200}`);
  });