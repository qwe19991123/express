import request from '@/utils/request'

var siteName = 'http://localhost:3000'

export function loginout(params) {
  return request({
    url: siteName + '/customer/loginOut',
    method: 'get',
    params
  })
}
// pc用户登录
export function login(params) {
  return request({
    url: siteName +'/customer/login',
    method: 'post',
    data:params
  })
}

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

// 修改用户信息
export function updateCustomerById(params) {
  return request({
    url: siteName + '/customer/updateCustomerById',
    method: 'post',
    data:params
  })
}

// 软删除用户
export function deleteCustomer(params) {
  return request({
    url: siteName + '/customer/deleteCustomer',
    method: 'get',
    params
  })
}

// 修改密码接口
export function updatapwd(params) {
  return request({
    url: siteName + '/customer/updatePwd',
    method: 'get',
    params
  })
}
