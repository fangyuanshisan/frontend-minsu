<template>
  <div class="hamburger-drag">
    <div
      :class="{'is-active':isActive}"
      class="hamburger"
    >
      <i
        class="iconfont icon-hamburger"
        @click="toggleClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-drag {
  display: inline-block;
  text-align: center;

  .hamburger {
    cursor: pointer;
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
    transition: all 0.3s linear;

    .iconfont {
      font-size: 16px;
    }

    &.is-active {
      transform: rotate(0);
    }
  }
}
</style>
