var express = require('express');
var router = express.Router();
var shoppingCar = require('../controllers/ShoppingCarController')
/* GET users listing. */
router.get('/findGoodsFromCar',shoppingCar.findGoodsFromCar);
router.post('/addShoppingCar',shoppingCar.addShoppingCar);
router.get('/deleteGoodsFromCar',shoppingCar.deleteGoodsFromCar);
router.get('/addOneShoppingCar',shoppingCar.addOneShoppingCar);
router.get('/deleteOneShoppingCar',shoppingCar.deleteOneShoppingCar);





module.exports = router;