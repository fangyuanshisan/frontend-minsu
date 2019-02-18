<template>
  <section
    class="app-main"
    style="min-height: 100%"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class AppMain extends Vue {
  get cachedViews(): any {
    return this.$store.state.tagsView.cachedViews;
  }
  get key(): any {
    return typeof this.$route.name !== "undefined"
      ? this.$route.name + Number(new Date())
      : Number(new Date());
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  padding: 0 12px 12px;
}
</style>
