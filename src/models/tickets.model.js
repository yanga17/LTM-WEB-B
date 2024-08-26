var ltmDbConn = require('../../config/legendTimeDb.config');
//const fns = require('date-fns')

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
    ltmDbConn.query('SELECT Call_ID, Customer, Problem, Phone_Number, Name, Time, Empl, Email_Address, Support_No, Clients_Anydesk, logger, Comments, Priority, IssueType, Type FROM legendtime.tblcalls WHERE Taken = 0', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getEachTicket = (req, result) => {
    ltmDbConn.query('SELECT * FROM legendtime.tblcalls WHERE Taken = 0 AND Call_ID = ?', [req.params.callid], (err, res) => {
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
    ltmDbConn.query('SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, Support_No, Type, Comments, name as Name, Email_Address, Time_Taken, IssueType, Priority FROM legendtime.tbltime WHERE EndTime IS NULL', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getActiveUserTickets = (req, result) => {
    ltmDbConn.query('SELECT ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, Support_No, Type, Comments, name as Name, Email_Address, Time_Taken, IssueType, Priority FROM legendtime.tbltime WHERE Employee = ? AND ISNULL(EndTime)', [req.params.employee], (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting the active user tickets:' + err);
            result(null, err)
        } else {
            console.log(res, 'Active User Tickets Result');
            result(null, res); 
        }
    })
}

//take button in loggedTickets table
Tickets.insertLoggedTicket = (req, result) => {
    const { employee, customer, activity, phoneNumber, clientAnydesk, startTime, type, support_no, comments, name, email_address, issueType, priority } = req.body;
    ltmDbConn.query('INSERT INTO legendtime.tbltime (Employee, Customer, Activity, Phone_Number, Clients_Anydesk, StartTime, Type, Support_No, Comments, Name, Email_Address, Time_Taken, IssueType, Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)', [employee, customer, activity, phoneNumber, clientAnydesk, startTime, type, support_no, comments, name, email_address, issueType, priority], (err, res) => {
        if (err) {
            console.log('Error while inserting the logged ticket into ActiveTickets Table:' + err);
            result(null, err);
        } else {
            console.log('Logged Ticket inserted successfully into ActiveTickets:', res);
            result(null, res);
        }
    });
}

//take button in loggedTickets table - before changes
// Tickets.updateLoggedTicket = (req, result) => {
//     ltmDbConn.query('UPDATE legendtime.tblcalls SET EndTime = NOW(), Taken = 1, Duration = TIMEDIFF(EndTime, Time) WHERE Call_ID = ?', [req.params.callid], (err, res) => {
//         if (err) {
//             console.log('Error while updating the specific call:' + err);
//             result(err, null);
//         } else {
//             console.log('Update successful:', res);
//             result(null, res);
//         }
//     });
// };

/* UPDATE LOGGED TICKET */
Tickets.updateLoggedTicket = (req, result) => {
    // Step 1: Retrieve the current start time (Time) from the database for the given Call_ID
    ltmDbConn.query('SELECT Time FROM legendtime.tblcalls WHERE Call_ID = ?', [req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while fetching the start time for the logged ticket:' + err);
            result(err, null);  // Handle error if the query fails
        } else {
            // Step 2: Parse the start time (Time) from the database and the end time (EndTime) from the request
            const startTime = new Date(res[0].Time);
            const endTime = new Date(req.params.endtime);

            // Step 3: Calculate the difference between the start and end times in milliseconds
            const differenceInMillis = endTime - startTime;

            // Step 4: Convert the difference into total seconds
            const differenceInSeconds = Math.floor(differenceInMillis / 1000);

            // Step 5: Extract hours, minutes, and seconds from the total difference in seconds
            const hours = Math.floor(differenceInSeconds / 3600);
            const minutes = Math.floor((differenceInSeconds % 3600) / 60);
            const seconds = differenceInSeconds % 60;

            // Step 6: Format the duration as a string in the format "xh ym zs"
            const duration = `${hours}h ${minutes}m ${seconds}s`;

            // Step 7: Update the EndTime and Duration columns in the database for the given Call_ID
            ltmDbConn.query('UPDATE legendtime.tblcalls SET EndTime = ?, Duration = ?, Taken = 1 WHERE Call_ID = ?', 
                [req.params.endtime, duration, req.params.callid], (err, res) => {
                if (err) {
                    console.log('Error while updating the endtime for the logged ticket:' + err);
                    result(err, null);  // Handle error if the update fails
                } else {
                    console.log('Update EndTime and Duration for Logged Ticket - Successful:', res);
                    result(null, res);  // Return the result if the update is successful
                }
            });
        }
    });
};



//----- ----- ------ End Active Tickets ----- ----- ----- //
// Tickets.endActiveTicket = (req, result) => {
//     ltmDbConn.query('UPDATE legendtime.tbltime SET EndTime = CASE WHEN EndTime IS NULL THEN NOW() END, Duration = CASE WHEN Duration IS NULL THEN TIMEDIFF(EndTime, StartTime) END WHERE Employee = ? AND ID = ?', [req.params.employee, req.params.callid], (err, res) => {
//         if (err) {
//             console.log('Error while ending the active call:' + err);
//             result(err, null);
//         } else {
//             console.log('Update Successful, Ticket Has Been Completed:', res);
//             result(null, res);
//         }
//     });
// };
Tickets.endActiveTicket = (req, result) => {
    // Step 1: Retrieve the StartTime from the database for the given Call_ID
    ltmDbConn.query('SELECT StartTime FROM legendtime.tbltime WHERE ID = ?', [req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while fetching the start time for the active call:' + err);
            result(err, null); // Handle error if the query fails
        } else {
            // Step 2: Parse the StartTime from the database and the EndTime from the request
            const startTime = new Date(res[0].StartTime);
            const endTime = new Date(req.params.endtime);

            // Step 3: Calculate the difference between the start and end times in milliseconds
            const differenceInMillis = endTime - startTime;

            // Step 4: Convert the difference into total seconds
            const differenceInSeconds = Math.floor(differenceInMillis / 1000);

            // Step 5: Extract hours, minutes, and seconds from the total difference in seconds
            const hours = Math.floor(differenceInSeconds / 3600);
            const minutes = Math.floor((differenceInSeconds % 3600) / 60);
            const seconds = differenceInSeconds % 60;

            // Step 6: Format the duration as a string in the format "xh ym zs"
            const duration = `${hours}h ${minutes}m ${seconds}s`;

            // Step 7: Update the EndTime and Duration columns in the database for the given Call_ID
            ltmDbConn.query('UPDATE legendtime.tbltime SET EndTime = ?, Duration = ?, Taken = 1 WHERE ID = ?', 
                [req.params.endtime, duration, req.params.callid], (err, res) => {
                if (err) {
                    console.log('Error while ending the Active Call:' + err);
                    result(err, null); // Handle error if the update fails
                } else {
                    console.log('Update Successful, Active Ticket Has Been Completed:', res);
                    result(null, res); // Return the result if the update is successful
                }
            });
        }
    });
};


// Tickets.endActiveTicketDetail = (req, result) => {
//     ltmDbConn.query('UPDATE legendtime.tbltime SET EndTime = CASE WHEN EndTime IS NULL THEN NOW() END, Duration = CASE WHEN Duration IS NULL THEN TIMEDIFF(EndTime, StartTime) END WHERE ID = ?', [req.params.callid], (err, res) => {
//         if (err) {
//             console.log('Error while ending the active call:' + err);
//             result(err, null);
//         } else {
//             console.log('Update Successful, Ticket Has Been Completed:', res);
//             result(null, res);
//         }
//     });
// };

Tickets.endActiveTicketDetail = (req, result) => {
    // Step 1: Retrieve the StartTime from the database for the given Call_ID
    ltmDbConn.query('SELECT StartTime FROM legendtime.tbltime WHERE ID = ?', [req.params.callid], (err, res) => {
        if (err) {
            console.log('Error while fetching the start time for the active call:' + err);
            result(err, null); // Handle error if the query fails
        } else {
            // Step 2: Parse the StartTime from the database and the EndTime from the request
            const startTime = new Date(res[0].StartTime);
            const endTime = new Date(req.params.endtime);

            // Step 3: Calculate the difference between the start and end times in milliseconds
            const differenceInMillis = endTime - startTime;

            // Step 4: Convert the difference into total seconds
            const differenceInSeconds = Math.floor(differenceInMillis / 1000);

            // Step 5: Extract hours, minutes, and seconds from the total difference in seconds
            const hours = Math.floor(differenceInSeconds / 3600);
            const minutes = Math.floor((differenceInSeconds % 3600) / 60);
            const seconds = differenceInSeconds % 60;

            // Step 6: Format the duration as a string in the format "xh ym zs"
            const duration = `${hours}h ${minutes}m ${seconds}s`;

            // Step 7: Update the EndTime and Duration columns in the database for the given Call_ID
            ltmDbConn.query('UPDATE legendtime.tbltime SET EndTime = ?, Duration = ?, Taken = 1 WHERE ID = ?', 
                [req.params.endtime, duration, req.params.callid], (err, res) => {
                if (err) {
                    console.log('Error while ending the Active Call:' + err);
                    result(err, null); // Handle error if the update fails
                } else {
                    console.log('Update Successful, Active Ticket Has Been Completed:', res);
                    result(null, res); // Return the result if the update is successful
                }
            });
        }
    });
};

//----- ----- ------ editTickets ----- ----- ----- //
Tickets.editLoggedTicket = (req, result) => {
    const { customer, problem, number, name, email, anydesk, type, employee, issueType, priority, comments  } = req.body;
    const callID = req.params.callid;

    ltmDbConn.query('UPDATE legendtime.tblcalls SET Customer = ? , Problem = ?, Phone_Number = ?, name = ?, Email_Address = ?, Clients_Anydesk = ?, Type = ?, Empl = ?, IssueType = ?,  Priority = ?, Comments = ? WHERE Call_ID = ?', [customer, problem, number, name, email, anydesk, type, employee, issueType, priority, comments, callID], (err, res) => {
        if (err) {
            console.log('Error while editing the entire logged ticket:' + err);
            result(null, err);
        } else {
            console.log('Ticket has been edited successfully:', res);
            result(null, res);
        }
    });
}

Tickets.editActiveTicket = (req, result) => {
    const { customer, problem, number, name, email, anydesk, type, employee, issueType, comments, priority  } = req.body;
    const id = req.params.id;

    ltmDbConn.query('UPDATE legendtime.tbltime SET Customer = ?, Activity = ?, Phone_Number = ?, name = ?, Email_Address = ?, Clients_Anydesk = ?, Type = ?, Employee = ?, IssueType = ?,  Comments = ?, Priority = ? WHERE ID = ?', [customer, problem, number, name, email, anydesk, type, employee, issueType, comments, priority, id], (err, res) => {
        if (err) {
            console.log('Error while editing the entire Active ticket:' + err);
            result(null, err);
        } else {
            console.log('Active Ticket has been edited successfully:', res);
            result(null, res);
        }
    });
}



Tickets.getCustomers = (result) => {
    ltmDbConn.query("SELECT uid, CONCAT(client_name, ',', LEG_num) AS Customer FROM legendtime.clients ORDER BY client_name ASC", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }

    })
} 

Tickets.getErrors = (result) => {
    ltmDbConn.query('SELECT idx, Errors FROM legendtime.tblcustomererrors ORDER BY Errors ASC', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }

    })
}

Tickets.getEmployees = (result) => {
    ltmDbConn.query('SELECT ID, Technician FROM legendtime.tbltechnicians order by Technician', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }

    })
}

Tickets.getTypes = (result) => {
    ltmDbConn.query('SELECT Type FROM legendtime.tbltype ORDER BY Type ASC', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.insertStartCallTicket = (req, result) => {
    const { customer, problem, time, phoneNumber, clientsAnydesk, name, email_address, support_no, empl, logger, comments, priority, issueType, type } = req.body;
    ltmDbConn.query('INSERT into legendtime.tblcalls(Customer, Problem, Time, Phone_Number, Clients_Anydesk, Taken, Name, Email_Address, Support_No, Empl, logger, Comments, Priority, IssueType, Type) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [customer, problem, time, phoneNumber, clientsAnydesk, name, email_address, support_no, empl, logger, comments, priority, issueType, type], (err, res) => {
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
    ltmDbConn.query('UPDATE legendtime.tbltime SET Solution = ?, number_of_days = ?, FollowUp = ?, Completed = ? WHERE ID = ?', [req.params.solution, req.params.numberofdays, req.params.followup, req.params.completed, req.params.id], (err, res) => {
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
    ltmDbConn.query('INSERT INTO legendtime.deletedlogs (Call_ID, Employee, Customer, Problem, Client_Name, Phone_Number, Start_Time, SupportNumber, Priority, IssueType, Type, Comments, insertion_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', [callid, employee, customer, problem, clientname, phonenumber, startime, supportnumber, priority, issueType, type, comments, insertiontime], (err, res) => {
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
    ltmDbConn.query('UPDATE legendtime.deletedlogs SET Reason = ? WHERE Call_ID = ?', [req.params.reason, req.params.callid], (err, res) => {
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
    ltmDbConn.query('DELETE FROM legendtime.tblcalls WHERE Call_ID = ?', [req.params.callid], (err, res) => {
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
    const { employee, customer, name, email_address, activity, startTime, type, supportNumber, phoneNumber, clientsAnydesk, comments, issueType, priority } = req.body;
    ltmDbConn.query('INSERT into legendtime.tbltime(Employee, Customer, Name,  Email_Address, Activity, StartTime, Type, Support_No, Phone_Number, Clients_Anydesk, Comments, Time_Taken, IssueType, Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)', [employee, customer, name, email_address, activity, startTime, type, supportNumber, phoneNumber, clientsAnydesk, comments, issueType, priority], (err, res) => {
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
    ltmDbConn.query("INSERT INTO legendtime.tblcalls(Customer, Problem, Clients_Anydesk, Phone_Number, name, Email_Address, Time, Support_No, Empl, Comments, Priority, IssueType, Type, logger) VALUES ((SELECT Customer FROM tbltime WHERE ID = ?), (SELECT Activity FROM tbltime WHERE ID = ?), (SELECT Clients_Anydesk FROM tbltime WHERE ID = ?), (SELECT Phone_Number FROM tbltime WHERE ID = ?), (SELECT name FROM tbltime WHERE ID = ?), (SELECT Email_Address FROM tbltime WHERE ID = ?), (SELECT StartTime FROM tbltime WHERE ID = ?), (SELECT Support_No FROM tbltime WHERE ID = ?), ?, (SELECT Comments FROM tbltime WHERE ID = ?), (SELECT Priority FROM tbltime WHERE ID = ?), (SELECT IssueType FROM tbltime WHERE ID = ?), (SELECT Type FROM tbltime WHERE ID = ?),?)", [req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.employee, req.params.callid, req.params.callid, req.params.callid, req.params.callid, req.params.employee], (err, res) => {
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
    // Step 1: Retrieve the current start time (StartTime) from the database for the given ID
    ltmDbConn.query('SELECT StartTime FROM legendtime.tbltime WHERE ID = ?', [req.params.id], (err, res) => {
        if (err) {
            console.log('Error while fetching the start time for the transferred ticket:' + err);
            result(err, null);  // Handle error if the query fails
        } else {
            // Step 2: Parse the start time (StartTime) from the database
            const startTime = new Date(res[0].StartTime);
            const endTime = new Date();  // Use the current time as the end time

            // Step 3: Calculate the difference between the start and end times in milliseconds
            const differenceInMillis = endTime - startTime;

            // Step 4: Convert the difference into total seconds
            const differenceInSeconds = Math.floor(differenceInMillis / 1000);

            // Step 5: Extract hours, minutes, and seconds from the total difference in seconds
            const hours = Math.floor(differenceInSeconds / 3600);
            const minutes = Math.floor((differenceInSeconds % 3600) / 60);
            const seconds = differenceInSeconds % 60;

            // Step 6: Format the duration as a string in the format "xh ym zs"
            const duration = `${hours}h ${minutes}m ${seconds}s`;

            // Step 7: Update the EndTime and Duration columns in the database for the given ID
            ltmDbConn.query('UPDATE legendtime.tbltime SET EndTime = ?, Duration = ?, Taken = 1 WHERE ID = ?', 
                [endTime, duration, req.params.id], (err, res) => {
                if (err) {
                    console.log('Error while updating the EndTime for the transferred ticket:' + err);
                    result(err, null);  // Handle error if the update fails
                } else {
                    console.log('Update EndTime and Duration for Transferred Ticket - Successful:', res);
                    result(null, res);  // Return the result if the update is successful
                }
            });
        }
    });
};

Tickets.getFollowUpTicket = (req, result) => {
    ltmDbConn.query('SELECT * FROM legendtime.tbltime WHERE ID = ?', [req.params.id], (err, res) => {
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
    ltmDbConn.query("INSERT INTO legendtime.tblfollowedupcustomers (ID, Employee, Customer, Activity, Clients_Anydesk, Phone_Number, StartTime, EndTime, Duration, Type, Solution, Support_No, Comments, FollowUp, Completed, name, NumberOfDays, FLStartTime, IssueType, Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, employee, customer, activity, clientsAnydesk, phoneNumber, startTime, endTime, duration, type, solution, supportNo, comments, followUp, completed, name, numberOfDays, flStartTime, issueType, priority], (err, res) => {
        if (err) {
            console.log('Error while inserting a follow-up ticket:' + err);
            result(null, err);
        } else {
            console.log('A Follow-Up on a customer has started successfully:', res);
            result(null, res);
        }
    });
}

//editTickets ------------------------
// Tickets.updateLoggedTicketCustomer = (req, result) => {
//     ltmDbConn.query('UPDATE legendtime.tblcalls SET Customer = ? WHERE Call_ID = ?', [req.params.customer, req.params.callid], (err, res) => {
//         if (err) {
//             console.log('Error while updating the logged ticket Customer:' + err);
//             result(err, null);
//         } else {
//             console.log('Updating Logged Customer was Successful:', res);
//             result(null, res);
//         }
//     });
// };

//TicketSummary
Tickets.getTaskSummary = (result) => {
    ltmDbConn.query("SELECT COUNT(*) AS NumberOfTasks FROM legendtime.tbltime WHERE Completed = '1' AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = 'Task' AND DATE(STR_TO_DATE(EndTime, '%a %b %d %Y %H:%i:%s')) = CURDATE()", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getErrorSummary = (result) => {
    ltmDbConn.query("SELECT COUNT(*) AS NumberOfProblems FROM legendtime.tbltime WHERE Completed = '1' AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = 'Problem' AND DATE(STR_TO_DATE(EndTime, '%a %b %d %Y %H:%i:%s')) = CURDATE()", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getTotalSummary = (result) => {
    ltmDbConn.query('SELECT COUNT(*) AS TicketsCompleted FROM legendtime.tbltime WHERE Completed = "1" AND EndTime IS NOT NULL AND Duration IS NOT NULL AND DATE(EndTime) = CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
} 

Tickets.getActiveTicketSummary = (result) => {
    ltmDbConn.query('SELECT COUNT(*) AS ActiveTickets FROM legendtime.tbltime WHERE EndTime IS NULL', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getLoggedTicketSummary = (result) => {
    ltmDbConn.query('SELECT COUNT(*) As QueuedTickets FROM legendtime.tblcalls WHERE Taken = 0', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Tickets.getEmployeesNonLogged = (result) => {
    ltmDbConn.query('SELECT t.Technician FROM legendtime.tbltechnicians t LEFT JOIN legendtime.tblcalls c ON t.Technician = c.Empl AND DATE(c.Time) = CURRENT_DATE() WHERE c.Empl IS NULL;', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Tickets;