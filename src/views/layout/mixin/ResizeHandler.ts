import store from '@/store'
import { Component, Vue, Watch } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    methodFromMixins(value: number | string): void // 记得声明一下，要不然会报错 Property 'methodFromMixins' does not exist on type 'App'.
  }
}

const { body } = document
const WIDTH = 1024
const RATIO = 3

@Component
export default class Mixins extends Vue {
  @Watch('$route')
  beforeMount(): void {
    window.addEventListener('resize', this.resizeHandler)
  }
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  }
  isMobile(): boolean {
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }
  resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        store.dispatch('closeSideBar', { withoutAnimation: true })
      }
    }
  }
}
