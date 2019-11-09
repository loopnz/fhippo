import store from '../index'
import router from '../../router/index'
export default {
  state: {
    info: ''  // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    getInfo (state, data) {
      if (data.result && data.result.rightIds){
        data.authorityRouter = data.result.rightIds;
      } else{
        data.authorityRouter = []
      }
      data.result = data.result||{};
      state.info = {
        roleName: data.result.roleName,
        roleId:data.result.roleId,
        name: data.result.fullname,
        authorityRouter: data.authorityRouter,
        avatar: data.result.avatar ? data.result.avatar : "/static/images/logo.png",
        uid: data.result.operatorId
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info))
    },
    // setRole (state, options) {  // 切换角色，测试权限管理
    //   state.info = {
    //     role: options.role,
    //     permissions: options.permissions
    //   }
    //   sessionStorage.setItem('info', JSON.stringify(store.getters.info));
    //   store.dispatch('newRoutes', options.role)
    //   router.addRoutes(store.getters.addRouters)
    //
    // }
  },

  actions: {
    getInfo ({commit}, data) {
      commit('getInfo', data)
    },
    // setRole ({commit}, options){
    //   // 权限测试
    //   commit('setRole', options)
    // }
  }
}
