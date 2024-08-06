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

exports.getActiveUserTickets = (req, res) => {
  TicketsModel.getActiveUserTickets(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.insertLoggedTicket = (req, res) => {
  TicketsModel.insertLoggedTicket(req, (err, employee) => {
    if (err) {
      employee.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Success";
    res.send(employee);
  })
}

//update logged ticket with endtime 4 tblcalls
exports.updateLoggedTicket = (req, res) => {
  TicketsModel.updateLoggedTicket(req, (err, user) => {
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

exports.endActiveTicketDetail = (req, res) => {
  TicketsModel.endActiveTicketDetail(req, (err, user) => {
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
exports.insertStartCallTicket = (req, res) => {
  TicketsModel.insertStartCallTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while inserting the ticket.' });
    } else {
      res.send({ message: 'Ticket inserted successfully.', data: result });
    }
  });
}

exports.endActiveTicketSolution = (req, res) => {
  TicketsModel.endActiveTicketSolution(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while updating the ActiveTickets Solution.' });
    } else {
      res.send({ message: 'Ticket Solution updated successfully.', data: result });
    }
  });
}

exports.insertDeletedTicket = (req, res) => {
  TicketsModel.insertDeletedTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while inserting the ticket.' });
    } else {
      res.send({ message: 'Ticket inserted successfully.', data: result });
    }
  });
}

exports.deleteCallReason = (req, res) => {
  TicketsModel.deleteCallReason(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while updating the ActiveTickets Solution.' });
    } else {
      res.send({ message: 'Ticket Solution updated successfully.', data: result });
    }
  });
}

exports.deleteLoggedTicket = (req, res) => {
  TicketsModel.deleteLoggedTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'An error occurred while removing the DeletedLogged Ticket.' });
    } else {
      res.send({ message: 'DeletedLogged Ticket has been removed successfully.', data: result });
    }
  });
}


exports.insertStartActiveTicket = (req, res) => {
  TicketsModel.insertStartActiveTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'An error occurred while starting an active ticket.' });
    } else {
      res.send({ message: 'Active Ticket inserted successfully.', data: result });
    }
  });
}

exports.transferTicket = (req, res) => {
  TicketsModel.transferTicket(req, (err, user) => {
    if (err) {
      user.message = "Transfering a Ticket to another Employee - Failed";
      res.send(err);
      process.exit(1);
    }
      user.message = "Transfering a Ticket to another Employee - Success";
      res.send(user);
  })
}

exports.updatetransferedTicket = (req, res) => {
  TicketsModel.updatetransferedTicket(req, (err, user) => {
    if (err) {
      user.message = "Updating Transfered Tickets EndTime in tblTime - Failed";
      res.send(err);
      process.exit(1);
    }
      user.message = "Updating Transfered Tickets EndTime in tblTime - Success";
      res.send(user);
  })
}
//insertFollowUp 
exports.insertFollowUpTicket = (req, res) => {
  TicketsModel.insertFollowUpTicket(req, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message || 'An error occurred while starting a followUp on a Customer.' });
      } else {
        res.send({ message: 'Follow-Up has been started successfully.', data: result });
      }
    });
}

//GET TICKETFOLLOWUP BASED ON ID: - getFollowUpTicket
exports.getFollowUpTicket = (req, res) => {
  TicketsModel.getFollowUpTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

//-----------------------------------------------------
exports.updateLoggedTicketCustomer = (req, res) => {
  TicketsModel.updateLoggedTicketCustomer(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Customer - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Customer - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketProblem = (req, res) => {
  TicketsModel.updateLoggedTicketProblem(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Problem/Error - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Problem/Error - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketNumber = (req, res) => {
  TicketsModel.updateLoggedTicketNumber(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Phone Number - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Phone Number - Success";
    res.send(user);
  })
}

//editLoggedTickets - Edit ClientName
exports.updateLoggedTicketName = (req, res) => {
  TicketsModel.updateLoggedTicketName(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket ClientName - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket ClientName - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketAnydesk = (req, res) => {
  TicketsModel.updateLoggedTicketAnydesk(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Anydesk - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Anydesk - Success";
    res.send(user);
  })
}
//---
exports.updateLoggedTicketType = (req, res) => {
  TicketsModel.updateLoggedTicketType(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Type - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Type - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketEmployee = (req, res) => {
  TicketsModel.updateLoggedTicketEmployee(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Employee - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Employee - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketPriority = (req, res) => {
  TicketsModel.updateLoggedTicketPriority(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Priority - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Priority - Success";
    res.send(user);
  })
}

exports.updateLoggedTicketComments = (req, res) => {
  TicketsModel.updateLoggedTicketComments(req, (err, user) => {
    if (err) {
      user.message = "Updating the Logged Ticket Comments - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Logged Ticket Comments - Success";
    res.send(user);
  })
}

//edit logged ticket - 
exports.editLoggedTicket = (req, res) => {
  TicketsModel.editLoggedTicket(req, (err, user) => {
    if (err) {
      user.message = "Updating the Entire Logged Ticket - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Entire Logged Ticket - Success";
    res.send(user);
  })
}

exports.editActiveTicket = (req, res) => {
  TicketsModel.editActiveTicket(req, (err, user) => {
    if (err) {
      user.message = "Updating the Entire Active Ticket - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Updating the Entire Active Ticket - Success";
    res.send(user);
  })
}


//TicketSummary Routes
exports.getTaskSummary = (req, res) => {
  TicketsModel.getTaskSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getErrorSummary = (req, res) => {
  TicketsModel.getErrorSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getTotalSummary = (req, res) => {
  TicketsModel.getTotalSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
} 

exports.getActiveTicketSummary = (req, res) => {
  TicketsModel.getActiveTicketSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getQueuedTicketSummary = (req, res) => {
  TicketsModel.getQueuedTicketSummary((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}