import { signOut, getUserInfo } from '@/api/signIn'
import { userType } from '../mutation-types'
import configCode from '@/configCode'
const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

// 解构
const {
  SET_FIRST_TIME,
  SET_AUDIT_CONTENT,
  SET_ADMIN_ID,
  SET_ADMIN_AVATAR,
  SET_ADMIN_NAME,
  SET_ROLESID,
  SET_COMPANY_ID,
  SET_ADMIN_TYPE,
  SET_SETTING
} = userType

export default {
  state: {
    // 平台信息
    firstTime: '',
    auditContent: '',
    // 企业信息
    companyId: '',
    // 账号类型
    adminType: '',
    // 人员信息
    adminInfo: {
      adminId: '', // 管理员Id
      auditState: '', // 账号状态
      newGuidanceState: '' // 新手指引状态
    },
    adminName: '',
    adminAvatar: '',
    // 权限
    rolesId: '',
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    // 平台信息
    [SET_FIRST_TIME](state, payload) {
      state.firstTime = payload.newGuidance
    },
    [SET_AUDIT_CONTENT](state, payload) {
      state.auditContent = payload.content
    },
    [SET_SETTING](state, payload) {
      state.setting = payload.setting
    },
    // 企业信息
    [SET_COMPANY_ID](state, payload) {
      state.companyId = payload.companyId
    },
    // 账号类型
    [SET_ADMIN_TYPE](state, payload) {
      state.adminType = payload.adminType
    },
    // 人员信息
    [SET_ADMIN_ID](state, payload) {
      state.adminInfo = payload.adminInfo
    },
    [SET_ADMIN_AVATAR](state, payload) {
      state.adminAvatar = payload.adminAvatar
    },
    [SET_ADMIN_NAME](state, payload) {
      state.adminName = payload.adminName
    },
    // 权限
    [SET_ROLESID](state, payload) {
      state.rolesId = payload.rolesId
    }
  },

  actions: {
    SetAuditContent({ commit, state }, data) {
      const { content } = data
      commit({
        type: 'SET_AUDIT_CONTENT',
        content: content
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        return getUserInfo().then(response => {
          const status = parseInt(response.data.status)
          if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
            const data = response.data.data
            commit({
              type: 'SET_FIRST_TIME',
              newGuidance: data.newGuidance // 新手指引
            })

            // 权限
            commit({
              type: 'SET_ROLESID',
              rolesId: data.id
            })

            // 企业信息
            commit({
              type: 'SET_COMPANY_ID',
              companyId: data.companyId // 企业Id
            })

            // 账号类型
            commit({
              type: 'SET_ADMIN_TYPE',
              adminType: parseInt(data.type) // 0个人 | 1 企业
            })

            // 管理员信息
            commit({
              type: 'SET_ADMIN_ID',
              adminInfo: {
                adminId: data.personnelInfo.id, // 管理员Id
                auditState: parseInt(data.auditState, 10), // 账号状态
                newGuidanceState: parseInt(data.newGuidance, 10) // 新手指引状态
              }
            })
            commit({
              type: 'SET_ADMIN_NAME',
              adminName: data.personnelInfo.name
            })
            commit({
              type: 'SET_ADMIN_AVATAR',
              adminAvatar: data.personnelInfo.avatar
            })
          }
          resolve(response)
        })
      })
    },

    SignOut({ commit }) {
      return new Promise((resolve, reject) => {
        signOut().then(
          response => {
            const status = parseInt(response.data.status)
            if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
              resolve()
            }
            resolve()
          },
          error => {
            reject(error)
          }
        )
      })
    }
  }
}
