const express = require('express');
const router = express.Router();

const ClientsController = require('../controllers/customers.controller');

require('dotenv').config({ path: './configuration.env' });

//getAll clients
router.get('/getclients', ClientsController.getClients);



module.exports = router;