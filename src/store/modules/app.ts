import Cookies from 'js-cookie'
import { appType } from '../mutation-types'

// 解构
const {
  TOGGLE_SIDEBAR,
  SIDEBAR_STATUS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_DEVICE,
  PAGE_LOADING,
  SET_LANGUAGE,
  SET_THEME
} = appType

interface IState {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  sidebarStatus: boolean,
  device: string,
  isLoading: boolean,
  language: string,
  theme: string
}

interface ICommit {
  commit: any
}

interface ISideBarStatusParams {
  open: boolean
}

export default {
  state: {
    sidebar: {
      opened: !Number(Cookies.get('sidebarStatus')),
      withoutAnimation: false
    },
    sidebarStatus: true, // true -> 开启侧导航点击状态   false -> 关闭侧导航点击状态
    device: 'desktop',
    isLoading: false,
    language: Cookies.get('language') || 'zh',
    theme: Cookies.get('clientTheme') || 'bee'
  },
  mutations: {
    [TOGGLE_SIDEBAR](state: IState) {
      if (state.sidebarStatus) {
        // 开启侧导航
        if (state.sidebar.opened) {
          Cookies.set('sidebarStatus', 1) // 0=开启 1=关闭
        } else {
          Cookies.set('sidebarStatus', 0)
        }
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    [OPEN_SIDEBAR](state: IState) {
      state.sidebar.opened = true
      state.sidebar.withoutAnimation = false
    },
    [SIDEBAR_STATUS](state: IState, payload) {
      state.sidebarStatus = payload.open
    },
    [CLOSE_SIDEBAR](state: IState, payload) {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = payload.withoutAnimation
    },
    [TOGGLE_DEVICE](state: IState, payload) {
      state.device = payload.device
    },
    [PAGE_LOADING](state: IState, payload) {
      state.isLoading = payload.isLoading
    },
    [SET_LANGUAGE](state: IState, payload) {
      state.language = payload.language
      Cookies.set('language', payload.language)
    },
    [SET_THEME](state: IState, payload) {
      state.theme = payload.theme
      Cookies.set('clientTheme', payload.theme)
    }
  },
  actions: {
    toggleSideBar({ commit }: ICommit): void {
      commit('TOGGLE_SIDEBAR')
    },
    sideBarStatus({ commit }: ICommit,  ): void {
      const {  } = status
      commit({
        type: 'SIDEBAR_STATUS',
        open: open
      })
    },
    closeSideBar({ commit }, { withoutAnimation }): void {
      commit({
        type: 'CLOSE_SIDEBAR',
        withoutAnimation: withoutAnimation
      })
    },
    openSideBar({ commit }): void {
      commit('OPEN_SIDEBAR')
    },
    toggleDevice({ commit }, device: string): void {
      commit({
        type: 'TOGGLE_DEVICE',
        device: device
      })
    },
    pageLoading({ commit }, isLoading: boolean): void {
      commit({
        type: 'PAGE_LOADING',
        isLoading: isLoading
      })
    },
    setLanguage({ commit }, language: string): void {
      commit({
        type: 'SET_LANGUAGE',
        language: language
      })
    },
    setTheme({ commit }, theme: string): void {
      commit({
        type: 'SET_THEME',
        theme: theme
      })
    }
  }
}
