const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  isLoading: state => state.app.isLoading,
  theme: state => state.app.theme,
  device: state => state.app.device,
  sidebarStatus: state => state.app.sidebarStatus,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  firstTime: state => state.user.firstTime,
  auditContent: state => state.user.auditContent,
  adminInfo: state => state.user.adminInfo,
  adminAvatar: state => state.user.adminAvatar,
  adminName: state => state.user.adminName,
  rolesId: state => state.user.rolesId,
  setting: state => state.user.setting,
  companyId: state => state.user.companyId,
  adminType: state => state.user.adminType,

  hasCachePermission: state => state.permission.hasCachePermission,
  permission: state => state.permission.permission,
  permissionRouters: state => state.permission.routers,

  errorLogs: state => state.errorLog.logs,

  mark: state => state.system.mark
}
export default getters
