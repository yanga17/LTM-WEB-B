const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: './configuration.env' });

//getAll loggedTickets
router.get('/getickets', TicketsController.getTickets);
//getEach loggedTicket using ID - viewInDetail
//router.get('/getickets/:callid', TicketsController.getEachTicket);

//getAll activeTickets || getEach activeTicket using ID - viewInDetail
router.get('/getactivetickets', TicketsController.getActiveTickets);
router.get('/getactivetickets/:callid', TicketsController.getEachActiveTicket);


//takeBtn in loggedTickets (ticketsModule) - insertTakeCallTicket into tbltime
router.post('/insertloggedticket', TicketsController.insertLoggedTicket);
//update takeCallTicket in tblcalls - update - updateCallTicket into tblcalls
router.patch('/updateloggedticket/:endtime/:callid', TicketsController.updateLoggedTicket);
//end activeTicket - update into tbltime
router.patch('/endticket/:employee/:callid', TicketsController.endActiveTicket);


//getAllCustomers, Problems, Employees, Types
router.get('/getcustomers', TicketsController.getCustomers);
router.get('/geterrors', TicketsController.getErrors);
router.get('/getemployees', TicketsController.getEmployees);
router.get('/getypes', TicketsController.getTypes);


//StartCall insert statement - tblcalls
router.post('/insertcallticket', TicketsController.insertStartCallTicket);
//EndActiveTicket Solution - tbltime
router.patch('/updateactivesolution/:solution/:numberofdays/:followup/:completed/:id', TicketsController.endActiveTicketSolution);

//deletedlogs
router.post('/insertdeletedticket', TicketsController.insertDeletedTicket);

router.patch('/deletecallreason/:reason/:callid', TicketsController.deleteCallReason);

//deleted from tblcalls
router.delete('/deleteloggedticket/:callid', TicketsController.deleteLoggedTicket);

//StartActivity insert statement - tbltime
router.post('/insertactiveticket', TicketsController.insertStartActiveTicket);
router.post('/transferticket/:employee/:callid', TicketsController.transferTicket);
router.patch('/updatetransferedticket/:id', TicketsController.updatetransferedTicket);

//followUp Customers
router.post('/insertfollowup', TicketsController.insertFollowUpTicket);

//getTicket based on ID - tbTime
router.get('/getfollowupticket/:id', TicketsController.getFollowUpTicket);

//geticketSummaries
router.get('/getasksummary', TicketsController.getTaskSummary);
router.get('/geterrosummary', TicketsController.getErrorSummary);
router.get('/getotalsummary', TicketsController.getTotalSummary);
router.get('/getactivesummary', TicketsController.getActiveTicketSummary);


module.exports = router;