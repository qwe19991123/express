import request from '@/utils/request'
// 模块的项目名称
var siteName = 'http://localhost:3000'
// 订单列表
export function getList(params) {
  return request({
    url: siteName + '/order/listOrders',
    method: 'get',
    params
  })
}
// 订单详情
export function listOrderDetails(params) {
  return request({
    url: siteName + '/order/listOrderDetails',
    method: 'get',
    params
  })
}
