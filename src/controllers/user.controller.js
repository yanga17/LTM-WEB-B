const UserModel = require('../models/user.model');

exports.InsertAuditLog = (req, res) => {
    UserModel.InsertAuditLog(req, (err, employee) => {
      if (err) {
        employee.message = "Failed";
        res.send(err);
        process.exit(1);
      }
      employee.message = "Success";
      res.send(employee);
    })
  }