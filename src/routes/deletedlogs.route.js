const express = require('express');
const router = express.Router();

const DeletedLogsController = require('../controllers/deletedlogs.controller');

require('dotenv').config({ path: '.configuration.env' }); // Updated file path


router.get(`/getdeletedlogs`, DeletedLogsController.getDeletedLogs);
router.post('/insertcallticket', DeletedLogsController.undoCallTicket);
router.delete('/deleteticket/:idx', DeletedLogsController.deleteTicketLog);

router.get(`/getdeletedlogstotal`, DeletedLogsController.getDeletedLogsTotal);

module.exports = router;