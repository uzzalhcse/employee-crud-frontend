import request from '@/services/network/request'
const RESOURCE = 'companies/'
export default {
  index(page = 1) {
    return request({
      url: RESOURCE,
      method: 'get'
    })
  }
}
