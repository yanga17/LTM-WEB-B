const CustomersModel = require('../models/customers.model');

exports.getCustomers = (req, res) => {
    CustomersModel.getCustomers((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}

exports.getEachCustomer = (req, res) => {
    CustomersModel.getEachCustomer(req, (err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        } else {
            user.message = "Success";
            res.send(user);
        }
    });
}

exports.getSearchedCustomer = (req, res) => {
    CustomersModel.getSearchedCustomer(req, (err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        } else {
            user.message = "Success";
            res.send(user);
        }
    })
}

exports.getTechnicians = (req, res) => {
    CustomersModel.getTechnicians((err, user) => {
      if (err) {
        user.message = "Failed";
        res.send(err);
        process.exit(1);
      }
      user.message = "Success";
      res.send(user);
    })
  }

exports.getCustomersTotal = (req, res) => {
    CustomersModel.getCustomersTotal((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}