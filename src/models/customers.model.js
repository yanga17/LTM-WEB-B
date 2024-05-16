var dbConn = require("../../config/db.config");

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

Customers.getClients = (result) => {
    dbConn.query("SELECT uid as Nr, client_name as Customer, LEG_num as 'Support Nr', phone_number as 'Number 1', cellphone as 'Number 2', IF(enabled = 1, 'Yes', 'No') as Enabled, nrPCs as Licenses, expiry_date as 'Expiry Date', total_balance as Balance, current as Current, 30days as '30 Days', 60days as '60 Days', 90days as '90 Days', support as support, support_package as support_package FROM legendtime.clients", (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Customers;