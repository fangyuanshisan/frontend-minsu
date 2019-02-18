<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      mode="vertical"
    >
      <sidebar-item :routes="permissionRouters" />
    </el-menu>
    <div class="copy">
      <a
        href="https://www.qixinyun.com/index.html"
        target="_blank"
      >{{ $t('route.support') }}</a>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    routes() {
      return !this.$store.getters.firstTime ? this.$router.options.routes : []
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
