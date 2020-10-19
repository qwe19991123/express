import request from '@/utils/request'
// 模块的项目名称
var siteName = 'http://localhost:3000'
// 后台用户列表
export function getList(params) {
  return request({
    url: siteName + '/customer/listCustomers',
    method: 'post',
    data:params
  })
}
// 获取用户详情
export function getCustomerDetail(params) {
  return request({
    url: siteName + '/customer/findCustomerById',
    method: 'get',
    params
  })
}
