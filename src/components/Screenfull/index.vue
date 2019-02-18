<template>
  <div>
    <i
      class="iconfont icon-screenfull"
      @click="click"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
