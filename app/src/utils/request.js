import axios from 'axios'

// 后台地址。联调时候写自己的地址
var BASE_URL = '/api'
// 创建链接服务
const service = axios.create({
  // 全局地址
  // baseURL: BASE_URL, // url = base url + request url
  // 等待时间
  timeout: 10000 // request timeout
})

// 请求后返回的数据拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // 0失败 1成功 500异常
    if (res.code !== 1) {
      console.log('请求失败',res.msg || '没有返回信息')
      if(res.code ===0||res.code ===500){
        return res
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('网络不通' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
