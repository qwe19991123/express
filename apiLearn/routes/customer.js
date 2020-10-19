var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController')
/* GET users listing. */
router.post('/addCustomer',User.addCustomer);
router.post('/login',User.login);
router.get('/findCustomerById',User.findCustomerById);
router.post('/updateCustomerById',User.updateCustomerById);
router.post('/listCustomers',User.listCustomers);
router.get('/deleteCustomer',User.deleteCustomer);
router.get('/updatePwd',User.updatePwd);
router.get('/updateCustomerScore',User.updateCustomerScore);
router.get('/loginOut',User.loginOut);
router.get('/showScore',User.showScore);


module.exports = router;
