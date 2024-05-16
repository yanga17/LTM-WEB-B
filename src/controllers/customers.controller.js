const CustomersModel = require('../models/customers.model');

exports.getClients = (req, res) => {
CustomersModel.getClients((err, user) => {
    if (err) {
        user.message = "Failed";
        res.send(err);
        process.exit(1);
    }
        user.message = "Success";
        res.send(user);
    })
}
