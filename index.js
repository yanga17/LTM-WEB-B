const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,           
    optionSuccessStatus: 200
}

//.ENV
require('dotenv').config({ path: './configuration.env' });

// Instantiate an Express application
const app = express();

app.use(cors(corsOptions));

// setup the server port
const port = process.env.SERVERPORT;

const UserRoutes = require('./src/routes/user.route')
app.use('/user', UserRoutes);

const CheckinRoutes = require('./src/routes/checkin.route')
app.use('/checkin', CheckinRoutes);

// listen to the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
});