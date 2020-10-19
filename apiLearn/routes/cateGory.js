var express = require('express');
var router = express.Router();
var cateGory = require('../controllers/CateController')
/* GET users listing. */
router.get('/findCateGoryTree',cateGory.findCateGoryTree);
router.post('/addCateGory',cateGory.addCateGory);
router.post('/updateCateGory',cateGory.updateCateGory);
router.get('/findCateGoryByCode',cateGory.findCateGoryByCode);
router.get('/deleteMenuBycode',cateGory.deleteMenuBycode);



module.exports = router;
