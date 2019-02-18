<template>
  <div class="mywk__calendar">
    <div class="calendar">
      <!-- <p class="tips">房态日历</p> -->
      <div class="calendar__header">
        <div
          class="header__pre"
          @click="handlePreMonth"
        />
        <div class="header__title">
          {{ selectedYear }}年{{ selectedMonth + 1 }}月
        </div>
        <div
          class="header__next"
          @click="handleNextMonth"
        />
      </div>

      <loading v-show="isLoading" />
      <div :class="`calendar__main ${isLoading ? 'hide__calendar' : ''}`">
        <div
          v-for="(item, index) in calendarHeader"
          :key="index"
          class="main__block-head"
        >
          {{ item }}
        </div>

        <div
          v-for="(item, index) in displayDaysPerMonth(selectedYear, selectedMonth)"
          :key="item.type + item.content + index"
          :class="`main__block ${item.date === today && 'main__block-today'} ${(item.isTodayBeforeDate || item.content === '') && 'main__block-before-today'}`"
          @click="handleDayClick(item)"
        >
          <p
            v-if="item.date === today"
            class="main__block_day"
          >今天</p>
          <p
            v-else
            class="main__block_day"
          >{{ item.content }}</p>
          <template v-if="item.content">
            <p
              v-if="item.originalPrice"
              class="main__block_price origin_price"
            >{{ '￥' + item.originalPrice }}</p>
            <p
              v-if="item.currentPrice"
              class="main__block_price target_price"
            >{{ '￥' + item.currentPrice }}</p>
            <p
              v-if="item.num"
              class="main__block_price target_num"
            >{{ item.num }}</p>
          </template>
        </div>
      </div>

      <div class="calendar__note">
        价格状态：
        <span
          v-if="defaultOriginPrice"
          class="calendar__note_item"
        ><i class="origin" />原价</span>
        <span
          v-if="defaultTargetPrice"
          class="calendar__note_item"
        ><i class="target" />现价</span>
        <span
          v-if="defaultNum"
          class="calendar__note_item"
        ><i class="num" />剩余数量</span>
      </div>
    </div>

    <!-- <p class="tips">日历类型--计算整年数据</p>
    <div class="calendar">
      <div class="calendar__header">
        <div
          class="header__pre"
          @click="handlePreMonth"
        />
        <div class="header__title">
          {{ selectedYear }}年{{ selectedMonth + 1 }}月{{ selectedDate }}日
        </div>
        <div
          class="header__next"
          @click="handleNextMonth"
        />
      </div>

      <div class="calendar__main">
        <div
          v-for="(item, index) in calendarHeader"
          :key="index"
          class="main__block-head"
        >
          {{ item }}
        </div>

        <div
          v-for="(item, index) in displayDaysPerMonthT(selectedYear)[selectedMonth]"
          :key="item.type + item.content + `${index}`"
          :class="`main__block ${(item.type === 'pre' || item.type === 'next') ? 'main__block-not' : ''} ${(item.content === selectedDate && item.type === 'normal') && 'main__block-today'}`"
          @click="handleDayClick(item)"
        >
          {{ item.content }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import loading from './components/loading'
let today = new Date()
export default {
  components: {
    loading
  },
  props: {
    defaultOriginPrice: {
      type: Number,
      default: 0
    },
    defaultTargetPrice: {
      type: Number,
      default: 0
    },
    defaultNum: {
      type: Number,
      default: 0
    },
    transDatePriceFulllist: {
      type: Array,
      default() {
        return []
      }
    },
    transDateNumFulllist: {
      type: Array,
      default() {
        return []
      }
    },
    calendarOptions: {
      type: Object,
      default() {
        return 1
      }
    }
  },
  data() {
    return {
      isLoading: true,
      calendarHeader: ['日', '一', '二', '三', '四', '五', '六'],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate(),
      today: Number(today.getFullYear() + this.addPreZero(today.getMonth() + 1) + today.getDate())
    }
  },
  watch: {
    transDatePriceFulllist() {
      this.loading(false)
    }
  },
  methods: {
    loading(state) {
      this.isLoading = state
    },
    getToday() {
      return this.selectedYear + this.addPreZero(this.selectedMonth + 1) + this.addPreZero(this.selectedDate)
    },
    getDate(day) {
      return Number(this.selectedYear + this.addPreZero(this.selectedMonth + 1) + this.addPreZero(day))
    },
    addPreZero(num) {
      return (num > 9) ? num : ('0' + num)
    },
    isTodayBeforeDate(day) {
      return new Date(this.selectedYear, this.selectedMonth, day + 1).getTime() < Date.now() && this.getDate(day + 1) !== this.today
    },
    isTodayAndAfterDate(day) {
      return new Date(this.selectedYear, this.selectedMonth, day + 1).getTime() > Date.now() || this.getDate(day + 1) === this.today
    },
    displayDaysPerMonth(year, month) {
      // 定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
      }
      // 当前月份的第一天是星期几
      let targetDay = new Date(year, month, 1).getDay()

      let total_calendar_list = []
      let preNum = targetDay
      let nextNum = 0
      if (targetDay > 0) {
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: 'pre',
            content: '',
            isTodayBeforeDate: this.isTodayBeforeDate(i),
            isTodayAndAfterDate: this.isTodayAndAfterDate(i)
          }
          total_calendar_list.push(obj)
        }
      }

      for (let i = 0; i < daysInMonth[month]; i++) {
        let obj = {
          type: 'normal',
          content: i + 1,
          date: this.getDate(i + 1),
          originalPrice: this.defaultOriginPrice,
          currentPrice: this.defaultTargetPrice,
          num: this.defaultNum,
          isTodayBeforeDate: this.isTodayBeforeDate(i),
          isTodayAndAfterDate: this.isTodayAndAfterDate(i)
        }

        this.transDatePriceFulllist.length && this.transDatePriceFulllist.forEach(item => {
          if (item.day === obj.date) {
            obj.originalPrice = item.originalPrice
            obj.currentPrice = item.currentPrice
          }
        })

        this.transDateNumFulllist.length && this.transDateNumFulllist.forEach(item => {
          if (item.day === obj.date) {
            obj.num = item.num
          }
        })

        total_calendar_list.push(obj)
      }

      nextNum = 6 - new Date(year, month + 1, 0).getDay()

      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: 'next',
          content: '',
          isTodayBeforeDate: this.isTodayBeforeDate(i),
          isTodayAndAfterDate: this.isTodayAndAfterDate(i)
        }
        total_calendar_list.push(obj)
      }
      return total_calendar_list
    },
    displayDaysPerMonthT(year) {
      // 定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
      }

      let daysPreMonth = [].concat(daysInMonth)
      daysPreMonth.unshift(daysPreMonth.pop())

      let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
        let day = new Date(year, index, 1).getDay()
        if (day === 0) {
          return 6
        } else {
          return day - 1
        }
      })

      let total_calendar_list = new Array(12)
        .fill([])
        .map((month, monthIndex) => {
          let addDays = addDaysFromPreMonth[monthIndex] + 1
          let daysCount = daysInMonth[monthIndex]
          let daysCountPre = daysPreMonth[monthIndex]
          let monthDate = []

          if (addDays >= 7) {
            addDays = addDays - 7
          }

          for (; addDays > 0; addDays--) {
            let obj = {
              content: daysCountPre--,
              type: 'pre'
            }

            monthDate.unshift(obj)
          }

          for (let i = 0; i < daysCount;) {
            let obj = {
              content: ++i,
              type: 'normal'
            }
            monthDate.push(obj)
          }
          if (monthDate.length > 35) {
            for (let i = 42 - monthDate.length, j = 0; j < i;) {
              let obj = {
                content: ++j,
                type: 'next'
              }
              monthDate.push(obj)
            }
          } else {
            for (let i = 35 - monthDate.length, j = 0; j < i;) {
              let obj = {
                content: ++j,
                type: 'next'
              }
              monthDate.push(obj)
            }
          }
          return monthDate
        })
      return total_calendar_list
    },
    handleDayClick(item) {
      if (item.type === 'normal') {
        this.$emit('handleDayClick', item)
      }
    },
    handlePreMonth() {
      // this.loading(true)
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1
        this.selectedMonth = 11
      } else {
        this.selectedMonth = this.selectedMonth - 1
      }
      // setTimeout(self => {
      //   self.loading(false)
      // }, Math.random() * 1e3, this)
    },
    handleNextMonth() {
      // this.loading(true)
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1
        this.selectedMonth = 0
      } else {
        this.selectedMonth = this.selectedMonth + 1
      }
      // setTimeout(self => {
      //   self.loading(false)
      // }, Math.random() * 1e3, this)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// Fonts:
$font-size-huge: 20px;
$font-size-base: 16px;
$font-size-smallest: 12px;
$font-weight-normal: normal;
$line-height-15: 1.5;
$line-height-2: 2;

// Utils
$spacer: 12px;
$transition: 0.5s ease all;
$index: 0px;
$index-has-icon: 30px;
$count: 80px;
$binary-count: -40px;

// Theme:
$color-transparent: transparent;
$color-white: rgba(255, 255, 255, 1);
$color-white-30: rgba(255, 255, 255, 0.3);
$color-white-50: rgba(255, 255, 255, 0.5);
$color-white-70: rgba(255, 255, 255, 0.7);
$color-white-90: rgba(255, 255, 255, 0.9);
$color-grey: #9e9e9e;
$color-grey-middle: #666;
$color-grey-light: #e0e0e0;
$color-blue: #28abff;
$color-red: #ff5000;
$color-green: green;

// Base clases:
@function pxWithVw($n) {
  @return 100vw * $n / 375;
}
@function pxWithVwMax($n) {
  @return 580px * $n / 375;
}

.mywk__calendar {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.tips {
  margin: 20px 0 0 0;
  text-align: center;
  color: #333;
}

.calendar {
  position: relative;
  flex-shrink: 0;
  width: pxWithVw(337);
  max-width: pxWithVwMax(580);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0 20px 0;
  border-radius: 4px;
  background-color: $color-white;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);

  .calendar__header {
    color: #2c3135;
    font-size: $font-size-huge;
    width: pxWithVw(310);
    max-width: pxWithVwMax(530);
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 22px;
    margin-top: 17px;

    .header__title {
      font-size: $font-size-huge;
      letter-spacing: 1px;
    }

    .header__pre,
    .header__next {
      height: 40px;
      width: 40px;
      position: relative;
      &:hover {
        cursor: pointer;
        &:after {
          border-color: rgba(225, 180, 0, 1);
        }
      }
      &:after {
        content: " ";
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4px;
        margin-top: -4px;
        right: 2px;
      }
    }
    .header__pre {
      &:after {
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
      }
    }

    .header__next {
      &:after {
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      }
    }
  }

  .calendar__main {
    width: pxWithVw(315);
    max-width: pxWithVwMax(580);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    &.hide__calendar {
      opacity: 0.1;
    }

    .main__block {
      width: pxWithVw(45);
      // height: pxWithVw(75);
      max-width: pxWithVwMax(75);
      // max-height: pxWithVwMax(75);
      margin-bottom: 15px;
      border-radius: 2px;
      font-size: $font-size-smallest;
      color: $color-grey-middle;
      background-color: $color-white;
      flex-shrink: 0;
      box-shadow: 0;
      position: relative;
      text-align: center;
      user-select: none;
      &:hover {
        cursor: pointer;
        color: rgba(225, 180, 0, 1);
        background-color: rgba(225, 180, 0, 0.1);
      }

      .main__block-piont {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #f93d3a;
        position: absolute;
        left: calc(50% - 2.5px);
        bottom: 0;
      }
      p {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: norwap;
        &.main__block_day {
          font-size: $font-size-base;
        }
        &.main__block_price {
          position: relative;
        }
        &.origin_price {
          color: $color-grey;
          text-decoration: line-through;
          &::before {
            background-color: $color-blue;
          }
        }
        &.target_price {
          color: $color-red;
          font-size: $font-size-base;
          &::before {
            background-color: $color-red;
          }
        }
        &.target_num {
          color: $color-green;
          &::before {
            background-color: $color-green;
          }
        }
      }
    }
    .main__block-not {
      background-color: #edf2f5;
      color: #7f8fa4;
    }
    .main__block-today {
      // transition: $transition;
      border-bottom: 1px solid #e54;
      // background-color: rgba(225, 180, 0, 1);
      // color: #fff;
      // box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
      background-color: rgba(225, 180, 0, 0.1);
      &:hover {
        cursor: pointer;
        // color: #fff;
        background-color: rgba(225, 180, 0, 0.1);
      }
    }
    .main__block-before-today {
      opacity: 0.3;
      &:hover {
        cursor: auto;
        color: $color-grey-middle;
        background-color: $color-transparent;
      }
    }
    .main__block-head {
      width: pxWithVw(45);
      height: pxWithVw(75);
      max-width: pxWithVwMax(75);
      max-height: pxWithVwMax(75);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size-base;
      color: #7f8fa4;
      background-color: #fff;
      flex-shrink: 0;
    }
  }
  .calendar__note {
    margin-bottom: 10px;
    float: right;
    height: 30px;
    line-height: 30px;
    color: #333;
    font-size: $font-size-smallest;
    .calendar__note_item {
      margin-right: 15px;
      i {
        margin-right: 8px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        vertical-align: 2px;
        &.origin {
          background-color: $color-grey;
        }
        &.target {
          background-color: $color-red;
        }
        &.num {
          background-color: $color-green;
        }
      }
    }
  }
}
</style>
