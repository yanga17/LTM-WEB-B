const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/dashboard.controller');

require('dotenv').config({ path: '.configuration.env' }); // Updated file path

//bar-charts
router.get('/getempticketsdata/:starttime/:endtime', DashboardController.getEmpTicketsData); 
router.get('/getcustomererrorsdata/:starttime/:endtime', DashboardController.getCustomerSummary); 
router.get('/getcustomercalldata/:starttime/:endtime', DashboardController.getCustomerCallData); //works
router.get('/getemployeetasksdata/:starttime/:endtime', DashboardController.getEmployeeTasksData);
router.get('/getemployeeweeklydata/:starttime/:endtime', DashboardController.getEmployeeWeeklySummary);

//GridData
router.get('/getclientsummary', DashboardController.getClientSummary);
router.get('/getcommonerrors', DashboardController.getCommonErrors);
router.get('/getcommontasks', DashboardController.getCommonTasks);
router.get('/geticketsummary', DashboardController.getTicketSummary);
router.get('/getemployees', DashboardController.getEmployees);



module.exports = router;