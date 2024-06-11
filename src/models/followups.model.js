var ltmDbConn = require("../../config/legendTimeDb.config");

var FollowUps = function (user) {
    this.idx = user.idx,
    this.ID = user.id,
    this.Employee = user.employee,
    this.Customer = user.customer,
    this.Activity = user.activity,
    this.Phone_Number = user.phoneNumber,
    this.StartTime = user.startTime,
    this.EndTime = user.endTime,
    this.Duration = user.duration,
    this.Type = user.type,
    this.Solution = user.solution,
    this.Support_No = user.supportNumber,
    this.Comments = user.comments,
    this.FollowUp = user.followUp,
    this.Completed = user.completed,
    this.Name = user.name,
    this.Clients_Anydesk = user.clientsAnydesk
    this.NumberOfDays = user.numberofdays
};

FollowUps.getFollowUps = (result) => {
    ltmDbConn.query("SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, number_of_days, IssueType, Priority FROM legendtime.tbltime WHERE Completed = '1' AND FollowUp = '1' AND  IssueType = 'Problem' AND number_of_days IS NOT NULL or ''", (err, res) => {
        if (err) {
            console.log('Error while getting follow-up data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

//FLStartTime,
FollowUps.startFollowUp = (req, result) => {
    const { id, employee, customer, activity, clientsAnydesk, phoneNumber, startTime, endTime, duration, type, solution, supportNo, comments, followUp, completed, name, numberOfDays, flStartTime, issueType, priority } = req.body;
    ltmDbConn.query("INSERT INTO legendtime.tblfollowedupcustomers (ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, NumberOfDays, FLStartTime, IssueType, Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, employee, customer, activity, clientsAnydesk, phoneNumber, startTime, endTime, duration, type, solution, supportNo, comments, followUp, completed, name, numberOfDays, flStartTime, issueType, priority], (err, res) => {
        if (err) {
            console.log('Error while starting a follow-up active ticket:' + err);
            result(null, err);
        } else {
            console.log('A Follow-Up on a customer has started successfully:', res);
            result(null, res);
        }
    });
}

FollowUps.updateFollowUp = (req, result) => {
    ltmDbConn.query('UPDATE legendtime.tbltime SET FollowUp = "2" WHERE ID = ?', [req.params.id], (err, res) => {
        if (err) {
            console.log('Error while ending active ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}

FollowUps.getCompletedFollowUps = (result) => {
    ltmDbConn.query("SELECT idx, ID, Employee, Customer, Activity, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, Name, Clients_Anydesk, NumberOfDays, TimeTaken, FLStartTime, FLEndTime, IssueType, Priority FROM legendtime.tblfollowedupcustomers", (err, res) => {
        if (err) {
            console.log('Error while getting follow-up data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

FollowUps.getActiveFollowUps = (result) => {
    ltmDbConn.query("SELECT * FROM legendtime.tblfollowedupcustomers where FollowUp = '2' AND FLEndTime IS NULL OR ''", (err, res) => {
        if (err) {
            console.log('Error while getting active follow-up data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

FollowUps.endActiveFollowUp = (req, result) => {
    ltmDbConn.query('UPDATE legendtime.tblfollowedupcustomers SET Completed = "2", FLEndTime = now() WHERE idx = ?', [req.params.idx], (err, res) => {
        if (err) {
            console.log('Error while ending active ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}


module.exports = FollowUps; 