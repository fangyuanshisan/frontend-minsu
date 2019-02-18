<template>
  <el-dropdown
    class="theme-setting "
    trigger="click"
    @command="handleSetTheme"
  >
    <span class="el-dropdown-link">
      <i class="iconfont icon-setting" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item command="light" :disabled="theme === 'light'">{{$t('headerBar.light')}}</el-dropdown-item> -->
      <el-dropdown-item
        :disabled="theme === 'rose'"
        command="rose"
      >{{ $t('headerBar.rose') }}</el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'jack'"
        command="jack"
      >{{ $t('headerBar.jack') }}</el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'bee'"
        command="bee"
      >{{ $t('headerBar.bee') }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { changeTheme } from '@/utils'
import configPrompt from '@/config/configPrompt'
export default {
  // name: 'ThemeSelect',
  data() {
    return {}
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  methods: {
    handleSetTheme(themeItem) {
      const app = document.getElementById('app')
      this.$store.dispatch('setTheme', themeItem)
      this.$message({
        message: configPrompt.SUCCESS_THEME_HAS_BEEN_CHANGED,
        type: 'success'
      })
      changeTheme(app, themeItem)
    }
  }
}
</script>
