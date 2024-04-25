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

module.exports = Tickets;