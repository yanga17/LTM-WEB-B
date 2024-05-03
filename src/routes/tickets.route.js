const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getickets', TicketsController.getTickets);

router.get('/getickets/:callid', TicketsController.getEachTicket);

//active tickets
router.get('/getactivetickets', TicketsController.getActiveTickets);

router.get('/getactivetickets/:callid', TicketsController.getEachActiveTicket);

//TO TBLTIME - ACTIVE TABLE
router.post('/inserttickets', TicketsController.insertSelectedTicket);

router.patch('/updateticket/:endtime/:callid', TicketsController.updateSelectedTicket);

router.patch('/endticket/:employee/:callid', TicketsController.endActiveTicket);

module.exports = router;