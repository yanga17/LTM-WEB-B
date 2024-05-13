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

exports.getEachActiveTicket = (req, res) => {
  TicketsModel.getEachActiveTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.insertSelectedTicket = (req, res) => {
  TicketsModel.insertSelectedTicket(req, (err, employee) => {
    if (err) {
      employee.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Success";
    res.send(employee);
  })
}

//update logged ticket with endtime x duration 4 tblcalls
exports.updateSelectedTicket = (req, res) => {
  TicketsModel.updateSelectedTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.endActiveTicket = (req, res) => {
  TicketsModel.endActiveTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getCustomers = (req, res) => {
  TicketsModel.getCustomers((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getErrors = (req, res) => {
  TicketsModel.getErrors((err, user) => {
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
  TicketsModel.getEmployees((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getTypes = (req, res) => {
  TicketsModel.getTypes((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


//insert 4 StartCall
exports.insertCallTicket = (req, res) => {
  TicketsModel.insertCallTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while inserting the ticket.' });
    } else {
      res.send({ message: 'Ticket inserted successfully.', data: result });
    }
  });
}