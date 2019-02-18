export function isValidIdCard(value) {
  const regExp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/ // 身份证号验证
  return !regExp.test(value)
}

export function isValidCellphone(value) {
  const regExp = /^1[3|4|5|7|8|9]\d{9}$/ // 手机号验证
  return !regExp.test(value)
}

export function isPassword(value) {
  const regExp = /^(?!\D+$)(?![^a-zA-Z]+$).{8,15}$/ // 8-15为数字与字母的组合
  return !regExp.test(value)
}

export function isEmail(value) {
  const regExp = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g // 邮箱验证
  return !regExp.test(value)
}
