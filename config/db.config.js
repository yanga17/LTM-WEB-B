const mysql = require('mysql');
require('dotenv').config({ path: './configuration.env' });

console.log(`My stupid Host: ${process.env.HOSTDEV}`);
console.log(`My stupid Port: ${process.env.PORT}`);

const dbConn = mysql.createConnection({
    host: process.env.HOSTDEV,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// const dbConnLg = mysql.createConnection({
//     host: process.env.LTMHOSTDEV,
//     port: process.env.LTMPORT,
//     user: process.env.LTMUSER,
//     password: process.env.LTMPASSWORD,
//     database: process.env.LTMDATABASE
// });

dbConn.connect(function (error) {
    if (error) {
        console.error('error connecting DbConn:' + error.message);
        process.exit(1);
    }
    else {
        console.log('DB connected successfully');
    }

});

module.exports = dbConn;
