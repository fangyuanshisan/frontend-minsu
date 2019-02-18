import { getPermission } from '@/api/personalCenter'
import { asyncRouterMap, constantRouterMap } from '@/router'

import { Message } from 'element-ui'

import configCode from '@/configCode'
import configPrompt from '@/configPrompt'
const {
  permissionMap,
  HTTP_RESPONSE_STATUS_SUCCESS,
  NO_PERMISSION_STATE
} = configCode
const { ER_NO_PERMISSION, ER_PERMISSION } = configPrompt

function filterAsyncRouter(asyncRouterMap, _modelPermissionId) {
  return asyncRouterMap.filter(route => {
    if (route.roleId === 0 || _modelPermissionId.indexOf(route.roleId) > -1) {
      return true
    } else {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, _modelPermissionId)
        if (route.children.length) {
          return true
        }
        return false
      }
      return false
    }
  })
}

function generatePermission(data) {
  const obj = {
    modelPermission: [],
    modelOperationPermission: {}
  }
  data.forEach(item => {
    obj.modelPermission.push(item.id)
    if (
      permissionMap[item.id] &&
      Array.isArray(item.child) &&
      item.child.length
    ) {
      obj.modelOperationPermission[permissionMap[item.id]] = item.child.map(
        ele => ele.webname
      )
    }
  })
  return obj
}

const permission = {
  state: {
    hasCachePermission: false,
    permission: {
      modelPermission: [],
      modelOperationPermission: {}
    },
    routers: constantRouterMap
  },
  mutations: {
    SET_PERMISSION_CACHE: (state, payload) => {
      state.hasCachePermission = payload.hasCachePermission
    },
    SET_PERMISSION: (state, payload) => {
      state.permission = payload.permission
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GetPermisison({ commit }) {
      return new Promise(resolve => {
        getPermission().then(response => {
          const status = parseInt(response.data.status, 10)
          if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
            const data = response.data.data
            const permission = generatePermission(data)
            commit({
              type: 'SET_PERMISSION_CACHE',
              hasCachePermission: true
            })
            commit({
              type: 'SET_PERMISSION',
              permission: permission
            })
            resolve(permission)
          } else {
            const code = String(response.data.data.id)
            if (code === NO_PERMISSION_STATE) {
              const permission = {
                modelPermission: [],
                modelOperationPermission: {}
              }
              Message({
                type: 'error',
                message: ER_NO_PERMISSION
              })
              commit({
                type: 'SET_PERMISSION_CACHE',
                hasCachePermission: true
              })
              commit({
                type: 'SET_PERMISSION',
                permission: permission
              })
              resolve(permission)
            } else {
              Message({
                type: 'error',
                message: ER_PERMISSION
              })
            }
          }
        })
      })
    },
    GenerateRoutes({ commit }, data) {
      const { _permission } = data
      let accessedRouters = null
      return new Promise(resolve => {
        accessedRouters = filterAsyncRouter(
          asyncRouterMap,
          _permission.modelPermission
        )
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
