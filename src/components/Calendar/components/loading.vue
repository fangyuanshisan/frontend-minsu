<template>
  <div class="loading-wrapper">
    <div class="_loadBgCon">
      <div class="wrapper">
        <div
          id="wBall_1"
          class="wBall"
        >
          <div class="wInnerBall" />
        </div>
        <div
          id="wBall_2"
          class="wBall"
        >
          <div class="wInnerBall" />
        </div>
        <div
          id="wBall_3"
          class="wBall"
        >
          <div class="wInnerBall" />
        </div>
        <div
          id="wBall_4"
          class="wBall"
        >
          <div class="wInnerBall" />
        </div>
        <div
          id="wBall_5"
          class="wBall"
        >
          <div class="wInnerBall" />
        </div>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
// count:
$count-item-normal: 9px;
$count-item-smallest: 6px;

$binary-count-item-normal: -4px;
$binary-count-item-smallest: 3px;

// animation
@keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -webkit-transform: rotate(225deg);
    -webkit-animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    -webkit-transform: rotate(345deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 0;
  }
  30% {
    opacity: 1;
    -webkit-transform: rotate(455deg);
    -webkit-animation-timing-function: ease-in-out;
    -webkit-origin: 7%;
  }
  39% {
    opacity: 1;
    -webkit-transform: rotate(690deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 30%;
  }
  65% {
    opacity: 1;
    -webkit-transform: rotate(815deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 39%;
  }
  75% {
    opacity: 1;
    -webkit-transform: rotate(945deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 70%;
  }
  76% {
    opacity: 0;
    -webkit-transform: rotate(945deg);
  }
  to {
    opacity: 0;
    -webkit-transform: rotate(945deg);
  }
}

.loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 255, 255, 1);
  z-index: 100;
}
._loadBgCon {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -15px;
  margin-left: -15px;
  width: 30px;
  height: 30px;
}
._loadBgCon .wBall {
  position: absolute;
  width: 45px;
  height: 45px;
  top: -10px;
  left: -10px;
  opacity: 0;
  transform: rotate(225deg);
  animation: orbit 4s infinite;
}
._loadBgCon .wBall .wInnerBall {
  position: absolute;
  left: 0;
  top: 0;
  width: $count-item-normal;
  height: $count-item-normal;
  background: #ff7155;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  box-shadow: 0 0 15px #ff7155;
}
@media (max-width: 414px) {
  ._loadBgCon .wBall {
    width: 30px;
    height: 30px;
    top: 0;
    left: 0;
  }
  ._loadBgCon .wBall .wInnerBall {
    width: $count-item-smallest;
    height: $count-item-smallest;
  }
}
._loadBgCon #wBall_1 {
  animation-delay: 1.096s;
}
._loadBgCon #wBall_2 {
  animation-delay: 0.213s;
}
._loadBgCon #wBall_3 {
  animation-delay: 0.4365s;
}
._loadBgCon #wBall_4 {
  animation-delay: 0.6495s;
}
._loadBgCon #wBall_5 {
  animation-delay: 0.873s;
}
</style>