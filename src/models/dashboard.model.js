var ltmDbConn = require("../../config/legendTimeDb.config");

var Dashboard = function (user) {
    this.ID = user.id,
    this.Employee = user.employee,
    this.Customer = user.customer,
    this.Activity = user.activity,
    this.Clients_Anydesk = user.clientsAnydesk, 
    this.Phone_Number = user.phoneNumber,
    this.StartTime = user.startTime,
    this.EndTime = user.endTime,
    this.Duration = user.duration,
    this.Type = user.type,
    this.Solution = user.solution,
    this.Support_No = user.supportNo, 
    this.Comments = user.comments,
    this.FollowUp = user.followUp,
    this.Completed = user.completed,
    this.name = user.name,
    this.number_of_days = user.numberofdays,
    this.Time_Taken = user.timeTaken,
    this.IssueType = user.issueType,
    this.Taken = user.Taken,
    this.Priority = user.Priority
};

// Dashboard.getEmpTicketSummary = (req, result) => {
//     ltmDbConn.query("SELECT name, Tasks, Errors, (Tasks + Errors) AS Overall FROM (SELECT Employee AS name, COUNT(CASE WHEN IssueType = 'Task' THEN 1 END) AS Tasks, COUNT(CASE WHEN IssueType = 'Problem' THEN 1 END) AS Errors FROM tbltime WHERE EndTime IS NOT NULL AND StartTime >= ? AND EndTime <= ? GROUP BY Employee) AS subquery;", [req.params.starttime, req.params.endtime], (err, res) => {
//         if (err) {
//             console.log('Error while getting tasks summary:' + err);
//             result(null, err);
//         } else {
//             console.log('Fetching the Employee Ticket Summary was Successful:', res);
//             result(null, res);
//         }
//     });
// }

Dashboard.getEmpTicketSummary = (req, result) => {
    ltmDbConn.query("SELECT name, SUM(Tasks) AS Tasks, SUM(Errors) AS Errors, SUM(Tasks + Errors) AS Overall, ROUND(AVG(TIMESTAMPDIFF(MINUTE, StartTime, EndTime)), 2) AS AverageTime FROM (SELECT Employee AS name, CASE WHEN IssueType = 'Task' THEN 1 ELSE 0 END AS Tasks, CASE WHEN IssueType = 'Problem' THEN 1 ELSE 0 END AS Errors, StartTime, EndTime FROM tbltime WHERE EndTime IS NOT NULL AND StartTime BETWEEN ? AND ? ) AS subquery GROUP BY name", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting tasks summary:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Ticket Summary was Successful:', res);
            result(null, res);
        }
    });
}

Dashboard.getCustomerSummary = (req, result) => {
    ltmDbConn.query("SELECT Customer, Activity AS Error, COUNT(Activity) AS ErrorCount FROM tbltime WHERE EndTime IS NOT NULL AND IssueType = 'Problem' AND Activity IS NOT NULL OR '' AND StartTime >= ?  AND EndTime <= ?  GROUP BY Customer, Activity ORDER BY ErrorCount DESC LIMIT 30", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting Customer Data Summary:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Data Summary was Successful:', res);
            result(null, res);
        }
    });
}

Dashboard.getCustomerCallData = (req, result) => {
    ltmDbConn.query("SELECT Customer, COUNT(Customer) AS CallCount FROM legendtime.tbltime WHERE StartTime >= ? AND EndTime <= ? GROUP BY Customer ORDER BY CallCount DESC LIMIT 20", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting Customer Data Summary:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Data Summary was Successful:', res);
            result(null, res);
        }
    });
}

Dashboard.getEmployeeTasksData = (req, result) => {
    ltmDbConn.query("Select Employee, Activity AS Task, COUNT(Activity) As TasksCount From legendtime.tbltime Where StartTime BETWEEN ? AND ? AND IssueType = 'Task' GROUP BY Employee, Activity ORDER BY TasksCount DESC LIMIT 15", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting Customer Data Summary:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Data Summary was Successful:', res);
            result(null, res);
        }
    });
}

Dashboard.getClientSummary = (result) => {
    ltmDbConn.query("SELECT COUNT(DISTINCT client_name) AS TotalClientsCount, COUNT(CASE WHEN support = '1' AND support_package = 'Elite' THEN client_name END) AS ClientEliteCount, COUNT(CASE WHEN support = '1' AND support_package = 'Basic' THEN client_name END) AS ClientBasicCount, COUNT(CASE WHEN support = '1' AND (support_package IS NULL OR support_package = '') THEN client_name END) AS ClientNoSupportPackCount FROM legendtime.clients", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//commonErrorsGrid
Dashboard.getCommonErrors = (result) => {
    ltmDbConn.query("SELECT Activity, COUNT(Activity) AS CommonErrors FROM tbltime GROUP BY Activity ORDER BY CommonErrors DESC LIMIT 5;", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//CommonTasksGrid
Dashboard.getCommonTasks = (result) => {
    ltmDbConn.query("SELECT Activity, COUNT(Activity) AS CommonTasks FROM tbltime where IssueType = 'Task' GROUP BY Activity ORDER BY CommonTasks DESC LIMIT 5;", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Dashboard.getTicketSummary = (result) => {
    ltmDbConn.query("SELECT (SELECT COUNT(*) FROM legendtime.tbltime WHERE EndTime IS NULL) AS CurrentActiveTickets, (SELECT COUNT(Call_ID) FROM legendtime.tblcalls WHERE Taken = 0) AS CurrentLoggedTickets, (SELECT COUNT(*) FROM legendtime.tbltime WHERE Completed = '1' AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = 'Task' AND DATE(EndTime) = CURDATE()) AS TasksCompleted, (SELECT COUNT(*) FROM legendtime.tbltime WHERE Completed = '1' AND EndTime IS NOT NULL AND Duration IS NOT NULL AND IssueType = 'Problem' AND DATE(EndTime) = CURDATE()) AS ErrorsCompleted, (SELECT COUNT(*) FROM legendtime.tbltime WHERE Completed = '1' AND EndTime IS NOT NULL AND Duration IS NOT NULL AND DATE(EndTime) = CURDATE()) AS OvrTicketsCompleted", (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting user data: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Dashboard; 