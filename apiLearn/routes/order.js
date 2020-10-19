var express = require('express');
var router = express.Router();
var order = require('../controllers/OrderController')
/* GET users listing. */
router.get('/listOrders',order.listOrders);
router.get('/listOrderDetails',order.listOrderDetails);
router.post('/addOrder',order.addOrder);





module.exports = router;