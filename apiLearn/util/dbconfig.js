const mysql = require('mysql')
module.exports = {
    //数据库配置
    config:{
        host: 'localhost',
        user: 'root',
        port:'3306',
        password: '123456',
        database: 'express'
    },
    //链接数据库，使用mysql连接池链接方式
    //连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('连接失败');                
                return;
            }
            //事件驱动回调
            conn.query(sql,sqlArr,callBack);
            //释放连接
            pool.releaseConnection(conn);
            
        })
    },
    //promise回调
    SySqlConnect:function(sySql,sqlArr){
        return new Promise((resolve,reject)=>{
            var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                reject(err)
            }else{
                 //事件驱动回调
            conn.query(sySql,sqlArr,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            });
            //释放连接
            pool.releaseConnection(conn);
            }           
        })
        }).catch((err)=>{
            console.log(err);
        })
    }
}