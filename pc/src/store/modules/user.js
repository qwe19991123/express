import { login, loginout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 保存用户信息
  SET_USER_INFO:(state, data) => {
    state.userInfo = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    // 可以处理同步请求
    return new Promise((resolve, reject) => {
      var _params = {
        "userAccount": username,
        "password": password,
        // pc端用户 1
        "isAdmin": "1"
      }
      login(_params).then(response => {
        const { data } = response
        // 使用框架的管理员权限 如果后台有权限定义则需要改造
        data[0].token = 'admin-token'
        commit('SET_TOKEN', data[0].token)
        setToken(data.token)
        // 把用户信息保存在store中
        // 用户名
        commit('SET_NAME', data[0].userName)
        // 头像
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        // 其余信息保存
        commit('SET_USER_INFO',data[0])
        // 再把信息保存在 本地 以便页面刷新时候也可以调用
        sessionStorage.setItem('loginAccount',JSON.stringify(data[0].userAccount))
        sessionStorage.setItem('userId',JSON.stringify(data[0].id))
        sessionStorage.setItem('userName',JSON.stringify(data[0].userName))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // 用自己写的接口
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    debugger
    var _params = {
      userAccount:JSON.parse(sessionStorage.getItem('loginAccount'))
    }
    return new Promise((resolve, reject) => {
      loginout(_params).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

