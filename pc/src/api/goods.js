import request from '@/utils/request'

var sitName = 'http://localhost:3000'

var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
var userName = JSON.parse(sessionStorage.getItem('userName'))
// 列表查询
export function getList(params) {
  var _date = {
    ...params,
    pageNum:params.page,
    pageSize:params.limit,
    loginAccount:loginAccount
  }
  return request({
    url: sitName+'/goods/listGoods',
    method: 'post',
    data: _date
  })
}

// 创建商品
export function addGood(params) {
  var _data = {
    ...params,
    loginAccount:loginAccount,
    userName:userName
  }
  return request({
    url: sitName+'/goods/addGoods',
    method: 'post',
    data: _data
  })
}

// 更新商品
export function updateGood(params) {
  var _data = {
    ...params,
    loginAccount:loginAccount
  }
  return request({
    url: sitName+'/goods/updateGoodsInfo',
    method: 'post',
    data: _data
  })
}

// 删除商品
export function deletGood(params) {
  var _params ={
    ...params,
    loginAccount:loginAccount
  }
  return request({
    url: sitName+'/goods/deleteGoods',
    method: 'get',
    params: _params
  })
}

// 详情
export function findGood(params) {
  return request({
    url: sitName+'/goods/findGoodsBySkuCode',
    method: 'get',
    params
  })
}

// 查询全部信息编码
export function getBusiness(params) {
  return request({
    url: sitName+'/goods/listBusiness',
    method: 'get',
    params
  })
}

// 更新商品状态
export function updateSkuStus(params) {
  var _params ={
    ...params,
    loginAccount:loginAccount
  }
  return request({
    url: sitName+'/goods/updateGoodsStatus',
    method: 'get',
    params: _params
  })
}

// // 上传图片
// export function uploadImage(params) {
//   console.log(params);
//   debugger
//   return request({
//     url: sitName+'/goods/uploadImage',
//     method: 'post',
//     data:params
//   })
// }
