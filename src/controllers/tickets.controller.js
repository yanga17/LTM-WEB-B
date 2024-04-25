const TicketsModel = require('../models/tickets.model');

exports.getTickets = (req, res) => {
  TicketsModel.getTickets((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getActiveTickets = (req, res) => {
  TicketsModel.getActiveTickets((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEachTicket = (req, res) => {
  TicketsModel.getEachTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.InsertTickets = (req, res) => {
  TicketsModel.InsertTickets(req, (err, employee) => {
    if (err) {
      employee.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Success";
    res.send(employee);
  })
}