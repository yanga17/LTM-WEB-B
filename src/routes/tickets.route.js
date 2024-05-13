const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: './configuration.env' });

//getAll loggedTickets
router.get('/getickets', TicketsController.getTickets);
//getEach loggedTicket using ID - viewInDetail
router.get('/getickets/:callid', TicketsController.getEachTicket);

//getAll activeTickets
router.get('/getactivetickets', TicketsController.getActiveTickets);
//getEach activeTicket using ID - viewInDetail
router.get('/getactivetickets/:callid', TicketsController.getEachActiveTicket);


//takeBtn in loggedTickets (ticketsModule) - insertTakeCallTicket into tbltime
router.post('/insertloggedticket', TicketsController.insertLoggedTicket);
//update takeCallTicket in tblcalls - update - updateCallTicket into tblcalls
router.patch('/updateloggedticket/:endtime/:callid', TicketsController.updateLoggedTicket);
//end activeTicket - update into tbltime
router.patch('/endticket/:employee/:callid', TicketsController.endActiveTicket);


//getAllCustomers
router.get('/getcustomers', TicketsController.getCustomers);
//getAllProblems
router.get('/geterrors', TicketsController.getErrors);
//getAllEmployees
router.get('/getemployees', TicketsController.getEmployees);
//getAllType
router.get('/getypes', TicketsController.getTypes);


//StartCall insert statement - tblcalls
router.post('/insertcallticket', TicketsController.insertStartCallTicket)

//EndActiveTicket Solution - tbltime
router.patch('/updateactivesolution', TicketsController.endActiveTicketSolution)

module.exports = router;