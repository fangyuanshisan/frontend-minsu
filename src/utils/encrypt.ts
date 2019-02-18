import CryptoJS from 'crypto-js'
import CryptoJSAesJson from '@/utils/aesJsonFormat'

export function passwordEncrypt(hash: any, password: any) {
  let newPassword = null
  if (!hash) {
    console.log('error:  请获取hash！')
    return false
  }
  newPassword = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    hash,
    { format: CryptoJSAesJson }
  ).toString()
  return newPassword
}
