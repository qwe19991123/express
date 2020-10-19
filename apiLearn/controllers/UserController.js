const dbCongif = require('../util/dbconfig')
// let redis = require('redis'),
// RDS_PORT = 6379,        //端口号
// RDS_HOST = '127.0.1.1',    //服务器IP
// RDS_OPTS = {RDS_PWD : '123456'},            //设置项
// client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
// 注册
addCustomer=(req,res)=>{    
    let userAccount = req.body.userAccount
    let userName = req.body.userName
    let userSex = req.body.userSex
    let phone = req.body.phone
    let idCard = req.body.idCard
    let password = req.body.password
    let frontScore = req.body.frontScore
    let isAdmin = req.body.isAdmin
    let thisDate = new Date()
    //如果注册账号 手机号已存在 返回账号手机号已存在 请重新注册 不然注册成功
    if(isAdmin == 0){
        let sql = `insert into appuser(userAccount,userName,userSex,phone,idCard,password,frontScore,isAdmin,isDelete,createTime) value(?,?,?,?,?,?,?,?,?,?)`
        let sqlArr = [userAccount, userName,userSex, phone, idCard,password,frontScore,isAdmin,0,thisDate] 
        let callBack = (err) => {
            if (err) {
                console.log(err);
                res.send({
                            'code': 0,
                            'msg': '用户名或手机号已存在,请重新注册',
                            'success': false
                        })
            } else {
                let sql = `insert into appuserinfo(userAccount,userName,userSex,phone,idCard,password,frontScore,isAdmin,isDelete) values(?,?,?,?,?,?,?,?,?)`
                let sqlArr = [userAccount, userName,userSex, phone, idCard,password,frontScore,isAdmin,0]
                let callBack=(err,data)=>{
                    console.log(456);
                    if(err){
                        console.log(err);
                        res.send({
                            'code': 0,
                            'msg': '出错了',
                            'success': false
                        })
                    }else{
                        console.log(123);
                        res.send({
                            'code': 1,
                            'msg': '注册成功',
                            'success': true
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
            }
        }
        dbCongif.sqlConnect(sql, sqlArr, callBack) 
    }else if(isAdmin == 1){
        let sql = `insert into pcuser(userAccount,userName,userSex,phone,idCard,password,isAdmin,isDelete) value(?,?,?,?,?,?,?,?)`
        let sqlArr = [userAccount, userName,userSex, phone, idCard,password,isAdmin,0] 
        let callBack =  (err) => {
            if (err) {
                console.log(err);
                
                res.send({
                            'code': 0,
                            'msg': '用户名或手机号已存在,请重新注册',
                            'success': false
                        })
            } else {
                let sql = `insert into pcuserinfo(userAccount,userName,userSex,phone,idCard,password,isAdmin,isDelete) values(?,?,?,?,?,?,?,?)`
                let sqlArr = [userAccount, userName,userSex, phone, idCard,password,isAdmin,0]
                let callBack=(err,data)=>{
                    if(err){
                        res.send({
                            'code': 0,
                            'msg': '出错了',
                            'success': false
                        })
                    }else{
                        res.send({
                            'code': 1,
                            'msg': '注册成功',
                            'success': true
                        })
                    }
                }
                dbCongif.sqlConnect(sql,sqlArr,callBack)
            }
        }
        dbCongif.sqlConnect(sql, sqlArr, callBack) 
    }else{
        res.send({
            'code': 0,
            'msg': 'isAdmin传错了',
            'success': false
        })
    }
    }
 
// 登录
login = (req,res)=>{
    let userAccount = req.body.userAccount
    let password = req.body.password
    let isAdmin = req.body.isAdmin
    if(isAdmin == 0){
        let sql = `select * from appuser where userAccount=? and password=? and isDelete=?`
        let sqlArr = [userAccount, password,0]
        let callBack = async (err, data) => {
            if (err) {
                console.log(err);
                res.send({
                    'code': 0,
                    'msg': '出错了'
                })
            } else if (data == '') {
                res.send({
                    'code': 0,
                    'msg': '用户名或者密码出错',
                    'success':false,
                    'data': []
                })
            } else {                
                // client.hmset('appuserinfo_'+data[0].id, data[0])
                // client.hgetall('appuserinfo_'+data[0].id, (err,res)=>{
                //     console.log(res);                          
                // })                                       
                res.send({
                    'code': 1,
                    'msg': '登陆成功',
                    'success':true,
                    'data': data
                })
            }
    }
    dbCongif.sqlConnect(sql, sqlArr, callBack)
    }else if(isAdmin == 1){
        let sql = `select * from pcuser where userAccount=? and password=? and isDelete=?`
        let sqlArr = [userAccount, password,0]
        let callBack = async (err, data) => {
            if (err) {
                console.log(err);
                res.send({
                    'code': 0,
                    'msg': '出错了'
                })
            } else if (data == '') {
                res.send({
                    'code': 0,
                    'msg': '用户名或者密码出错',
                    'data': []
                })
            } else {
                // client.hmset('pcuserinfo_'+data[0].id, data[0])
                // client.hgetall('pcuserinfo_'+data[0].id, (err,res)=>{                     
                // })   
                res.send({
                    'code': 1,
                    'msg': '登陆成功',
                    'data': data
                })
            }
    }
    dbCongif.sqlConnect(sql, sqlArr, callBack)
    }
}
//用户详情
findCustomerById = (req,res)=>{    
    let id = req.query.id
    let isAdmin = req.query.isAdmin    
    if(isAdmin == 0){
        let sql = `select * from appuserinfo where id=? and isDelete=?`
        let sqlArr = [id,0]
        let callBack = async (err,data)=>{                   
            if(err){
                console.log(err);
                
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
        dbCongif.sqlConnect(sql, sqlArr, callBack)
    }else if(isAdmin == 1){
        let sql = `select * from pcuserinfo where id=? and isDelete=?`
        let sqlArr = [id,0]
        let callBack = async (err,data)=>{
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
        dbCongif.sqlConnect(sql, sqlArr, callBack)
    }else{
        res.send({
            'code':0,
            'msg':'isAdmin出错了',
            'success':false,           
     })
    }
}
//修改用户信息
updateCustomerById = (req,res)=>{
    let id = req.body.id
    let userAccount = req.body.userAccount
    let userName = req.body.userName
    let userSex = req.body.userSex
    let phone = req.body.phone
    let idCard = req.body.idCard
    let password = req.body.password
    let sql = `update pcuser set userAccount=?,userName=?,userSex=?,phone=?,idCard=?,password=? where id=?`
    let sqlArr=[userAccount,userName,userSex,phone,idCard,password,id]
    let callBack = (err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false,           
            })
        }else{
            let sql = `update pcuserinfo set userAccount=?,userName=?,userSex=?,phone=?,idCard=?,password=? where id=?`
            let sqlArr=[userAccount,userName,userSex,phone,idCard,password,id]
            dbCongif.sqlConnect(sql,sqlArr)
            res.send({
                'code':1,
                'msg':'修改成功',
                'success':true,           
            })
        }

    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
    
}
//查询用户列表
listCustomers = (req,res)=>{
    let isAdmin = req.body.isAdmin
    let userAccount = req.body.userAccount
    let userName = req.body.userName
    if(isAdmin == 0){
        let sql=`select count(1) from appuser where isDelete=?`
        let sqlArr=[0]
        let callBack=(err,data)=>{
            if(err){
                console.log(err);
                
                res.send({
                    'code':0,
                    'msg':'出错了',
                    'success':false
                })
            }else{
                if(userAccount){
                    var a='%'+ userAccount +'%'
                }else{
                    var a='%'
                }
                if(userName){
                    var b='%'+ userName +'%'
                }else{
                    var b='%'
                }
                let data1= JSON.parse(JSON.stringify(data[0]).replace("count(1)","total"));
                let sql=`select * from appuser where isDelete=? and userAccount like ? and userName like ?`
                let sqlArr=[0,a,b]
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
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else if(isAdmin == 1){
        // 返回total 如果有userAccount和userName 查询
        let sql=`select count(1) from pcuser where isDelete=?`
        let sqlArr=[0]
        let callBack=(err,data)=>{
            if(err){
                console.log(err);
                
                res.send({
                    'code':0,
                    'msg':'出错了',
                    'success':false
                })
            }else{
                if(userAccount){
                    var a='%'+ userAccount +'%'
                }else{
                    var a='%'
                }
                if(userName){
                    var b='%'+ userName +'%'
                }else{
                    var b='%'
                }
                let data1= JSON.parse(JSON.stringify(data[0]).replace("count(1)","total"));
                let sql=`select * from pcuser where isDelete=? and userAccount like ? and userName like ?`
                let sqlArr=[0,a,b]
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
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else{
        res.send({
            'code':0,
            'msg':'报错了',
            'success':false
        })
    }
}
//删除用户接口
deleteCustomer = (req,res)=>{
    let id = req.query.id
    let isAdmin = req.query.isAdmin
    if(isAdmin == 0){
        let sql = `update appuser set isDelete=? where id=?`
        let sqlArr = [1,id]
        let callBack = (err ,data)=>{
           if(err){
               res.send({
                   "code":0,
                   "msg":'出错了',
                   "success":false
               })
           }else{
            let sql = `update appuserinfo set isDelete=? where id=?`
            let sqlArr = [1,id]
            dbCongif.sqlConnect(sql,sqlArr)
            res.send({
                "code":1,
                "msg":'修改成功',
                "success":true
            })
           }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else if(isAdmin == 1){
        let sql = `update pcuser set isDelete=? where id=?`
        let sqlArr = [1,id]
        let callBack = (err ,data)=>{
           if(err){
               console.log(err);
               
               res.send({
                   "code":0,
                   "msg":'出错了',
                   "success":false
               })
           }else{
            let sql = `update pcuserinfo set isDelete=? where id=?`
            let sqlArr = [1,id]
            dbCongif.sqlConnect(sql,sqlArr)
            res.send({
                "code":1,
                "msg":'修改成功',
                "success":true
            })
           }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else{
        res.send({
            "code":0,
            "msg":'出错了',
            "success":false
        })
    }
}
//修改密码
updatePwd = (req,res)=>{
    let originPwd = req.query.originPwd
    let newPwd = req.query.newPwd
    let userAccount = req.query.userAccount
    let isAdmin = req.query.isAdmin
    if(isAdmin == 0){
        let sql = `select password from appuser where userAccount=?`
        let sqlArr = [userAccount]
        let callBack = (err,data)=>{
           if(err){
               console.log(err);
               
               res.send({
                   "code":0,
                   "msg":'出错了',
                   "success":false
               })
           }else{
               if(data[0].password == originPwd){
                   let sql=`update appuser set password=? where userAccount=?`
                   let sqlArr=[newPwd,userAccount]
                   let callBack=(err)=>{
                       if(err){
                           console.log(err);
                        res.send({
                            "code":0,
                            "msg":'出错了',
                            "success":false,
                        })
                       }else{
                            res.send({
                                "code":1,
                                "msg":'修改成功,请重新登录',
                                "success":true,
                            })
                       }
                   }
                   dbCongif.sqlConnect(sql,sqlArr,callBack)
               }else{
                    res.send({
                        "code":0,
                        "msg":'原密码错误',
                        "success":false,
                    })
               }
           }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
        
    }else if(isAdmin ==1){
        let sql = `select password from pcuser where userAccount=?`
        let sqlArr = [userAccount]
        let callBack = (err,data)=>{
           if(err){
               console.log(err);
               
               res.send({
                   "code":0,
                   "msg":'出错了',
                   "success":false
               })
           }else{
               if(data[0].password == originPwd){
                   let sql=`update pcuser set password=? where id=?`
                   let sqlArr=[newPwd,userAccount]
                   let callBack=(err)=>{
                       if(err){
                            res.send({
                                "code":0,
                                "msg":'出错了',
                                "success":false,
                            })
                       }else{
                            res.send({
                                "code":1,
                                "msg":'修改成功,请重新登录',
                                "success":true,
                            })
                       }
                   }
                   dbCongif.sqlConnect(sql,sqlArr,callBack)
               }else{
                    res.send({
                        "code":0,
                        "msg":'原密码错误',
                        "success":false,
                    })
               }
           }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else{
        res.send({
            "code":0,
            "msg":'出错了',
            "success":false
        })
    }
}
//充值积分
updateCustomerScore=(req,res)=>{
    let userAccount = req.query.loginAccount
    let score = req.query.addScore
    let sql = `select frontScore from appuser where userAccount=?`
    let sqlArr = [userAccount]
    let callBack = (err,data)=>{
       if(err){
           res.send({
               "code":0,
               "msg":'出错了',
               "success":false
           })
       }else{
           let sql=`update appuser set frontScore=? where userAccount=?`
           let sqlArr=[((+data[0].frontScore)+(+score)),userAccount]  
           let callBack=(err)=>{
               if(err){
                    res.send({
                        "code":0,
                        "msg":'出错了',
                        "success":false
                    })
               }else{
                    res.send({
                        "code":1,
                        "msg":'充值成功',
                        "success":true
                    })
               }
           }         
           dbCongif.sqlConnect(sql,sqlArr,callBack)
           
       }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//登出
loginOut=(req,res)=>{
    let id = req.query.id
    let isAdmin = req.query.isAdmin
    if(isAdmin == 0){
        // client.del('appuserinfo_'+id);
        // client.hgetall('appuserinfo_'+id, (err,res)=>{
        //     console.log(res);                          
        // }) 
        res.send({
            "code":1,
            "msg":'退出成功',
            "success":true
        })
    }else if(isAdmin ==1){
        // client.del('pcuserinfo_'+id);
        // client.hgetall('pcuserinfo_'+id, (err,res)=>{
        //     console.log(res);                          
        // }) 
        res.send({
            "code":1,
            "msg":'退出成功',
            "success":true
        })
    }else{
        res.send({
            "code":0,
            "msg":'出错了',
            "success":false
        })
    }
}
//获取积分
showScore=(req,res)=>{
  let userAccount = req.query.loginAccount
  let sql=`select frontScore from appuser where userAccount=?`
  let sqlArr=[userAccount]
  let callBack=(err,data)=>{
      console.log(err);
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
module.exports = {
    addCustomer,
    login,
    findCustomerById,
    updateCustomerById,
    listCustomers,
    deleteCustomer,
    updatePwd,
    updateCustomerScore,
    loginOut,
    showScore
}
