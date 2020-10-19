const dbCongif = require('../util/dbconfig')
const  moment = require('moment')

//一个月新增
findMatterMonth=(req,res)=>{
    function formatDateTime(inputTime) {  
        var date = new Date(inputTime);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;  
        second = second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
        };
        //获取本月第一天零点零分零秒
        var data=new Date();
        data.setDate(1);
        data.setHours(0);
        data.setSeconds(0);
        data.setMinutes(0);
        let stamp=formatDateTime(data.getTime())
        const stamp2 = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1); //获取当天23:59:59的时间
        let sql=`select count(1) from appuser where createTime between ? and ?`
        let sqlArr=[stamp,stamp2]
        let callBack=(err,data)=>{
            if(err){
                console.log(err);
                res.send({
                    'code':0,
                    'msg':'出错了',
                    'success':false
                })
            }else{
                let sql1=`select count(1) from goods where createdTime between ? and ?`
                let sqlArr1=[stamp,stamp2]
                let callBack1=(err,data1)=>{
                    if(err){
                        console.log(err);
                        res.send({
                        'code':0,
                        'msg':'出错了',
                        'success':false
                        })
                    }else{
                        let sql2=`select count(1) from orderlist where createdTime between ? and ?`
                        let sqlArr2=[stamp,stamp2]
                        let callBack2=(err,data2)=>{
                            console.log(data[0]);
                            res.send({
                                "code":1,
                                "success":true,
                                "msg":'查询成功',
                                "data":{
                                    "customerNum":data[0][Object.keys(data[0])[0]],
                                    "goodsNum":data1[0][Object.keys(data1[0])[0]],
                                    "orderNum":data2[0][Object.keys(data2[0])[0]]
                                }

                            })
                        }
                        dbCongif.sqlConnect(sql2,sqlArr2,callBack2)
                    }
                }
                dbCongif.sqlConnect(sql1,sqlArr1,callBack1)
            }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//当天新增
findMatterToDay=(req,res)=>{
const stamp1 = new Date(new Date().setHours(0, 0, 0, 0)); //获取当天零点的时间
const stamp2 = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1); //获取当天23:59:59的时间
let sql=`select count(1) from appuser where createTime between ? and ?`
let sqlArr=[stamp1,stamp2]
let callBack=(err,data)=>{
     if(err){
         console.log(err);
         res.send({
            'code':0,
            'msg':'出错了',
            'success':false
         })
     }else{
        let sql1=`select count(1) from goods where createdTime between ? and ?`
        let sqlArr1=[stamp1,stamp2]
        let callBack1=(err,data1)=>{
            if(err){
                console.log(err);
                res.send({
                   'code':0,
                   'msg':'出错了',
                   'success':false
                })
            }else{
                let sql2=`select count(1) from orderlist where createdTime between ? and ?`
                let sqlArr2=[stamp1,stamp2]
                let callBack2=(err,data2)=>{
                    res.send({
                        "code":1,
                        "success":true,
                        "msg":'查询成功',
                        "data":{
                            "customerNum":data[0][Object.keys(data[0])[0]],
                            "goodsNum":data1[0][Object.keys(data1[0])[0]],
                            "orderNum":data2[0][Object.keys(data2[0])[0]]
                        }

                    })
                }
                dbCongif.sqlConnect(sql2,sqlArr2,callBack2)
            }
        }
        dbCongif.sqlConnect(sql1,sqlArr1,callBack1)
     }
}
dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//一周订单汇总
findMatterOrderWeek=(req,res)=>{
    let Monday = moment().weekday(1).format('YYYY-MM-DD')+" 00:00:00";
    let Tuesday = moment().weekday(2).format('YYYY-MM-DD')+" 00:00:00";
    let Wednesday = moment().weekday(3).format('YYYY-MM-DD')+" 00:00:00";
    let Thursday = moment().weekday(4).format('YYYY-MM-DD')+" 00:00:00";
    let Friday = moment().weekday(5).format('YYYY-MM-DD')+" 00:00:00";
    let Saturday = moment().weekday(6).format('YYYY-MM-DD')+" 00:00:00";
    let Sunday = moment().weekday(7).format('YYYY-MM-DD')+" 00:00:00";
    let sql=`select count(1) from orderlist where createdTime between ? and ?`
    let sqlArr=[Monday,Tuesday]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            let sql1=`select count(1) from orderlist where createdTime between ? and ?`
            let sqlArr1=[Tuesday,Wednesday]
            let callBack1=(err,data1)=>{
                if(err){
                    console.log(err);
                    res.send({
                    'code':0,
                    'msg':'出错了',
                    'success':false
                    })
                }else{
                    let sql2=`select count(1) from orderlist where createdTime between ? and ?`
                    let sqlArr2=[Wednesday,Thursday]
                    let callBack2=(err,data2)=>{
                        let sql3=`select count(1) from orderlist where createdTime between ? and ?`
                        let sqlArr3=[Thursday,Friday]
                        let callBack3=(err,data3)=>{
                            if(err){
                                console.log(err);
                                res.send({
                                'code':0,
                                'msg':'出错了',
                                'success':false
                                })
                            }else{
                                let sql4=`select count(1) from orderlist where createdTime between ? and ?`
                                let sqlArr4=[Thursday,Friday]
                                let callBack4=(err,data4)=>{
                                    if(err){
                                        console.log(err);
                                        res.send({
                                        'code':0,
                                        'msg':'出错了',
                                        'success':false
                                        })
                                    }else{
                                        let sql5=`select count(1) from orderlist where createdTime between ? and ?`
                                        let sqlArr5=[Friday,Saturday]
                                        let callBack5=(err,data5)=>{
                                            let sql6=`select count(1) from orderlist where createdTime between ? and ?`
                                            let sqlArr6=[Saturday,Sunday]
                                            let callBack6=(err,data6)=>{
                                                res.send({
                                                    "code":1,
                                                    "success":true,
                                                    "msg":'查询成功',
                                                    "data":{
                                                        "mondayNum":data[0][Object.keys(data[0])[0]],
                                                        "tuesdayNum":data1[0][Object.keys(data1[0])[0]],
                                                        "wednesdayNum":data2[0][Object.keys(data2[0])[0]],
                                                        "thursdayNum":data3[0][Object.keys(data3[0])[0]],
                                                        "fridayNum":data4[0][Object.keys(data4[0])[0]],
                                                        "saturdayNum":data5[0][Object.keys(data5[0])[0]],
                                                        "sundayNum":data6[0][Object.keys(data6[0])[0]]
                                                    }
                            
                                                })
                                            }
                                            dbCongif.sqlConnect(sql6,sqlArr6,callBack6)
                                        }
                                        dbCongif.sqlConnect(sql5,sqlArr5,callBack5)
                                    }                               
                                }
                                dbCongif.sqlConnect(sql4,sqlArr4,callBack4)
                            }
                        }
                        dbCongif.sqlConnect(sql3,sqlArr3,callBack3)
                    }
                    dbCongif.sqlConnect(sql2,sqlArr2,callBack2)
                }
            }
            dbCongif.sqlConnect(sql1,sqlArr1,callBack1)
        }
    }
dbCongif.sqlConnect(sql,sqlArr,callBack)
}
//每个分类下商品数量
findCateNum = (req,res)=>{
    //怎么实现根据分类数量的变化返回相应的数据 
    let sql=`select cateName from cate_first`
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "code":0,
                "msg":"出错了",
                "success":false
            })
        }else{
                let sql1=`select count(1) from goods where firstCateName = ?`
                let sqlArr1=[data[0].cateName]
                let callBack1=(err,data1)=>{
                    if(err){
                        console.log(err);
                        res.send({
                            "code":0,
                            "msg":"出错了",
                            "success":false
                        })
                    }else{
                        console.log(123);
                        let sql2=`select count(1) from goods where firstCateName = ?`
                        let sqlArr2=[data[1].cateName]
                        let callBack2=(err,data2)=>{
                            if(err){
                                console.log(err);
                                res.send({
                                    "code":0,
                                    "msg":"出错了",
                                    "success":false
                                })
                            }else{
                                let a = {}
                                a[data[0].cateName] = data1[0][Object.keys(data1[0])[0]]
                                let b = {}
                                b[data[1].cateName] = data2[0][Object.keys(data2[0])[0]]
                                let c = []
                                c.push(a)
                                c.push(b)
                                res.send({
                                    "code":1,
                                    "msg":'查询成功',
                                    "success":true,
                                    "data":c
                                    
                                })
                            }
                        }
                        dbCongif.sqlConnect(sql2,sqlArr2,callBack2)
                    }
                
            }
            dbCongif.sqlConnect(sql1,sqlArr1,callBack1)
        }
    }
    dbCongif.sqlConnect(sql,callBack)
}
module.exports = {
    findMatterMonth,
    findMatterToDay,
    findMatterOrderWeek,
    findCateNum
    
}