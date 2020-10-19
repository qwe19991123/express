const dbCongif = require('../util/dbconfig')

// let redis = require('redis'),
// RDS_PORT = 6379,        //端口号
// RDS_HOST = '127.0.1.1',    //服务器IP
// RDS_OPTS = {RDS_PWD : '123456'},            //设置项
// client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
// //订单列表
listOrders=(req,res)=>{
    let userAccount=req.query.loginAccount
    let isAdmin=req.query.isAdmin
    let orderUserName=req.query.userName
    let phone=req.query.phone
    let orderCode=req.query.orderCode
    let orderStatus=req.query.orderStatus
    let orderStartTime=req.query.orderStartTime
    let orderEndTime=req.query.orderEndTime
    console.log(orderUserName);
    if(isAdmin==0){
        let sql=`select * from orderlist_second where userAccount=?`
                let sqlArr=[userAccount]
                let callBack=(err,data)=>{
                    let resData = {
                        list:data
                    }
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
                            'data':resData
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else if(isAdmin==1){
        let sql=`select count(1) from orderlist`
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
                if(orderStartTime){
                    var a= orderStartTime
                }else{
                    var a= '2020-09-01 00:00:00'
                }
                if(orderEndTime){
                    var b= orderEndTime
                }else{
                    var b= new Date()
                }
                if(orderUserName!=undefined){
                    var c="%"+ orderUserName+"%"
                }else{
                    var c='%'
                }
                if(phone!=undefined){
                    var d="%"+ phone+"%"
                }else{
                    var d='%'
                }
                if(orderCode!=undefined){
                    var e="%"+orderCode+"%"
                }else{
                    var e='%'
                }
                if(orderStatus!=undefined){
                    var f=orderStatus
                }else{
                    var f='%'
                }
                let data1= JSON.parse(JSON.stringify(data[0]).replace("count(1)","total"));
                let sql=`select * from orderlist where  createdTime between ? and ? and userName like ? and phone like ? and uuid like ? and orderStatus = ?`
                let sqlArr=[a,b,c,d,e,f]
                let callBack=(err,data)=>{
                    let resData = {
                        ...data1,
                        list:data
                    }
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
                            'data':resData
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
            }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else{
        res.send({
            'code':0,
            'msg':'isAdmin出错了',
            'success':false
        })
    }
}
//订单详情
listOrderDetails=(req,res)=>{
    let orderCode =req.query.orderCode
    let sql=`select * from orderlist where skuCode=?`
    let sqlArr=[orderCode]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            let sql=`select * from orderlist_second where businessCode=? and parentCode=?`
            let sqlArr=[data[0].businessCode,data[0].skuCode]
            let callBack=(err,data)=>{
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
                        'data':data
                    })
                }
            }
            dbCongif.sqlConnect(sql,sqlArr,callBack)
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)

}
//创建订单
addOrder= (req,res)=>{
    let userName = req.body.userName
    let userAccount = req.body.userAccount
    let phone = req.body.phone
    let id = req.body.id
    let frontScore = req.body.frontScore
    let thisDate = new Date()
    const UUID = require('uuid');
    const ID = UUID.v1().replace(/-/g, '');
    //判断积分是否充足 不足的话返回积分不足 足的话再执行
    let sql=`select frontScore from appuser where id =?`
    let sqlArr=[id]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
          if(data[0].frontScore>=frontScore){
                //积分减少
                let sql2=`update appuser set frontScore=? where id=?`
                let sql2Arr=[data[0].frontScore-frontScore,id]
                dbCongif.sqlConnect(sql2,sql2Arr)
                //根据购物车 生成订单主表
                //查询订单主表的skucode 修改所有购物车中parentcode的值
                let sql1=`select * from shoppingCar`
                let callBack1= (err,data)=>{
                    if(err){
                    console.log(err);
                        
                    res.send({
                        'code':0,
                        'msg':'出错了',
                        'successs':false
                    })
                    }else{
                        //data中每一项的businesscode去重
                        let a=``
                        function unique(arr){
                                            var arr1 = [];       // 新建一个数组来存放arr中的值
                                            for(var i=0,len=arr.length;i<len;i++){
                                                if(arr1.indexOf(arr[i].businessCode) === -1){
                                                    arr1.push(arr[i].businessCode);
                                                }
                                            }
                                            return arr1;
                                            }
                        let arr1=unique(data)
                        var sqlArr=[0,arr1[0],userAccount,userName,phone,thisDate,ID]
                        for(let i=1;i<arr1.length;i++){
                            a += `,(?,?,?,?,?,?,?)`
                            var sqlArr1=[0,arr1[i],userAccount,userName,phone,thisDate,ID]
                            var sqlArr = sqlArr.concat(sqlArr1) 
                        }
                        let sql=`insert into orderlist (orderStatus,businessCode,userAccount,userName,phone,createdTime,uuid) values(?,?,?,?,?,?,?)`+a
                        let callBack=(err,data)=>{
                            if(err){
                            console.log(err);
                            res.send({
                                'code':0,
                                'msg':'出错了',
                                'successs':false
                            })
                            }else{
                                res.send({
                                    'code':1,
                                    'msg':'订单添加成功',
                                    'successs':true
                                })
                            }
                        }
                        dbCongif.sqlConnect(sql,sqlArr,callBack)
                        //如果购物车的businessCode等于 新增加的这几个订单的businessCode  那么购物车的parentCode等于订单主表的
                        let sql1=`select * from orderlist`
                        let callBack1=(err,data1)=>{
                            if(err){
                                res.send({
                                    'code':0,
                                    'msg':'出错了',
                                    'success':false
                                })
                            }else{
                                //data1最后b.length的几个循环
                                for(let i= data1.length-arr1.length;i<data1.length;i++){
                                    data.forEach((item)=>{
                                        if(item.businessCode==data1[i].businessCode){
                                            let sql=`update shoppingCar set parentCode=? where skuCode=?`
                                            let sqlArr=[data1[i].skuCode,item.skuCode]
                                            dbCongif.sqlConnect(sql,sqlArr)
                                        }
                                        })
                                }
                            }
                        }
                        setTimeout(()=>{
                            dbCongif.sqlConnect(sql1,callBack1)
                        },3000)
                    }
                }
                dbCongif.sqlConnect(sql1,callBack1)
                //然后复制购物车表到订单副表  删除购物车表
                let sql=`insert into orderlist_second select  * from shoppingCar`
                let callBack=(err,data)=>{
                    if(err){
                        console.log(err);
                        
                        res.send({
                            'code':0,
                            'msg':'出错了',
                            'success':false
                        })
                    }else{
                        //清空购物车
                        let sql=`delete from shoppingCar`
                        dbCongif.sqlConnect(sql)
                    }
                }
                setTimeout(()=>{
                    dbCongif.sqlConnect(sql,callBack)
                },6000)
          }else{
             res.send({
                 'code':500,
                 'msg':'积分不足，请充值',
                 'success':false
             })
          }
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    listOrders,
    listOrderDetails,
    addOrder
}