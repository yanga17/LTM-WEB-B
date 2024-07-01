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
    dbConn.query('SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number as Telephone, StartTime, Support_No, Type, Comments, name as Name, Time_Taken, IssueType, Priority FROM legendtime.tbltime WHERE EndTime IS NULL', (err, res) => {
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

Tickets.endActiveTicketSolution = (req, result) => {
    dbConn.query('UPDATE legendtime.tbltime SET Solution = ?, number_of_days = ?, FollowUp = ?, Completed = ? WHERE ID = ?', [req.params.solution, req.params.numberofdays, req.params.followup, req.params.completed, req.params.id], (err, res) => {
        if (err) {
            console.log('Error while ending active ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}

Tickets.insertDeletedTicket = (req, result) => {
    const { callid, employee, customer, problem, clientname, phonenumber, startime, supportnumber, priority, issueType, type, comments, insertiontime  } = req.body;
    dbConn.query('INSERT INTO legendtime.deletedlogs (Call_ID, Employee, Customer, Problem, Client_Name, Phone_Number, Start_Time, SupportNumber, Priority, IssueType, Type, Comments, insertion_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', [callid, employee, customer, problem, clientname, phonenumber, startime, supportnumber, priority, issueType, type, comments, insertiontime], (err, res) => {
        if (err) {
            console.log('Error while inserting the ticket:' + err);
            result(null, err);
        } else {
            console.log('Ticket inserted successfully:', res);
            result(null, res);
        }
    });
}

Tickets.deleteCallReason = (req, result) => {
    dbConn.query('UPDATE legendtime.deletedlogs SET Reason = ? WHERE Call_ID = ?', [req.params.reason, req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while updating ac ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}

Tickets.deleteLoggedTicket = (req, result) => {
    dbConn.query('DELETE FROM legendtime.tblcalls WHERE Call_ID = ?', [req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while updating ac ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}


Tickets.insertStartActiveTicket = (req, result) => {
    const { employee, customer, name,  activity, startTime, type, supportNumber, phoneNumber, clientsAnydesk, comments, issueType } = req.body;
    dbConn.query('INSERT into legendtime.tbltime(Employee, Customer, Name,  Activity, StartTime, Type, Support_No, Phone_Number, Clients_Anydesk, Comments, IssueType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [employee, customer, name,  activity, startTime, type, supportNumber, phoneNumber, clientsAnydesk, comments, issueType], (err, res) => {
        if (err) {
            console.log('Error while inserting active ticket:' + err);
            result(null, err);
        } else {
            console.log('Active Ticket inserted successfully:', res);
            result(null, res);
        }
    });
}

Tickets.transferTicket = (req, result) => {
    dbConn.query("INSERT INTO tblcalls(Customer, Problem, Clients_Anydesk, Phone_Number, name, Time, Support_No, Empl, Comments, IssueType, logger) VALUES ((SELECT Customer FROM tbltime WHERE ID = ?), (SELECT Activity FROM tbltime WHERE ID = ?), (SELECT Clients_Anydesk FROM tbltime WHERE ID = ?), (SELECT Phone_Number FROM tbltime WHERE ID = ?), (SELECT name FROM tbltime WHERE ID = ?), NOW(), (SELECT Support_No FROM tbltime WHERE ID = ?), ?, (SELECT Comments FROM tbltime WHERE ID = ?), (SELECT IssueType FROM tbltime WHERE ID = ?), ?)", [req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.employee, req.params.callid, req.params.callid, req.params.employee], (err, res) => {
        if (err) {
            console.log('Error while transfering the ticket to the next Employee:' + err);
            result(null, err);
        } else {
            console.log('Transfering the ticket to the next Employee was Successful:', res);
            result(null, res);
        }
    });
}

Tickets.updatetransferedTicket = (req, result) => {
    dbConn.query("UPDATE legendtime.tbltime Set EndTime = NOW(), Duration = TIMEDIFF(EndTime, StartTime) WHERE ID = ?", [req.params.id], (err, res) => {
        if (err) {
            console.log('Updating the Endtime of the selected ticket errored out:' + err);
            result(null, err);
        } else {
            console.log('Updating the Endtime of the selected ticket Successful:', res);
            result(null, res);
        }
    });
}

Tickets.getFollowUpTicket = (req, result) => {
    dbConn.query('SELECT * FROM legendtime.tbltime WHERE ID = ?', [req.params.id], (err, res) => {
        if (err) {
            console.log('Error while updating ac ticket with a solution:' + err);
            result(null, err);
        } else {
            console.log('Ticket Solution updated successfully:', res);
            result(null, res);
        }
    });
}

Tickets.insertFollowUpTicket = (req, result) => {
    const { id, employee, customer, activity, clientsAnydesk, phoneNumber, startTime, endTime, duration, type, solution, supportNo, comments, followUp, completed, name, numberOfDays, flStartTime, issueType, priority } = req.body;
    dbConn.query("INSERT INTO legendtime.tblfollowedupcustomers (ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, NumberOfDays, FLStartTime, IssueType, Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, employee, customer, activity, clientsAnydesk, phoneNumber, startTime, endTime, duration, type, solution, supportNo, comments, followUp, completed, name, numberOfDays, flStartTime, issueType, priority], (err, res) => {
        if (err) {
            console.log('Error while inserting a follow-up ticket:' + err);
            result(null, err);
        } else {
            console.log('A Follow-Up on a customer has started successfully:', res);
            result(null, res);
        }
    });
}

//TicketSummary
Tickets.getTaskSummary = (result) => {
    dbConn.query('SELECT COUNT(*) AS NumberOfTasks FROM legendtime.tbltime WHERE Completed = "1" AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = "Task" AND DATE(EndTime) = CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getErrorSummary = (result) => {
    dbConn.query('SELECT COUNT(*) AS NumberOfProblems FROM legendtime.tbltime WHERE Completed = "1" AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = "Problem" AND DATE(EndTime) = CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getTotalSummary = (result) => {
    dbConn.query('SELECT COUNT(*) AS TicketsCompleted FROM legendtime.tbltime WHERE Completed = "1" AND EndTime IS NOT NULL AND Duration IS NOT NULL AND DATE(EndTime) = CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
} 

Tickets.getActiveTicketSummary = (result) => {
    dbConn.query('SELECT COUNT(*) AS ActiveTickets FROM legendtime.tbltime WHERE EndTime IS NULL', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


module.exports = Tickets;