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
        //dbConn.end();
    })
}

Checkin.InsertCheckin = (req, result) => {
    let count;
    dbConn.query('SELECT COUNT(*) as count FROM checkin WHERE checkin_time >= CURDATE() AND checkin_time < CURDATE() + INTERVAL 1 DAY AND emp_id = ?', req.body.emp_id, (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
        } else {
            count = res[0].count

            if (count > 0) {
                dbConn.query('UPDATE checkin SET checkin_time = ?, checkin_status = 0, ischecked = 0 WHERE checkin_time >= CURDATE() AND checkin_time < CURDATE() + INTERVAL 1 DAY AND emp_id = ?', [req.body.checkin_time, req.body.emp_id], (err, res) => {
                    if (!(err === null)) {
                        console.log('Error while inserting data1: ' + err);
                        result(null, err);
                        // dbConn.end();
                    } else {
                        dbConn.query('INSERT INTO checkin_log SET ?', req.body, (err, res) => {
                            if (!(err === null)) {
                                console.log('Error while inserting data2: ' + err);
                                result(null, err);
                                // dbConn.end();
                            } else {
                                result(null, res);
                                // dbConn.end();
                            }
                        })
                    }
                })

            } else {
                dbConn.query('INSERT INTO checkin SET ?', req.body, (err, res) => {
                    if (!(err === null)) {
                        console.log('Error while inserting data3: ' + err);
                        result(null, err);
                        // dbConn.end();
                    } else {
                        dbConn.query('INSERT INTO checkin_log SET ?', req.body, (err, res) => {
                            if (!(err === null)) {
                                console.log('Error while inserting data4: ' + err);
                                result(null, err);
                                // dbConn.end();
                            } else {
                                result(null, res)
                                // dbConn.end();
                            }
                        })
                    }
                })
            }
        }
    })
}

Checkin.UpdateCheckin = (req, result) => {
    dbConn.query('Update checkin set checkin_status = ?, ischecked = 1 where uid = ?', [req.params.checkin_status, req.params.uid], (err, res) => {
        if (err) {
            console.log('Error while updating the client: ' + err);
            result(null, err);
        } else {
            console.log("client updated successfully");
            result(null, res);
        }
       //dbConn.end();
    });
}

module.exports = Checkin;

