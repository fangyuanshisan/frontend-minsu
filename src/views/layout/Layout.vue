<template>
  <!-- <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}"> -->
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <header-bar />
    <page-loading />
    <div class="main-container">
      <template v-if="!firstTime">
        <tags-view />
        <sidebar class="sidebar-container" />
      </template>
      <template v-if="name !== 'dashboard'">
        <breadcrumb class="breadcrumb-container" />
        <app-main />
      </template>
      <template v-else>
        <app-main style="margin-top: 13px;" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { HeaderBar, Sidebar, AppMain, TagsView } from './components'
import PageLoading from '@/components/PageLoading/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import ResizeMixin from './mixin/ResizeHandler'

import { Getter, Action, State, namespace } from 'vuex-class'
// 命名空间
const counterModule = namespace('counter')

@Component({
  components: {
    HeaderBar,
    Breadcrumb,
    Sidebar,
    TagsView,
    AppMain,
    PageLoading
  },
  mixins: [ResizeMixin]
})
export default class Layout extends Vue {
  @counterModule.Getter('sidebar') public sidebar?: any
  @counterModule.Getter('device') public device?: any
  @counterModule.Getter('firstTime') public firstTime?: any

  get classObj(): object {
    return {
      hideSidebar: !this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === 'mobile' || this.firstTime // 首次登陆隐藏侧导航
      //  || this.firstTime // 首次登陆隐藏侧导航
    }
  }
  get name(): any {
    return this.$route.name
  }
  handleClickOutside(): void {
    this.$store.dispatch('closeSideBar', { withoutAnimation: false })
  }
  onRouteChanged(route: any, oldRoute: any): void {
    if (this.device === 'mobile' && this.sidebar.opened) {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100%;
  width: 100%;
}

.breadcrumb-container {
  padding-left: 12px;
  height: 48px;
  line-height: 48px;
}
</style>
