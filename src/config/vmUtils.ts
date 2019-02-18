export default function install(Vue: any) {
  Vue.prototype.vmUtils = {
    _routerNext(routerName: string, routerParams?: object) {
      return routerParams
        ? {
            name: routerName,
            params: routerParams
          }
        : {
            name: routerName
          }
    }
  }
}
