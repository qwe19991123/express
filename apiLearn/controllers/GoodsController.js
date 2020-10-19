const dbCongif = require('../util/dbconfig')
//商品列表
listGoods= (req,res)=>{
    let skuName = req.body.skuName
    let skuStatus = req.body.skuStatus
    let skuAd = req.body.skuAd
    let sql=`select count(1) from goods`
    let sqlArr=[]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            let data1= JSON.parse(JSON.stringify(data[0]).replace("count(1)","total"));
            if(skuName){
                var a = '%'+skuName+'%'
            }else{
                var a = '%'
            }
            if(skuAd){
                var c = '%'+skuAd+'%'
            }else{
                var c = '%'
            }
            if(!isNaN(skuStatus)){
                let sql=`select * from goods where skuName like ? and skuStatus = ? and skuAd like ?`
                let sqlArr=[a,skuStatus,c]
                let callBack=(err,data)=>{
                    let resData = {
                        ...data1,
                        list:data
                    }
                    if(err){
                        res.send({
                            'code':0,
                            'msg':'出错了',
                            'success':false,
                        })
                    }else{
                        res.send({
                            'code':1,
                            'msg':'查询成功',
                            'success':true,
                            'data':resData
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
            }else{
                let sql=`select * from goods where skuName like ? and skuStatus like ? and skuAd like ?`
                let sqlArr=[a,"%",c]
                let callBack=(err,data)=>{
                    let resData = {
                        ...data1,
                        list:data
                    }
                    if(err){
                        res.send({
                            'code':0,
                            'msg':'出错了',
                            'success':false,
                        })
                    }else{
                        res.send({
                            'code':1,
                            'msg':'查询成功',
                            'success':true,
                            'data':resData
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
            }
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//添加商品
addGoods = (req,res)=>{
   let skuName = req.body.skuName
   let ISBN = req.body.ISBN
   let costPrice = req.body.costPrice
   let salePrice = req.body.salePrice
   let saleNum = req.body.saleNum
   let firstCateName = req.body.firstCateName
   let secondCateName = req.body.secondCateName
   let skuAd = req.body.skuAd
   let skuIntroduction = req.body.skuIntroduction
   let skuStatus = req.body.skuStatus
   let visiteNum = req.body.visiteNum
   let businessCode = req.body.businessCode
   let storeNum = req.body.storeNum
   let images = req.body.images.join(',')
   let thisDate = new Date() 
   let sql=`insert into goods (skuName,ISBN,costPrice,salePrice,saleNum,firstCateName,secondCateName,skuAd,skuIntroduction,skuStatus,visiteNum,businessCode,storeNum,images,createdTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
   let sqlArr=[skuName,ISBN,costPrice,salePrice,saleNum,firstCateName,secondCateName,skuAd,skuIntroduction,skuStatus,visiteNum,businessCode,storeNum,images,thisDate]
   let callBack=(err,data)=>{
       if(err){
           console.log(err);
           res.send({
               'code':0,
               'msg':'出错了',
               'success':false
           })
           
       }else{
           res.send({
               'code':1,
               'msg':'添加成功',
               'success':true
           })
       }
   }
   dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//修改商品
updateGoodsInfo=(req,res)=>{
    let skuCode = req.body.skuCode
    let skuName = req.body.skuName
    let ISBN = req.body.ISBN
    let costPrice = req.body.costPrice
    let salePrice = req.body.salePrice
    let saleNum = req.body.saleNum
    let firstCateCode = req.body.firstCateCode
    let secondCateCode = req.body.secondCateCode
    let skuAd = req.body.skuAd
    let skuIntroduction = req.body.skuIntroduction
    let skuStatus = req.body.skuStatus
    let visiteNum = req.body.visiteNum
    let businessCode = req.body.businessCode
    let storeNum = req.body.storeNum
    let images = req.body.images
    let sql=`update goods set skuName=?,ISBN=?,costPrice=?,salePrice=?,saleNum=?,firstCateCode=?,secondCateCode=?,skuAd=?,skuIntroduction=?,skuStatus=?,visiteNum=?,businessCode=?,storeNum=?,images=? where skuCode=?`
    let sqlArr=[skuName,ISBN,costPrice,salePrice,saleNum,firstCateCode,secondCateCode,skuAd,skuIntroduction,skuStatus,visiteNum,businessCode,storeNum,images,skuCode,]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':0,
                'msg':'出错了',
                'success':true
            })
        }else{
            res.send({
                'code':1,
                'msg':'修改成功',
                'success':true
            })
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//商品详情
findGoodsBySkuCode=(req,res)=>{
    let skuCode = req.query.skuCode
    let sql=`select * from goods where skuCode=?`
    let sqlArr=[skuCode]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            res.send({
                'code':1,
                'msg':'查询成功',
                'success':true,
                'data':data
            })
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//删除商品
deleteGoods=(req,res)=>{
    let skuCode=req.query.skuCode
    let sql=`delete from goods where skuCode=?`
    let sqlArr=[skuCode]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            res.send({
                'code':1,
                'msg':'删除成功',
                'success':true
            })
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//修改商品状态
updateGoodsStatus=(req,res)=>{
   let skuCode = req.query.skuCode
   let status = req.query.status
   let sql=`update goods set skuStatus=? where skuCode=?`
   let sqlArr=[status,skuCode]
   let callBack=(err,data)=>{
       if(err){
           console.log(err);
           res.send({
               'code':0,
               'msg':'出错了',
               'success':false
           })
       }else{
           res.send({
               'code':1,
               'msg':'状态修改成功',
               'success':true
           })           
       }
   }
   dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//商品出版
listBusiness=(req,res)=>{
    let sql=`select * from business`
    let sqlArr=[]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            res.send({
                'code':1,
                'msg':'查询成功',
                'success':true,
                'data':data
            })
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}


module.exports = {
    listGoods,
    addGoods,
    updateGoodsInfo,
    findGoodsBySkuCode,
    deleteGoods,
    updateGoodsStatus,
    listBusiness
}