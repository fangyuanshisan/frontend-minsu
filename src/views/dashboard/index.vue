<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import adminDashboard from './admin/index'

export default {
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  position: relative;
  .filter-bar {
    position: absolute;
    top: -40px;
    right: 0;
    margin-bottom: 0;
  }
}
</style>
