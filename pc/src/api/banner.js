import request from '@/utils/request'
// 模块的项目名称
var siteName = 'http://localhost:3000'
// 轮播图列表
export function getList(params) {
  return request({
    url: siteName + '/banner/listPic',
    method: 'get',
    params
  })
}
// 添加轮播图
export function addPic(params) {
  return request({
    url: siteName + '/banner/addBanner',
    method: 'get',
    params
  })
}
// 修改轮播图
export function updatePic(params) {
  return request({
    url: siteName + '/banner/changePicStatus',
    method: 'get',
    params
  })
}

//删除
export function deletepic(params) {
  console.log(params);
  return request({
    url: siteName + '/banner/deletepic',
    method: 'get',
    params
  })
}
