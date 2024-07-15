const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: './configuration.env' });

//getAll loggedTickets
router.get('/getickets', TicketsController.getTickets);
//getAll activeTickets || getEach activeTicket using ID - viewInDetail
router.get('/getactivetickets', TicketsController.getActiveTickets);
router.get('/getactivetickets/:callid', TicketsController.getEachActiveTicket);
router.get('/getactiveusertickets/:employee', TicketsController.getActiveUserTickets);//getActiveTickets for each Employee


//takeBtn in loggedTickets (ticketsModule) - insertTakeCallTicket into tbltime
router.post('/insertloggedticket', TicketsController.insertLoggedTicket);
router.patch('/updateloggedticket/:endtime/:callid', TicketsController.updateLoggedTicket);//update takeCallTicket in tblcalls - update - updateCallTicket into tblcalls
router.patch('/endticket/:employee/:callid', TicketsController.endActiveTicket); //end activeTicket - update into tbltime

//getAllCustomers, Problems, Employees, Types
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

//editTickets - LoggedTickets - remove the code
router.patch('/updateloggedcustomer/:customer/:callid', TicketsController.updateLoggedTicketCustomer);
router.patch('/updateloggedproblem/:problem/:callid', TicketsController.updateLoggedTicketProblem);
router.patch('/updateloggednumber/:number/:callid', TicketsController.updateLoggedTicketNumber);
router.patch('/updateloggedname/:name/:callid', TicketsController.updateLoggedTicketName);
router.patch('/updateloggedanydesk/:anydesk/:callid', TicketsController.updateLoggedTicketAnydesk);
router.patch('/updateloggedtype/:type/:callid', TicketsController.updateLoggedTicketType);
router.patch('/updateloggedemployee/:employee/:callid', TicketsController.updateLoggedTicketEmployee);
router.patch('/updateloggedcomments/:comments/:callid', TicketsController.updateLoggedTicketComments);

//single updateQuery 4 editing tickets
router.patch('/editloggedticket/:callid', TicketsController.editLoggedTicket);

//geticketSummaries
router.get('/getasksummary', TicketsController.getTaskSummary);
router.get('/geterrosummary', TicketsController.getErrorSummary);
router.get('/getotalsummary', TicketsController.getTotalSummary);
router.get('/getactivesummary', TicketsController.getActiveTicketSummary);
router.get('/getloggedsummary', TicketsController.getQueuedTicketSummary);

module.exports = router;