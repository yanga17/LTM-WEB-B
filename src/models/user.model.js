var ltmDbConn = require('../../config/legendTimeDb.config');

var User = function (user) {
    this.emp_id = user.emp_id;
    this.emp_name = user.emp_name;
    this.action = user.action;
    this.date_time = user.date_time;
};

User.InsertAuditLog = (req, result) => {
    ltmDbConn.query('INSERT INTO audit_log SET ?', req.body, (err, res) => {
        if (!(err === null)) {
            console.log('Error while inserting data: ' + err);
            result(null, err);
            // dbConn.end();
        } else {
            result(null, res);
            // dbConn.end();
        }
    })
}

module.exports = User;

