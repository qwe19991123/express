import request from '@/utils/request'
// 模块项目
var siteName = 'http://localhost:3000'
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// 查询
export function getCate(params) {
  return request({
    url: siteName + '/cateGory/findCateGoryTree',
    method: 'get',
    params
  })
}
// 新增
export function addCateGory(params) {
  var _data = {
    ...params,
    parentCateCode:params.fontChoseCateCode,
    loginAccount:loginAccount
  }
  return request({
    url: siteName + '/cateGory/addCateGory',
    method: 'post',
    data:_data
  })
}

// 查询详情

export function findCateGoryByCode(params) {
  return request({
    url: siteName+'/cateGory/findCateGoryByCode',
    method: 'get',
    params
  })
}
// 修改
export function updateCateGory(params) {
  var _data = {
    ...params,
    loginAccount:loginAccount
  }
  return request({
    url:  siteName + '/cateGory/updateCateGory',
    method: 'post',
    data:_data
  })
}
// 删除

export function deleteGory(params) {
  return request({
    url:  siteName + '/cateGory/deleteMenuBycode',
    method: 'get',
    params
  })
}
