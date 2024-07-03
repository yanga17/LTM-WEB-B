var ltmDbConn = require("../../config/legendTimeDb.config");

var Customers = function (user) {
    this.uid = user.uid;
    this.clientName = user.clientName;
    this.LEGNum = user.problem;
    this.phoneNumber = user.phoneNumber;
    this.cellphone = user.cellphone;
    this.enabled = user.enabled;
    this.nrPCs = user.nrPCs;
    this.expiryDate = user.expiryDate;
    this.totalBalance = user.totalBalance;
    this.current = user.current;
    this.thirtyDays = user.thirtyDays;
    this.sixtyDays = user.sixtyDays;
    this.ninetyDays = user.ninetyDays;
    this.support = user.support;
    this.supportPackage = user.supportPackage;
};

Customers.getCustomers = (result) => {
    ltmDbConn.query("Select uid, client_name, LEG_num, phone_number, cellphone, IF(enabled = 1, 'Yes', 'No') as Enabled, nrPCs as Licenses, expiry_date, total_balance, current, 30days as 'thirtyDays', 60days as 'sixtyDays', 90days as 'ninetyDays', support, support_package FROM legendtime.clients", (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Customers.getEachCustomer = (req, result) => {
    ltmDbConn.query("SELECT uid, client_name, LEG_num, phone_number, cellphone, IF(enabled = 1, 'Yes', 'No') as Enabled, nrPCs as Licenses, expiry_date, total_balance, current, 30days as 'thirtyDays', 60days as 'sixtyDays', 90days as 'ninetyDays', support, support_package FROM legendtime.clients WHERE uid = ?", [req.params.uid], (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Customers.getSearchedCustomer = (req, result) => {
    ltmDbConn.query("SELECT uid, client_name, LEG_num, phone_number, cellphone, IF(enabled = 1, 'Yes', 'No') AS Enabled, nrPCs AS Licenses, expiry_date, total_balance, current, 30days AS thirtyDays, 60days AS sixtyDays, 90days AS ninetyDays, support, support_package FROM legendtime.clients WHERE LOWER(client_name) LIKE LOWER(?)", [`%${req.params.clientname}%`], (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Customers.getTechnicians = (result) => {
    ltmDbConn.query('SELECT ID, Technician FROM tbltechnicians order by Technician', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }

    })
}

module.exports = Customers;