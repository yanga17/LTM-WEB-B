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

//take button in loggedTickets table
Tickets.insertLoggedTicket = (req, result) => {
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
//take button in loggedTickets table
Tickets.updateLoggedTicket = (req, result) => {
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

Tickets.getCustomers = (result) => {
    dbConn.query("SELECT uid, CONCAT(client_name, ',', LEG_num) AS Customer FROM legendtime.clients ORDER BY client_name ASC;", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
} 

Tickets.getErrors = (result) => {
    dbConn.query('SELECT idx, Errors FROM legendtime.tblcustomererrors', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
}

Tickets.getEmployees = (result) => {
    dbConn.query('SELECT ID, Technician FROM legendtime.tbltechnicians order by Technician', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
}

Tickets.getTypes = (result) => {
    dbConn.query('SELECT Type FROM legendtime.tbltype', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
        //dbConn.end();
    })
}

Tickets.insertStartCallTicket = (req, result) => {
    const { customer, problem, time, phoneNumber, clientsAnydesk, name, support_no, empl, logger, comments, urgent, issueType, type } = req.body;
    dbConn.query('INSERT into legendtime.tblcalls(Customer, Problem, Time, Phone_Number, Clients_Anydesk, Name, Support_No, Empl, logger, Comments, urgent, IssueType, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [customer, problem, time, phoneNumber, clientsAnydesk, name, support_no, empl, logger, comments, urgent, issueType, type], (err, res) => {
        if (err) {
            console.log('Error while inserting call ticket:' + err);
            result(null, err);
        } else {
            console.log('Ticket inserted successfully:', res);
            result(null, res);
        }
    });
}
//UPDATE legendtime.tbltime SET Solution = 'TESTS ON SOLUTION INSERT', number_of_days = '1', FollowUp = '1', Completed = '1' WHERE ID = ?
Tickets.endActiveTicketSolution = (req, result) => {
    const { solution, numberOfDays, followUp, completed, id } = req.body;
    dbConn.query('UPDATE legendtime.tbltime SET Solution = ?, number_of_days = ?, FollowUp = ?, Completed = ? WHERE ID = ?', [solution, numberOfDays, followUp, completed, id], (err, res) => {
        if (err) {
            console.log('Error while ending active ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}


//INSERT into tblcalls(customer, problem, time, phoneNumber, clientsAnydesk, name, supportNo, empl, logger, comments, urgent, issueType) VALUES('WHIRES FM RADIO', 'WINDOWS', '2024-04-02 07:25:45', '0747593508',  '0987654321', 'YANGA', 'leg001', 'YANGA', 'eddy creep', 'Tested', 'Urgent', 'Problem')"
module.exports = Tickets;


