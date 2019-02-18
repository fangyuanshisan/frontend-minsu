import request from '@/utils/request'
// 待处理消息
export function getMsgTotal() {
  return request({
    url: '/client/clientinbox/gettotal',
    method: 'GET'
  })
}
// 待办事项消息
export function getMsgList(query : object) {
  return request({
    url: '/client/message/getlist',
    method: 'GET',
    params: query
  })
}
