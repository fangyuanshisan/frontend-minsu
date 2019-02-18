<template>
  <div class="scroll-bar">
    <router-link
      to="/todoList"
      class="message-icon"
    >
      <el-badge
        :value="6"
        class="mark"
      />
      <span class="icon">
        <i class="iconfont icon-message" />
      </span>
    </router-link>
    <div class="scroll-area">
      <div class="scroll">
        <template v-for="(item, index) in marqueeData">
          <router-link
            :to="item.url"
            :key="index"
            class="scroll-content"
          >{{ item.content }}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // name: 'VueMarquee',
  props: {
    marqueeData: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['mark'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/mixin';
.scroll-bar {
  position: relative;
  padding-left: 58px;
  height: 58px;
  width: 100%;
  min-width: 320px;
  overflow: hidden;
  .message-icon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 58px;
    text-align: center;
    cursor: pointer;
    .icon {
      display: block;
      -webkit-animation: blinking 0.6s linear infinite;
      animation: blinking 0.6s linear infinite;
      &:hover {
        animation-play-state: paused;
      }
    }
    .iconfont {
      font-size: 24px;
      line-height: 58px;
      color: #ff9742;
    }
    .el-badge {
      position: absolute;
      top: 12px;
      left: 70%;
      z-index: 1002;
      animation: zoomInOut 0.8s ease-in-out;
    }
  }
}
.scroll-area {
  position: relative;
  height: 58px;
  width: 100%;
  overflow: hidden;
}
.scroll {
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  position: absolute;
  width: 50%;
  left: 100%;
  top: 0px;
  line-height: 58px;
  display: block;
  white-space: nowrap;
  $an1: (
    transform: translate(0%)
  );
  $an2: (
    transform: translate(-300%)
  );
  $demo: (
    0%: $an1,
    100%: $an2
  );
  @include keyframes(todayScroll, $demo);
  @include animation(todayScroll 12s linear infinite);
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
}
.scroll-content {
  margin-right: 3em;
  display: inline-block;
  font-size: 16px;
  line-height: 58px;
  color: rgba(255, 255, 255, 0.6);
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
}
.scroll-area:hover .scroll {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}
</style>

