import * as elementUi from 'element-ui'
import configPrompt from '@/config/configPrompt'
import moment from 'moment'
const {
  SUBMIT,
  CANCEL,
  CANCEL_OPERATION,
  ER_UPLOAD_IMG_TYPE,
  ER_UPLOAD_IMG_SIZE
} = configPrompt

export function require() {
  throw new Error('Missing parameters')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function changeTheme(element, className) {
  if (!element || !className) {
    return
  }
  element.className = className
}

export function openConfirm(content, title, callback, type) {
  elementUi.MessageBox.confirm(content, title, {
    confirmButtonText: SUBMIT,
    confirmButtonClass: 'is-plain el-button--success el-button--medium',
    cancelButtonText: CANCEL,
    cancelButtonClass: 'is-plain el-button--medium',
    type: 'warning'
  })
    .then(() => {
      callback()
    })
    .catch(() => {
      elementUi.Message({
        type: 'info',
        message: CANCEL_OPERATION
      })
    })
}

export function openPrompt(content, title, text, callback) {
  elementUi.MessageBox.prompt(content, title, {
    inputType: 'textarea',
    confirmButtonText: SUBMIT,
    confirmButtonClass: 'is-plain el-button--success el-button--medium',
    cancelButtonText: CANCEL,
    cancelButtonClass: 'is-plain el-button--medium',
    inputPattern: /\S/g,
    inputErrorMessage: text
  })
    .then(({ value }) => {
      callback(value)
    })
    .catch(() => {
      elementUi.Message({
        type: 'info',
        message: configPrompt.CANCEL_OPERATION
      })
    })
}

export function deepClone(origin, target = {}) {
  const toStr = Object.prototype.toString
  const arrStr = '[object Array]'
  for (const prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      if (origin[prop] !== 'null' && typeof origin[prop] === 'object') {
        target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {}
        deepClone(origin[prop], target[prop])
      } else {
        target[prop] = origin[prop]
      }
    }
  }
  return target
}

export function proxy(origin, ...arr) {
  let value = JSON.parse(JSON.stringify(origin))
  if (typeof origin === 'undefined' || origin === null) return
  arr.some(target => {
    if (typeof value[target] === 'undefined') {
      value = ''
      return true
    }
    value = value[target]
    return false
  })
  return value
}
// proxy(memberList, ...this.path.accountName)

export function rename(file) {
  const curr = moment()
    .format('YYYYMMDD')
    .toString()
  const prefix = moment(file.lastModified)
    .format('HHmmss')
    .toString()
  const suffix = file.name.substring(file.name.lastIndexOf('.'))
  const key = encodeURI(`${curr}${prefix}${suffix}`)
  return key
}

export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (typeof value !== 'undefined') {
          target[prop] = value
        }
      }
    }
  }
  return target
}

/**
 * 数组去重
 *@param
 * targetArr type Array
 * isSorted type Boolean
 * **/
export function unique(targetArr, isSorted) {
  const resArr = []
  let compareVal = null
  for (let i = 0; targetArr[i]; i++) {
    if (isSorted) {
      if (!i || targetArr[i] !== compareVal) {
        resArr.push(targetArr[i])
      }
      compareVal = targetArr[i]
    } else {
      let j = 0
      let resArrLen = resArr.length
      for (; resArr[j]; j++) {
        if (targetArr[i] === resArr[j]) {
          break
        }
      }
      j === resArrLen && resArr.push(targetArr[i])
    }
  }
  return resArr
}

/**
 * 表单验证
 * @param argums type obj
 * @property
 * min: 最小长度
 * max: 最大长度
 * regExp: 正则
 * emptyError: 空值错误提醒
 * scopedError: 范围错误提醒
 * regExpError: 正则匹配错误提醒
 */
export function validateConstructor(argums) {
  return (rule, value, callback) => {
    if (value === '' || value === null || value.length === 0) {
      callback(new Error(argums.emptyError))
    } else if (
      (typeof argums.min !== 'undefined' &&
        typeof argums.max !== 'undefined' &&
        value.length < argums.min) ||
      value.length > argums.max
    ) {
      callback(new Error(argums.scopedError))
    } else if (
      typeof argums.regExp !== 'undefined' &&
      !argums.regExp.test(value)
    ) {
      callback(new Error(argums.regExpError))
    } else {
      callback()
    }
  }
}

export function validateImagesError(file = require()) {
  const [isJPG, isJPEG, isPNG, isMx1M] = [
    file.type === 'image/jpg',
    file.type === 'image/jpeg',
    file.type === 'image/png',
    file.size / 1024 / 1024 < 1
  ]
  if (!(isJPG || isJPEG || isPNG)) {
    elementUi.Message({
      message: ER_UPLOAD_IMG_TYPE,
      type: 'error'
    })
    return true
  } else if (!isMx1M) {
    elementUi.Message({
      message: ER_UPLOAD_IMG_SIZE,
      type: 'error'
    })
    return true
  } else {
    return false
  }
}

export function inputNumberNoPoint(e) {
  const code = e.which || e.keyCode
  if (code === 190) {
    e.returnValue = false
    return false
  }
  return true
}

export function getFileType(fileName) {
  if (!fileName) return false
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
}
