var ltmDbConn = require("../../config/legendTimeDb.config");

var DeletedLogs = function (user) {
    this.idx = user.idx,
    this.Call_ID = user.callid,
    this.Employee = user.employee,
    this.Customer = user.customer,
    this.Problem = user.problem,
    this.Client_Name = user.clientName,
    this.Phone_Number = user.PhoneNumber,
    this.Start_Time = user.startTime,
    this.End_Time = user.endTime,
    this.SupportNumber = user.supportNumber,
    this.Priority = user.priority,
    this.IssueType = user.issueType,
    this.Type = user.type,
    this.Comments = user.comments,
    this.insertion_time = user.insertionTime,
    this.Reason = user.reason
};

DeletedLogs.getDeletedLogs = (result) => {
    ltmDbConn.query("SELECT idx, Call_ID, Employee, Customer, Problem, Client_Name, Phone_Number, Start_Time, End_Time, SupportNumber, Priority, IssueType, Type, Comments, insertion_time, Reason FROM legendtime.deletedlogs", (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
} 
//Employee, Customer, Problem, Client_Name, Phone_Number, Start_Time, SupportNumber, Priority, IssueType, Type, Comments
DeletedLogs.undoCallTicket = (req, result) => {
    const { customer, problem, phoneNo, starttime, employee, clientname, Supportnumber, priority, issueType, type, comments } = req.body;
    ltmDbConn.query('INSERT INTO legendtime.tblcalls (Customer, Problem, Phone_Number, Time, Empl, name, Support_No, Priority, IssueType, Type, Comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [customer, problem, phoneNo, starttime, employee, clientname, Supportnumber, priority, issueType, type, comments], (err, res) => {
        if (err) {
            console.log('Error while inserting call ticket:' + err);
            result(null, err);
        } else {
            console.log('Ticket inserted successfully:', res);
            result(null, res);
        }
    });
}

DeletedLogs.deleteTicketLog = (req, result) => {
    ltmDbConn.query('DELETE FROM legendtime.deletedlogs WHERE idx = ?', [req.params.idx], (err, res) => {
        if (err) {
            console.log('Error while deleting a ticket from DeletedLogsTable:' + err);
            result(null, err);
        } else {
            console.log('Ticket has been removed from DeletedLogs successfully:', res);
            result(null, res);
        }
    });
}

DeletedLogs.getDeletedLogsTotal = (result) => {
    ltmDbConn.query("SELECT COUNT(*) as DeletedLogsTotal FROM legendtime.deletedlogs", (err, res) => {
        if (err) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = DeletedLogs;