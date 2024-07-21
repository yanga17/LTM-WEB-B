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
    ltmDbConn.query("SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, Email_Address, number_of_days, IssueType, Priority FROM legendtime.tbltime WHERE Completed = '1' AND FollowUp = '1' AND  IssueType = 'Problem' AND number_of_days IS NOT NULL or ''", (err, res) => {
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

FollowUps.getUnresolvedTickets = (result) => {
    ltmDbConn.query("SELECT ID, Customer, name, Email_Address, Phone_Number, EndTime FROM legendtime.tbltime WHERE Completed = '1' AND FollowUp = '1' AND IssueType = 'Problem' AND number_of_days IS NOT NULL AND number_of_days != '' AND DATE_ADD(EndTime, INTERVAL number_of_days DAY) < NOW()", (err, res) => {
        if (err) {
            console.log('Error while getting follow-up data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

FollowUps.getUnresolvedTicketsTotal = (result) => {
    ltmDbConn.query("SELECT COUNT(*) AS FollowUpsTotal FROM legendtime.tbltime WHERE Completed = '1' AND FollowUp = '1' AND IssueType = 'Problem' AND number_of_days IS NOT NULL AND number_of_days != '' AND DATE_ADD(EndTime, INTERVAL number_of_days DAY) < NOW()", (err, res) => {
        if (err) {
            console.log('Error while getting follow-up data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

FollowUps.startUnresolvedFollowup = (req, result) => {
    ltmDbConn.query("INSERT INTO legendtime.tblfollowedupcustomers (ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, NumberOfDays, FLStartTime, IssueType, Priority) VALUES ((SELECT ID FROM legendtime.tbltime WHERE ID = ?), (SELECT Employee FROM legendtime.tbltime WHERE ID = ?), (SELECT Customer FROM legendtime.tbltime WHERE ID = ?), (SELECT Activity FROM legendtime.tbltime WHERE ID = ?), (SELECT Clients_Anydesk FROM legendtime.tbltime WHERE ID = ?), (SELECT Phone_Number FROM legendtime.tbltime WHERE ID = ?), (SELECT StartTime FROM legendtime.tbltime WHERE ID = ?), (SELECT EndTime FROM legendtime.tbltime WHERE ID = ?), (SELECT Duration FROM legendtime.tbltime WHERE ID = ?), (SELECT Type FROM legendtime.tbltime WHERE ID = ?), (SELECT Solution FROM legendtime.tbltime WHERE ID = ?), (SELECT Support_No FROM legendtime.tbltime WHERE ID = ?), (SELECT Comments FROM legendtime.tbltime WHERE ID = ?), 2, (SELECT Completed FROM legendtime.tbltime WHERE ID = ?), (SELECT name FROM legendtime.tbltime WHERE ID = ?), (SELECT NumberOfDays FROM legendtime.tbltime WHERE ID = ?), (SELECT FLStartTime FROM legendtime.tbltime WHERE ID = ?), (SELECT IssueType FROM legendtime.tbltime WHERE ID = ?), (SELECT Priority FROM legendtime.tbltime WHERE ID = ?))", [req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id, req.params.id], (err, res) => {
        if (err) {
            console.log('Error while transfering the ticket to the next Employee:' + err);
            result(null, err);
        } else {
            console.log('Transfering the ticket to the next Employee was Successful:', res);
            result(null, res);
        }
    });
}


module.exports = FollowUps; 