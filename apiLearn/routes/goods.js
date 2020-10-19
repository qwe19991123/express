var express = require('express');
var router = express.Router();
var goods = require('../controllers/GoodsController')

var fs = require('fs');
// 引入七牛模块  
var qiniu = require("qiniu");
//要上传的空间名
var bucket = 'walkbookimg'; 
var imageUrl = 's3-cn-north-1.qiniucs.com'; // 域名名称
var accessKey = 'NKzKRnQpsBDAQhyVanWeqSxTC9NJAd5Sv1Dr3GPm';
var secretKey = 'ZQm6VsqG_25mtlYKHvfd7DYcVvMJQvEuhDLpvL6u';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
/* GET users listing. */
router.post('/listGoods',goods.listGoods);
router.post('/addGoods',goods.addGoods);
router.post('/updateGoodsInfo',goods.updateGoodsInfo);
router.get('/findGoodsBySkuCode',goods.findGoodsBySkuCode);
router.get('/deleteGoods',goods.deleteGoods);
router.get('/updateGoodsStatus',goods.updateGoodsStatus);
router.get('/listBusiness',goods.listBusiness);
// 图片上传
let qn = require('../controllers/qiniu');  //导入七牛文件   上方组件文件我命名qiniu.js
//结果包装函数
let result = function (obj,bool){
    if(bool){
        return {status:0,data:obj};
    }else{
        return {status:1,data:obj};
    }
}
//上传图片
router.post("/uploadImage",function(req,routerRes){
    try{
        qn.upImg(req,function(res){
            // console.log('res',res);
            if(res.status == 0){
                routerRes.json(result(res.data,true));
            }else{
                routerRes.json(result(res.msg,false));
            }
        });
    }catch(err){
        if(err){
            console.log('trycatch报错====',err);
        }
    }
})


module.exports = router;