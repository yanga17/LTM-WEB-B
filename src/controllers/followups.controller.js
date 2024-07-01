const FollowUpsModel = require('../models/followups.model');

exports.getFollowUps = (req, res) => {
    FollowUpsModel.getFollowUps((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}

exports.startFollowUp = (req, res) => {
  FollowUpsModel.startFollowUp(req, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message || 'An error occurred while starting a followUp on a Customer.' });
      } else {
        res.send({ message: 'Follow-Up has been started successfully.', data: result });
      }
    });
}

exports.updateFollowUp = (req, res) => {
  FollowUpsModel.updateFollowUp(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while ending the ActiveFollowUp.' });
    } else {
      res.send({ message: 'FOllowUp Ticket ended successfully.', data: result });
    }
  });
}



exports.getCompletedFollowUps = (req, res) => {
    FollowUpsModel.getCompletedFollowUps((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}

exports.getActiveFollowUps = (req, res) => {
    FollowUpsModel.getActiveFollowUps((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
        })
}

exports.endActiveFollowUp = (req, res) => {
  FollowUpsModel.endActiveFollowUp(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while ending the ActiveFollowUp.' });
    } else {
      res.send({ message: 'FOllowUp Ticket ended successfully.', data: result });
    }
  });
}