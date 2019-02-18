import request from '@/utils/request'

export function getSignInHash() {
  return request({
    url: '/v1/admin/gethash',
    method: 'GET'
  })
}
