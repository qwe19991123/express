import request from '@/utils/request'
// 模块的项目名称
var siteName = 'http://localhost:3000'
// 本月新增
export function getMouthList(params) {
  return request({
    url: siteName + '/home/findMatterMonth',
    method: 'get',
    params
  })
}
// 本日新增
export function getDayList(params) {
  return request({
    url: siteName + '/home/findMatterToDay',
    method: 'get',
    params
  })
}
// 分类情况
export function findCateNum(params) {
  return request({
    url: siteName + '/home/findCateNum',
    method: 'get',
    params
  })
}
// 本周订单
export function findMatterOrderWeek(params) {
  return request({
    url: siteName + '/home/findMatterOrderWeek',
    method: 'get',
    params
  })
}
