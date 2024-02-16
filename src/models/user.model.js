var dbConn = require("../../config/db.config");

var User = function (user) {
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

module.exports = User;

