const express = require('express');
const router = express.Router();

const CheckinController = require('../controllers/checkin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getcheckins', CheckinController.getCheckins);

router.post('/insertcheckin', CheckinController.InsertCheckin);

router.put('/updatecheckin', CheckinController.UpdateCheckin);

module.exports = router;
