var express = require('express');
var router = express.Router();
var banner = require('../controllers/BannerController')
/* GET users listing. */
router.get('/addBanner',banner.addBanner);
router.get('/listPic',banner.listPic);
router.get('/deletepic',banner.deletepic);
router.get('/changePicStatus',banner.changePicStatus);





module.exports = router;