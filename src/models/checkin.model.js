var dbConn = require("../../config/db.config");

var Checkin = function (user) {
    this.uid = user.uid;
    this.name = user.name;
    this.surname = user.surname;
    this.email_address = user.email_address;
    this.username = user.username;
    this.password = user.password;
    this.profile_photo = user.profile_photo;
    this.enabled = user.enabled;

    this.first_date = user.first_date;
    this.second_date = user.second_date;

    //Foreign Keys
    this.access_control_uid = user.access_control_uid;

    this.emp_id = user.emp_id;

};

Checkin.getCheckins = (result) => {
    dbConn.query('Select * from checkin where checkin_time >= CURDATE() AND checkin_time < CURDATE() + INTERVAL 1 DAY;', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        dbConn.end((error) => {
            if (error) {
                console.error('Error closing MySQL connection:', error);
                return;
            }
            console.log('MySQL connection closed.');
        });

    })
}

Checkin.InsertCheckin = (req, result) => {
    dbConn.query('INSERT INTO checkin SET ? ', req.body, (err, res) => {
        if (!(err === null)) {
            console.log('Error while inserting data: ' + err);
            result(null, err);
        } else {
            result(null, res)
        }
        dbConn.end()
    })
}

Checkin.UpdateCheckin = (req, result) => {
    dbConn.query('Update checkin set checkin_status = ? where uid = ?', [req.body.checkin_status, req.body.uid], (err, res) => {
        if (err) {
            console.log('Error while updating the client: ' + err);
            result(null, err);
        } else {
            console.log("client updated successfully");
            result(null, res);
        }
        dbConn.end((error) => {
            if (error) {
                console.error('Error closing MySQL connection:', error);
                return;
            }
            console.log('MySQL connection closed.');
        });
    });
}

module.exports = Checkin;

