var dbConn = require("../../config/db.config");

var Tickets = function (user) {
    this.callid = user.callid;
    this.customer = user.customer;
    this.problem = user.problem;
    this.clientsAnydesk = user.clientsAnydesk;
    this.phoneNumber = user.phoneNumber;
    this.time = user.time;
    this.endTime = user.endTime;
    this.duration = user.duration;
    this.taken = user.taken;
    this.supportNo = user.supportNo;
    this.empl = user.empl;
    this.logger = user.logger;
    this.comments = user.comments;
    this.solution = user.solution;
    this.clientname = user.clientname;
    this.urgent = user.urgent;
    this.issueType = user.issueType;
};


Tickets.getTickets = (result) => {
    dbConn.query('SELECT Call_ID, Customer, Problem, Phone_Number, Name, Time, Empl, Comments, IssueType FROM legendtime.tblcalls WHERE Taken = 0', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
}

Tickets.getEachTicket = (req, result) => {
    dbConn.query('SELECT * FROM legendtime.tblcalls WHERE Taken = 0 AND Call_ID = ?', [req.params.callid], (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting the specific call:' + err);
            result(null, err)
        } else {
            console.log(res, 'result');
            result(null, res); 
        }
    })
}

Tickets.getActiveTickets = (result) => {
    dbConn.query('SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number as Telephone, StartTime, Support_No, Type, Comments, name as Name, Time_Taken, IssueType FROM legendtime.tbltime WHERE EndTime IS NULL', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
}

Tickets.getEachActiveTicket = (req, result) => {
    dbConn.query('SELECT * FROM legendtime.tbltime WHERE Completed Is Null AND ID = ?', [req.params.callid], (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting the specific call:' + err);
            result(null, err)
        } else {
            console.log(res, 'result');
            result(null, res); 
        }
    })
}

Tickets.insertSelectedTicket = (req, result) => {
    const { employee, customer, activity, phoneNumber, clientAnydesk, startTime, type, supportNo, comments, name, timeTaken, issueType } = req.body;
    dbConn.query('INSERT INTO legendtime.tbltime (Employee, Customer, Activity, Phone_Number, Clients_Anydesk, StartTime, Type, Support_No, Comments, Name, Time_Taken, IssueType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [employee, customer, activity, phoneNumber, clientAnydesk, startTime, type, supportNo, comments, name, timeTaken, issueType], (err, res) => {
        if (err) {
            console.log('Error while inserting the ticket:' + err);
            result(null, err);
        } else {
            console.log('Ticket inserted successfully:', res);
            result(null, res);
        }
    });
}

Tickets.updateSelectedTicket = (req, result) => {
    dbConn.query('UPDATE legendtime.tblcalls SET EndTime = ?, Taken = 1, Duration = TIMEDIFF(EndTime, Time) WHERE Call_ID = ?', [req.params.endtime, req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while updating the specific call:' + err);
            result(err, null);
        } else {
            console.log('Update successful:', res);
            result(null, res);
        }
    });
};

Tickets.endActiveTicket = (req, result) => {
    dbConn.query('UPDATE legendtime.tbltime SET EndTime = CASE WHEN EndTime IS NULL THEN NOW() END, Duration = CASE WHEN Duration IS NULL THEN TIMEDIFF(EndTime, StartTime) END WHERE Employee = ? AND ID = ?', [req.params.employee, req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while ending the active call:' + err);
            result(err, null);
        } else {
            console.log('Update Successful, Ticket Has Been Completed:', res);
            result(null, res);
        }
    });
};

module.exports = Tickets;


