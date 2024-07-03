const mysql = require('mysql');
require('dotenv').config({ path: './configuration.env' });

const ltmDbConn = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

ltmDbConn.connect(function (error) {
    if (error) {
        console.error('error connecting ltm conn:' + error.stack);
        process.exit(1);
    }
    else {
        console.log('DB connected successfully');
    }

});

module.exports = ltmDbConn;