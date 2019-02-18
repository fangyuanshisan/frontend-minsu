<template>
  <el-header
    class="header-bar"
    height="58px"
  >
    <!-- logo -->
    <router-link
      :title="$t('headerBar.logo')"
      to="/"
      class="logo"
    >{{ $t('headerBar.logo') }}</router-link>
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div
      v-show="device !== 'mobile'"
      class="header-marquee"
    >
    </div>
    <div class="right-menu">
      <!-- 用户信息 -->
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-badge
            v-if="total"
            :value="total"
            class="mark"
          />
          <img
            :src="domain + (adminAvatar ? adminAvatar : defaultAvatar)"
            class="user-avatar"
          >
          <span class="login-user-info">{{ adminName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{ $t('headerBar.dashboard') }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/personalCenter/basicInfo/index">{{ $t('headerBar.personalCenter') }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/todoList">{{ $t('headerBar.todoList') }}
              <el-badge
                v-if="total"
                :value="total"
              />
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <a
              href="javascript:;"
              style="display:block;"
              @click="signOut"
            >{{ $t('headerBar.signOut') }}</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 主题设置 -->
      <theme-select class="right-menu-item" />

      <!-- 更新缓存 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.refresh')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <refresh class="refresh right-menu-item" />
      </el-tooltip>

      <!-- 全屏模式 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.screenfull')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <Screenfull class="screenfull right-menu-item" />
      </el-tooltip>
    </div>
  </el-header>
</template>

<script lang="ts">
import Hamburger from '@/components/Hamburger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import Refresh from '@/components/Refresh/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
// import vueSeamlessScroll from 'vue-seamless-scroll'

import { getMsgTotal } from '@/api/messages'

import configCode from '@/config/configCode'
const { HTTP_RESPONSE_STATUS_SUCCESS, defaultAvatar, DOMAIN } = configCode

import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
// 命名空间
const counterModule = namespace('counter')

@Component({
  components: {
    Hamburger,
    Screenfull,
    Refresh,
    ThemeSelect,
    // vueSeamlessScroll
  }
})
export default class HeaderBar extends Vue {
  @counterModule.Getter('sidebar') public sidebar?: any
  @counterModule.Getter('adminName') public adminName?: string
  @counterModule.Getter('adminAvatar') public adminAvatar?: string
  defaultAvatar: string = defaultAvatar
  domain: string = DOMAIN
  total: number = 0
  get device(): any {
    return this.$store.state.app.device
  }
  get classOption(): any {
    return {
      direction: 2,
      limitMoveNum: 2
    }
  }
  created() {
    this.setLoopAjax()
  }
  setLoopAjax(): void {
    this.getPersonalMsg()
    const self = this
    setInterval(() => {
      self.getPersonalMsg()
    }, 20e3)
  }
  toggleSideBar(): void {
    this.$store.dispatch('toggleSideBar')
  }
  signOut() {
    this.$store.dispatch('SignOut').then(() => {
      // this.$router.push({ path: '/signIn' })
      location.reload()
    })
  }
  getPersonalMsg() {
    getMsgTotal().then(response => {
      const status = response.data.status
      if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
        const data = response.data.data
        this.total = data.total
      }
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.seamless-warp {
  overflow: hidden;
  height: 58px;
  width: 100%;
  ul.item {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: calc(100vw - 506px);
    height: 58px;
    li {
      float: left;
      margin-right: 30px;
      height: 58px;
      line-height: 58px;
      font-size: 16px;
    }
  }
}
</style>
