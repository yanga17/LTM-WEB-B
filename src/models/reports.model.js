var ltmDbConn = require("../../config/legendTimeDb.config");

var Reports = function (user) {
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

Reports.getClientHistoryReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Customer, Activity, Support_No, StartTime, EndTime, Duration, Comments, Phone_Number, Solution, IssueType, Phone_Number, Support_No, Employee, Type, name FROM legendtime.tbltime WHERE StartTime BETWEEN ? and ? ORDER BY Employee, StartTime DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Calls Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Calls Report Data was Successful:', res);
            result(null, res);
        }
    });
}

// Reports.getCallTimesReport = (req, result) => {
//     ltmDbConn.query("SELECT Call_ID, Customer, SUM(Taken) as CallCount, IF(AVG(TIMESTAMPDIFF(MINUTE, time, endtime)) < 60, CONCAT(ROUND(AVG(TIMESTAMPDIFF(MINUTE, time, endtime)), 2), ' Min'), CONCAT(ROUND(AVG(TIMESTAMPDIFF(MINUTE, time, endtime)) / 60, 2), ' Hours')) as 'AverageTime', IF(SUM(TIMESTAMPDIFF(MINUTE, time, endtime)) < 60, CONCAT(ROUND(SUM(TIMESTAMPDIFF(MINUTE, time, endtime)), 2), ' Min'), CONCAT(ROUND(SUM(TIMESTAMPDIFF(MINUTE, time, endtime)) / 60, 2), ' Hours')) as 'TotalHours' FROM legendtime.tblcalls WHERE DATE(Time) BETWEEN ? AND ? GROUP BY Customer ORDER BY CallCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
//         if (err) {
//             console.log('Error while getting the Customer Call Times Report Data:' + err);
//             result(null, err);
//         } else {
//             console.log('Fetching the Customer Call Times Report Data was Successful:', res);
//             result(null, res);
//         }
//     });
// }
Reports.getCallTimesReport = (req, result) => {
    ltmDbConn.query("SELECT Call_ID, Customer, SUM(Taken) AS CallCount, CONCAT(ROUND(AVG(TIMESTAMPDIFF(SECOND, STR_TO_DATE(Time, '%a %b %d %Y %H:%i:%s GMT+%T'), STR_TO_DATE(EndTime, '%a %b %d %Y %H:%i:%s GMT+%T')) / 60.0), 2), ' Min') AS AverageTime, CONCAT(ROUND(AVG(TIMESTAMPDIFF(SECOND, STR_TO_DATE(Time, '%a %b %d %Y %H:%i:%s GMT+%T'), STR_TO_DATE(EndTime, '%a %b %d %Y %H:%i:%s GMT+%T')) / 3600.0), 2), ' Hours') AS TotalHours FROM legendtime.tblcalls WHERE STR_TO_DATE(Time, '%a %b %d %Y %H:%i:%s GMT+%T') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s GMT+%T') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s GMT+%T') GROUP BY Call_ID, Customer", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Call Times Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Call Times Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getCustomerCallsReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Customer, Activity, COUNT(Customer) AS CallCount FROM legendtime.tbltime WHERE (StartTime) BETWEEN ? and ? GROUP BY Customer ORDER BY CallCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Calls Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Calls Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getCustomerErrorReport = (req, result) => {
    ltmDbConn.query("SELECT Call_ID, Problem, Customer, COUNT(Problem) AS ErrorCount FROM legendtime.tblcalls WHERE Time BETWEEN ? and ? GROUP BY Problem ORDER BY ErrorCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Error Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Error Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeAvgReport = (req, result) => {
    ltmDbConn.query("SELECT Employee, COUNT(*) AS EmployeeCount, IF(CAST((AVG(TIME_TO_SEC(Duration))) / 3600 AS DECIMAL(19,2)) < 1, CONCAT(CAST((AVG(TIME_TO_SEC(Duration))) / 60 AS DECIMAL(19,2)), ' Min'), CONCAT(ROUND((CAST((AVG(TIME_TO_SEC(Duration))) / 3600 AS DECIMAL(19,2))), 2), ' Hours')) AS AvgTimePerTicket, SUM(1) AS TotalTickets, MIN(StartTime) AS MinStartTime, MAX(EndTime) AS MaxEndTime, (SELECT COUNT(*) FROM legendtime.tbltime WHERE (Date(StartTime) BETWEEN ? AND ?) AND EndTime IS NOT NULL) AS TotalAllEmpTickets FROM legendtime.tbltime WHERE (Date(StartTime) BETWEEN ? AND ?) AND EndTime IS NOT NULL GROUP BY Employee ORDER BY TotalTickets DESC", [req.params.starttime, req.params.endtime, req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Average Time Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Average Time Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeTaskReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Employee, Activity, COUNT(Activity) AS TaskCount FROM legendtime.tbltime WHERE StartTime BETWEEN ? AND ? AND IssueType = 'Task' GROUP BY Employee, Activity ORDER BY TaskCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Tasks Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Tasks Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeSummaryReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Employee, SUM(CASE WHEN DAYNAME(EndTime) = 'Monday' THEN 1 ELSE 0 END) AS Monday, SUM(CASE WHEN DAYNAME(EndTime) = 'Tuesday' THEN 1 ELSE 0 END) AS Tuesday, SUM(CASE WHEN DAYNAME(EndTime) = 'Wednesday' THEN 1 ELSE 0 END) AS Wednesday, SUM(CASE WHEN DAYNAME(EndTime) = 'Thursday' THEN 1 ELSE 0 END) AS Thursday, SUM(CASE WHEN DAYNAME(EndTime) = 'Friday' THEN 1 ELSE 0 END) AS Friday, SUM(CASE WHEN DAYNAME(EndTime) = 'Saturday' THEN 1 ELSE 0 END) AS Saturday, SUM(CASE WHEN DAYNAME(EndTime) = 'Sunday' THEN 1 ELSE 0 END) AS Sunday, COUNT(*) AS OverallTotal FROM legendtime.tbltime WHERE EndTime BETWEEN ? AND ? GROUP BY Employee ORDER BY Employee ASC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Summary Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Summary Report was Successful:', res);
            result(null, res);
        }
    });
}

//getClientHistoryReport, getCustomerErrorReport
module.exports = Reports; 