const express = require('express');
const router = express.Router();

const ClientsController = require('../controllers/customers.controller');

require('dotenv').config({ path: './configuration.env' });

//getAll clients
//SELECT uid, client_name, LEG_num, phone_number, cellphone, IF(enabled = 1, 'Yes', 'No') AS Enabled, nrPCs AS Licenses, expiry_date, total_balance, current, 30days AS 'thirtyDays', 60days AS 'sixtyDays', 90days AS 'ninetyDays', support, support_package FROM legendtime.clients WHERE client_name LIKE '%PLUS PIM%';
router.get(`/getcustomers`, ClientsController.getCustomers);
router.get('/getcustomer/:uid', ClientsController.getEachCustomer);

router.get('/getsearchedcustomer/:clientname', ClientsController.getSearchedCustomer);
router.get('/getechnicians', ClientsController.getTechnicians);

module.exports = router;