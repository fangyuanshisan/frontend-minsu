<template>
  <div class="tabs-side-menu">
    <i
      :title="$t('form.close')"
      class="el-icon-close icon-close"
      @click="goBack"
    />
  </div>
</template>

<script>
export default {
  // name: 'GoBack',
  methods: {
    goBack() {
      return window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>