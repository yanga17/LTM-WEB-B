const ReportsModel = require('../models/reports.model');

exports.getClientHistoryReport = (req, res) => {
  ReportsModel.getClientHistoryReport(req, (err, user) => {
  if (err) {
    user.message = "Customer Client History Report Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Client History Report Data - Success";
  res.send(user);
})
}

exports.getCallTimesReport = (req, res) => {
  ReportsModel.getCallTimesReport(req, (err, user) => {
  if (err) {
    user.message = "Customer Call Times Report Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Customer Call Times Report Data - Success";
  res.send(user);
})
}

exports.getCustomerCallsReport = (req, res) => {
    ReportsModel.getCustomerCallsReport(req, (err, user) => {
    if (err) {
      user.message = "Customer Calls Report Data - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Customer Calls Report Data - Success";
    res.send(user);
  })
}

exports.getCustomerErrorReport = (req, res) => {
  ReportsModel.getCustomerErrorReport(req, (err, user) => {
  if (err) {
    user.message = "Customer Errors Report Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Customer Errors Report Data - Success";
  res.send(user);
})
}

exports.getEmployeeAvgReport = (req, res) => {
  ReportsModel.getEmployeeAvgReport(req, (err, user) => {
  if (err) {
    user.message = "Employee Average Time Report Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Employee Average Time Report Data - Success";
  res.send(user);
})
}


exports.getEmployeeTaskReport = (req, res) => {
  ReportsModel.getEmployeeTaskReport(req, (err, user) => {
  if (err) {
    user.message = "Employee Common Tasks Report - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Employee Common Tasks Report - Success";
  res.send(user);
})
}

exports.getEmployeeSummaryReport = (req, res) => {
  ReportsModel.getEmployeeSummaryReport(req, (err, user) => {
  if (err) {
    user.message = "Employee Summary Report Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Employee Summary Report Data - Success";
  res.send(user);
})
}