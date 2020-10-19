const dbCongif = require('../util/dbconfig')
// 商品分类树
findCateGoryTree = (req,res)=>{
    let sql = `select * from cate_first`
    let sqlArr=[]
    let callBack = (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                'code':1,
                'msg':'出错了',
                'success':false
            })
        }else{
            let data1 = data
           let sql = `select * from cate_second`
           let sqlArr = []
           let callBack =(err, data)=>{
               if(err){
                   console.log(err);
                   
                res.send({
                    'code':0,
                    'msg':'出错了',
                    'success':false
                    })
               }else{
                let arryNew = []
                let a=[]
                data1.map((item, index) => {
                    a=[]
                  data.map((item1,index1)=>{
                      for(let i=0;i<data1.length;i++){
                        if(item1.parentCateCode === item.cateCode&&index===i){ 
                            a.push(item1)      
                        }
                      }
                  })   
                  arryNew.push(Object.assign({}, item, { attribute: a }))  
                })
                res.send({
                 'code':1,
                 'data':arryNew,
                 'success':true
                 })
               }
           }
           dbCongif.sqlConnect(sql,sqlArr,callBack)
           
    }
  }
  dbCongif.sqlConnect(sql,sqlArr,callBack)
}
// 添加分类
addCateGory = (req,res) =>{
    let cateName = req.body.cateName
    let remark = req.body.remark
    let id = req.body.id
    let createdTime = req.body.createTime
    let createdBy = req.body.createBy
    let parentCateCode = req.body.parentCateCode
    let parentCateName = req.body.parentCateName
    let thisDate =new Date()
    if(parentCateCode == ''){
        let sql = `insert into cate_first (cateName,remark,id,createdTime,createdBy,level,createdTime) values (?,?,?,?,?,?,?) `
        let sqlArr = [cateName,remark,id,createdTime,createdBy,1,thisDate]
        let callBack = (err,data)=>{
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
    }else{
        let sql = `insert into cate_second (cateName,remark,id,createdTime,createdBy,parentCateCode,parentCateName,level) values (?,?,?,?,?,?,?,?) `
        let sqlArr = [cateName,remark,id,createdTime,createdBy,parentCateCode,parentCateName,2]
        let callBack = (err,data)=>{
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
//修改分类
updateCateGory = (req,res)=>{
    let cateName = req.body.cateName
    let cateCode = req.body.cateCode
    let parentCateCode = req.body.parentCateCode
    let remark = req.body.remark
    if(parentCateCode == ''){
       let sql = `update cate_first set cateName=?,remark=? where cateCode=?`
       let sqlArr=[cateName,remark,cateCode]
       let callBack = (err,data)=>{
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
                'msg':'修改成功',
                'success':true
            })
           }
       }
       dbCongif.sqlConnect(sql,sqlArr,callBack)
    }else{
        let sql = `update cate_second set cateName=?,remark=? where cateCode=?`
        let sqlArr=[cateName,remark,cateCode]
        let callBack = (err,data)=>{
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
                 'msg':'修改成功',
                 'success':true
             })
            }
        }
        dbCongif.sqlConnect(sql,sqlArr,callBack)
    }
}
//分类详情
findCateGoryByCode = (req,res)=>{
  let cateCode = req.query.cateCode
  let level = req.query.level
  if(level==1){
    let sql=`select * from cate_first where cateCode=?`
    let sqlArr=[cateCode]
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
  }else if(level ==2){
      let sql=`select * from cate_second where cateCode=?`
    let sqlArr=[cateCode]
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
  }else{
      res.send({
          'code':0,
          'msg':'level错了',
          'success':false
      })
  }
}
//删除分类
deleteMenuBycode = (req,res)=>{
    let cateGoryCode = req.query.cateCode
    let level = req.query.level
    if(level==1){
        let sql = `delete from cate_first where cateCode=?`
        let sqlArr= [cateGoryCode]
        let callBack = (err,data)=>{
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
    }else if(level==2){
        let sql = `delete from cate_second where cateCode=?`
        let sqlArr= [cateGoryCode]
        let callBack = (err,data)=>{
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
    }else{
        res.send({
            'code':0,
            'msg':'level错了',
            'success':false
        })
    }
}

module.exports = {
    findCateGoryTree,
    addCateGory,
    updateCateGory,
    findCateGoryByCode,
    deleteMenuBycode
}