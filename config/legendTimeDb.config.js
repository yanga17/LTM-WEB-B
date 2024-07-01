const mysql = require('mysql');
require('dotenv').config({ path: './configuration.env' });

const ltmDbConn = mysql.createConnection({
    host: process.env.LTMHOSTDEV,
    port: process.env.LTMPORT,
    user: process.env.LTMUSER,
    password: process.env.LTMPASSWORD,
    database: process.env.LTMDATABASE
});

ltmDbConn.connect(function (error) {
    if (error) {
        console.error('error connecting:' + error.stack);
        process.exit(1);
    }
    else {
        console.log('DB connected successfully');
    }

});

module.exports = ltmDbConn;