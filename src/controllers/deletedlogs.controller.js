const DeletedLogsModel = require('../models/deletedlogs.model');

exports.getDeletedLogs = (req, res) => {
    DeletedLogsModel.getDeletedLogs((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}

exports.undoCallTicket = (req, res) => {
    DeletedLogsModel.undoCallTicket(req, (err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
    })
}

exports.deleteTicketLog = (req, res) => {
    DeletedLogsModel.deleteTicketLog(req, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message || 'An error occurred while deleting the Logged Ticket.' });
      } else {
        res.send({ message: 'Logged Ticked has been deleted successfully.', data: result });
      }
    });
  }

exports.getDeletedLogsTotal = (req, res) => {
  DeletedLogsModel.getDeletedLogsTotal((err, user) => {
      if (err) {
          user.message = "Failed";
          res.send(err);
          process.exit(1);
      }
          user.message = "Success";
          res.send(user);
      })
}