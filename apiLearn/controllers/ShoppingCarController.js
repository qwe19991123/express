const dbCongif = require('../util/dbconfig')

//购物车列表
findGoodsFromCar=(req,res)=>{
     let userAccount=req.query.loginAccount
     let sql=`select * from shoppingCar where userAccount=?`
     let sqlArr=[userAccount]
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
                'msg':'查询成功',
                'success':true,
                'data':data
            })
        }
     }
     dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//添加购物车
addShoppingCar=(req,res)=>{
    let skuCode = req.body.skuCode
    let businessCode = req.body.businessCode
    let loginAccount = req.body.loginAccount
    let loginName = req.body.loginName
    let loginPhone = req.body.loginPhone
    let sql=`select * from goods where skuCode=?`
    let sqlArr=[skuCode]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            console.log(data);
            let sql=`insert into shoppingCar (skuName,salePrice,shopNum,businessCode,images,userAccount,userName,phone) values (?,?,?,?,?,?,?,?)`
            let sqlArr=[data[0].skuName,data[0].salePrice,1,businessCode,data[0].images,loginAccount,loginName,loginPhone]
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

    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//删除购物车
deleteGoodsFromCar=(req,res)=>{
  let skuCode = req.query.skuCode
  let sql=`delete from shoppingcar where skuCode=?`
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
            'msg':'删除成功',
            'success':true
        })
      }
  }
  dbCongif.sqlConnect(sql,sqlArr,callBack)
}

addOneShoppingCar=(req,res)=>{
    let skuCode = req.query.skuCode
    let sql=`select shopNum from shoppingCar where skuCode=?`
    let sqlArr=[skuCode]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            console.log(data[0]);
            
            let sql=`update shoppingcar set shopNum=? where skuCode=?`
            let sqlArr=[++data[0].shopNum,skuCode]
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
                        'msg':'商品加一',
                        'success':true
                    })
                }
            }
            dbCongif.sqlConnect(sql,sqlArr,callBack)
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
deleteOneShoppingCar=(req,res)=>{
    let skuCode = req.query.skuCode
    let sql=`select shopNum from shoppingCar where skuCode=?`
    let sqlArr=[skuCode]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            let sql=`update shoppingcar set shopNum=? where skuCode=?`
            let sqlArr=[--data[0].shopNum,skuCode]
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
                        'msg':'商品减一',
                        'success':true
                    })
                }
            }
            dbCongif.sqlConnect(sql,sqlArr,callBack)
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    findGoodsFromCar,
    addShoppingCar,
    deleteGoodsFromCar,
    addOneShoppingCar,
    deleteOneShoppingCar
}