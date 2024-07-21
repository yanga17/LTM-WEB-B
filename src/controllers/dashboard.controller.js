const DashboardModel = require('../models/dashboard.model');

exports.getEmpTicketSummary = (req, res) => {
  DashboardModel.getEmpTicketSummary(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getCustomerSummary = (req, res) => {
  DashboardModel.getCustomerSummary(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.getCustomerCallData = (req, res) => {
  DashboardModel.getCustomerCallData(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.getEmployeeTasksData = (req, res) => {
  DashboardModel.getEmployeeTasksData(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getClientSummary = (req, res) => {
  DashboardModel.getClientSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getCommonErrors = (req, res) => {
  DashboardModel.getCommonErrors((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getCommonTasks = (req, res) => {
  DashboardModel.getCommonTasks((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getTicketSummary = (req, res) => {
  DashboardModel.getTicketSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEmployees = (req, res) => {
  DashboardModel.getEmployees((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEmployeeWeeklySummary = (req, res) => {
  DashboardModel.getEmployeeWeeklySummary(req, (err, user) => {
  if (err) {
    user.message = "Employee Weekly Summary Data - Failed";
    res.send(err);
    process.exit(1);
  }
  user.message = "Employee Weekly Summary Data - Success";
  res.send(user);
})
}