var express = require('express');
var router = express.Router();
var User = require('../controllers/HomeController')
/* GET users listing. */
router.get('/findMatterMonth',User.findMatterMonth);
router.get('/findMatterToDay',User.findMatterToDay);
router.get('/findMatterOrderWeek',User.findMatterOrderWeek);
router.get('/findCateNum',User.findCateNum);


module.exports = router;