export default {
  namespaced: true,
  actions: {

  },
  mutations: {
  //获取用户基本信息
  updateUserInfo(state,userinfo){
    state.userinfo = userinfo
    this.commit('m_user/saveUserInfoToStorage')
  },
  //将userinfo持久化
  saveUserInfoToStorage(state){
    uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
  },
  //更新用户token
  updateUserToken(state,token){
    state.token = token
    this.commit('m_user/saveUserToken')
  },
  //持久化保存用户token
  saveUserToken(state){
    uni.setStorageSync('token',state.token)
  }
  },
  state: () => ({
    token:uni.getStorageSync('token') || '',
    userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),
  getters: {}
}
