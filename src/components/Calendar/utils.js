
const newArray = function(start, end) {
  let result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const toDate = function(date) {
  return isDate(date) ? new Date(date) : null
}

export const isDate = function(date) {
  if (date === null || typeof date === 'undefined') {
    return false
  }
  if (isNaN(new Date(date).getTime())) {
    return false
  }
  if (Array.isArray(date)) { // deal with `new Date([ new Date() ]) -> new Date()`
    return false
  }
  return true
}

export const isEqualDateStr =  function (dateStr1, dateStr2) {
  if (!(dateStr1 && dateStr2)) {
    return false
  }
  let dateArr1 = dateStr1.split('-')
  let dateArr2 = dateStr2.split('-')
  if (parseInt(dateArr1[0], 10) !== parseInt(dateArr2[0], 10)) {
    return false
  }
  if (parseInt(dateArr1[1], 10) !== parseInt(dateArr2[1], 10)) {
    return false
  }
  if (parseInt(dateArr1[2], 10) !== parseInt(dateArr2[2], 10)) {
    return false
  }
  return true
}

export const isDateObject = function(val) {
  return val instanceof Date
}

export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

export const getDayCountOfYear = function(year) {
  const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
  return isLeapYear ? 366 : 365
}

export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}

// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
// {prev, next} Date should work for Daylight Saving Time
// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
export const prevDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount)
}

export const nextDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export const getStartDateOfMonth = function(year, month) {
  const result = new Date(year, month, 1)
  const day = result.getDay()

  if (day === 0) {
    return prevDate(result, 7)
  } else {
    return prevDate(result, day)
  }
}

export const getWeekNumber = function(src) {
  if (!isDate(src)) return null
  const date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  )
}

export const getRangeHours = function(ranges = []) {
  const hours = []
  let disabledHours = []
  ranges.forEach(range => {
    const value = range.map(date => date.getHours())

    disabledHours = disabledHours.concat(newArray(value[0], value[1]))
  })

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false
    }
  }

  return hours
}

export const range = function(n) {
  // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  return Array.apply(null, { length: n }).map((_, n) => n)
}

export const modifyDate = function(date, y, m, d) {
  return new Date(
    y,
    m,
    d,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )
}

export const modifyTime = function(date, h, m, s) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    h,
    m,
    s,
    date.getMilliseconds()
  )
}

export const clearTime = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export const clearMilliseconds = function(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    0
  )
}

export const changeYearMonthAndClampDate = function(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month))
  return modifyDate(date, year, month, monthDate)
}

export const prevMonth = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1)
}

export const nextMonth = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1)
}

export const prevYear = function(date, amount = 1) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return changeYearMonthAndClampDate(date, year - amount, month)
}

export const nextYear = function(date, amount = 1) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return changeYearMonthAndClampDate(date, year + amount, month)
}

export const extractDateFormat = function(format) {
  return format
    .replace(/\W?m{1,2}|\W?ZZ/g, '')
    .replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '')
    .trim()
}

export const extractTimeFormat = function(format) {
  return format
    .replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '')
    .trim()
}
