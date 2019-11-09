import {defaultRouter, addRouter} from '@/router/index'
import store from '../index'

const routerData = {
  state: {
    routers: [],
    addRouters: [],
    btns:[],
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers  // 保存动态路由用来addRouter
      state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    },
    setBtns:(state,btns)=>{
      state.btns = btns;
    }
  },
  actions: {
    newRoutes({commit}, perRouter) {
      //  通过递归路由表，删除掉没有权限的路由
      function eachSelect (routers, userRole) {
        for (let j = 0; j < routers.length; j++) {
          if (routers[j].r_id && userRole.indexOf(routers[j].r_id) === -1) {
            routers.splice(j, 1)
            j = j - 1
          }
          if (routers[j] && routers[j].children && routers[j].children.length) {
            eachSelect(routers[j].children, userRole)
            if (!routers[j].children.length){
              routers.splice(j, 1)
              j = j - 1
            }
          }
        }
      }
      if (store.getters.info.roleName !== '管理员') {
        eachSelect(addRouter, perRouter)
      }
      commit('setRouters', addRouter)
      var btns = perRouter.filter((item)=>{
          item = item+"";
          return item.indexOf('8')===0;
      });
      commit('setBtns', btns)

    }
  }
}

export default routerData
