<template>
  <div
    :class="[infoOutsideClass]"
    class="progress-wrap"
  >
    <div
      :class="[stripedClass, animatedClass, sizeClass]"
      class="progress"
    >
      <div
        :class="[typeClass, sizeClass]"
        :style="{width: percent + '%'}"
        class="progress-bar"
      >
        <span
          v-if="showinfo"
          class="progress-info"
        >{{ info }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: ''
    },
    percent: {
      type: Number,
      required: true,
      default: 0,
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    showinfo: {
      type: Boolean,
      default: false
    },
    infoInside: {
      type: Boolean,
      default: true,
    },
    format: {
      type: Function,
      default(percent) { return `${percent}%` },
    },
  },
  data() {
    return {
      info: '',
    }
  },
  computed: {
    typeClass() {
      return this.type ? `is-${this.type}` : null
    },
    sizeClass() {
      return this.size ? `is-${this.size}` : null
    },
    stripedClass() {
      return this.striped ? 'progress-striped' : null
    },
    animatedClass() {
      return this.animated ? 'animated' : null
    },
    infoOutsideClass() {
      return this.infoInside ? null : 'info-outside'
    },
  },
  watch: {
    percent(val) {
      this.info = this.format(val)
    },
  },
  mounted() {
    this.info = this.format(this.percent)
  },
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
//
// Variables
// --------------------------------------------------

// init
// init
$blue: #3c81df;
$turquoise: #00c0ef;
$red: #f56954;
$green: #6cc788;
$orange: #f2a654;
$purple: #926dde;
$yellow: #f39c12;

$background-color: #fff;

$family-sans-serif: "Alright Sans LP", "Avenir Next", "Helvetica Neue",
  Helvetica, Arial, "PingFang SC", "Source Han Sans SC", "Hiragino Sans GB",
  "Microsoft YaHei", "WenQuanYi MicroHei", sans-serif;

// Override
$primary: $blue;
$info: $turquoise;
$danger: $red;
$warning: $yellow;
$success: $green;

$family-primary: $family-sans-serif;

$body-background: $background-color;

// Font Colors
$font-light: #9e9e9e;
$font: #76838f;
$font-dark: #5e6a76;
$font-darker: #212121;

// Animation
$transition-speed: 0.3s;

.progress-wrap {
  position: relative;
  &.info-outside {
    margin-right: 40px;
    .progress-info {
      position: absolute;
      right: -40px;
      color: $info;
    }
  }
}
.progress {
  display: block;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.065);
}
.progress-bar {
  display: inline-block;
  float: left;
  height: 100%;
  text-align: center;
  border-radius: 0.25rem;
  background-color: #0074d9;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.9);
  -webkit-transition: width 0.6s ease;
  transition: width 0.6s ease;
  &.is-info {
    background-color: $info;
  }
  &.is-danger {
    background-color: $danger;
  }
  &.is-danger {
    background-color: $danger;
  }
  &.is-warning {
    background-color: $warning;
  }
  &.is-success {
    background-color: $success;
  }
  &.is-large {
    font-size: 1em;
  }
}
.progress-bar-striped,
.progress-striped .progress-bar {
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-image: -o-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  -webkit-background-size: 40px 40px;
  background-size: 40px 40px;
}
.progress-bar.animated,
.progress.animated .progress-bar {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
}
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@-o-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>