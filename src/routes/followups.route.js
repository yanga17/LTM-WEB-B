const express = require('express');
const router = express.Router();

const FollowUpsController = require('../controllers/followups.controller');

require('dotenv').config({ path: '.configuration.env' }); // Updated file path

//fromTime
router.get(`/getfollowups`, FollowUpsController.getFollowUps);
//followUp Customers
router.post('/insertfollowup', FollowUpsController.startFollowUp);
//followUp tbltime update
router.patch('/updatefollowup/:id', FollowUpsController.updateFollowUp);
//update tblfollowedupcustomers Table
router.patch('/endactivefollowup/:idx', FollowUpsController.endActiveFollowUp);
//getActiveFollowUp - followUp x FLEndTime
router.get(`/getactivefollowup`, FollowUpsController.getActiveFollowUps);
//endFollow-Up
router.patch('/endactivefollowup/:idx', FollowUpsController.endActiveFollowUp);

router.get('/getunresolvedtickets', FollowUpsController.getUnresolvedTickets);
router.get('/getunresolvedticketstotal', FollowUpsController.getUnresolvedTicketsTotal);
router.post('/startunresolvedfollowup/:id', FollowUpsController.startUnresolvedFollowup);

module.exports = router;