import request from '@/utils/request'

export function signIn(data: object) {
  return request({
    url: '/client/login/login',
    method: 'POST',
    data
  })
}

export function signOut() {
  return request({
    url: '/client/login/loginExit',
    method: 'GET'
  })
}

export function getUserInfo() {
  return request({
    url: '/client/login/getTubeInfo',
    method: 'GET'
  })
}
