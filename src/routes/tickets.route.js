const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: '.configuration.env' }); // Updated file path


router.get('/getickets', TicketsController.getTickets); //getAll loggedTickets
router.get('/getactivetickets', TicketsController.getActiveTickets); //getAll activeTickets
router.get('/getactiveusertickets/:employee', TicketsController.getActiveUserTickets); //getActiveTickets for each Employee

router.post('/insertloggedticket', TicketsController.insertLoggedTicket);//takeBtn in loggedTickets (ticketsModule) - insertTakeCallTicket into tbltime
router.patch('/updateloggedticket/:endtime/:callid', TicketsController.updateLoggedTicket); //update takeCallTicket in tblcalls - update - updateCallTicket into tblcalls
router.patch('/endticket/:endtime/:callid', TicketsController.endActiveTicket); //end activeTicket - update into tbltime
router.patch('/endticketdetail/:endtime/:callid', TicketsController.endActiveTicketDetail); //in activeTicketsDetail

//getAll - Customers, Problems, Employees, Types
router.get('/getcustomers', TicketsController.getCustomers);
router.get('/geterrors', TicketsController.getErrors);
router.get('/getemployees', TicketsController.getEmployees);
router.get('/getypes', TicketsController.getTypes);

//StartCall insert statement - tblcalls
router.post('/insertcallticket', TicketsController.insertStartCallTicket);
router.patch('/updateactivesolution/:solution/:numberofdays/:followup/:completed/:id', TicketsController.endActiveTicketSolution); //EndActiveTicket Solution - tbltime

//deletedlogs
router.post('/insertdeletedticket', TicketsController.insertDeletedTicket);
router.patch('/deletecallreason/:reason/:callid', TicketsController.deleteCallReason);
router.delete('/deleteloggedticket/:callid', TicketsController.deleteLoggedTicket);//deleted from tblcalls

//StartActivity insert statement - tbltime
router.post('/insertactiveticket', TicketsController.insertStartActiveTicket);
router.post('/transferticket/:employee/:callid', TicketsController.transferTicket);
router.patch('/updatetransferedticket/:id', TicketsController.updatetransferedTicket);

//followUp Customers
router.post('/insertfollowup', TicketsController.insertFollowUpTicket);
router.get('/getfollowupticket/:id', TicketsController.getFollowUpTicket); //getTicket based on ID - tbTime

//single updateQuery 4 editing tickets
router.patch('/editloggedticket/:callid', TicketsController.editLoggedTicket);
router.patch('/editactiveticket/:id', TicketsController.editActiveTicket);

//geticketSummaries
router.get('/getasksummary', TicketsController.getTaskSummary);
router.get('/geterrosummary', TicketsController.getErrorSummary);
router.get('/getotalsummary', TicketsController.getTotalSummary);
router.get('/getactivesummary', TicketsController.getActiveTicketSummary);
router.get('/getloggedsummary', TicketsController.getLoggedTicketSummary);

//getEmployees who havent logged tickets
router.get('/getemployeesnonlogged', TicketsController.getEmployeesNonLogged);

module.exports = router;