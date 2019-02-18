<template>
  <div>
    <i
      class="iconfont icon-refresh"
      @click="click"
    />
  </div>
</template>
<script>

export default {
  methods: {
    click() {
      location.reload()
    }
  }
}
</script>
