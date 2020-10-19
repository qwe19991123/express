const dbCongif = require('../util/dbconfig')

//添加轮播图
addBanner=(req,res)=>{
    let images=req.query.picUrl
    let status=req.query.status
    let sql=`insert into banner (images,status) values (?,?)`
    let sqlArr=[images,status]
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
                'msg':'添加成功',
                'success':true
            })
         }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)
}

//轮播图列表
listPic=(req,res)=>{
    let picStatus=req.query.picStatus
    if(picStatus=='1'||picStatus=='2'){
        let sql=`select * from banner where status=?`
        let sqlArr=[picStatus]
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
    }else{
        let sql=`select * from banner`
        let sqlArr=[]
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

} 

//删除轮播图
deletepic=(req,res)=>{
    let id = req.query.id
    let sql=`delete from banner where id=?`
    let sqlArr=[id]
    let callBack=(err,data)=>{
        if(err){
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
            //删除id列 从新添加一列自增主键
            let sql=`alter table banner drop id`
            dbCongif.sqlConnect(sql)
            let sql1=`ALTER TABLE banner ADD id INT NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST`
            let callBack=(err)=>{
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
            dbCongif.sqlConnect(sql1,callBack)
        }
    }
    dbCongif.sqlConnect(sql,sqlArr,callBack)

}

//启用或禁止
changePicStatus=(req,res)=>{
    let id = req.query.id
    let status=req.query.picStatus
    let sql=`select status from banner where id=?`
    let sqlArr=[id]
    let callBack=(err,data)=>{
        if(err){
            console.log(err);
            
            res.send({
                'code':0,
                'msg':'出错了',
                'success':false
            })
        }else{
               let sql=`update banner set status=? where id=?`
               let sqlArr=[status,id]
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
                        'msg':'禁用成功',
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
    addBanner,
    listPic,
    deletepic,
    changePicStatus
}