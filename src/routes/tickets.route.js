const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getickets', TicketsController.getTickets);

router.get('/getactivetickets', TicketsController.getActiveTickets);

router.get('/getickets/:callid', TicketsController.getEachTicket);

router.post('/insertickets', TicketsController.InsertTickets);


module.exports = router;