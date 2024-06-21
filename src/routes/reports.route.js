const express = require('express');
const router = express.Router();

const ReportsController = require('../controllers/reports.controller');

require('dotenv').config({ path: './configuration.env' });


router.get('/getclienthistorydata/:starttime/:endtime', ReportsController.getClientHistoryReport);
router.get('/getcalltimesdata/:starttime/:endtime', ReportsController.getCallTimesReport);
router.get('/getcustomercalldata/:starttime/:endtime', ReportsController.getCustomerCallsReport);
router.get('/getcustomererrordata/:starttime/:endtime', ReportsController.getCustomerErrorReport);
router.get('/getemployeetaskdata/:starttime/:endtime', ReportsController.getEmployeeTaskReport);
router.get('/getemployeeavgdata/:starttime/:endtime', ReportsController.getEmployeeAvgReport);
router.get('/getemployeeummarydata/:starttime/:endtime', ReportsController.getEmployeeSummaryReport);

//getclienthistorydata, getcustomercalldata, getcustomererrordata
module.exports = router;