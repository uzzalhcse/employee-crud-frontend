import request from '@/services/network/request'
const RESOURCE = 'employees/'
export default {
  index(page = 1) {
    return request({
      url: RESOURCE + '?page=' + page,
      method: 'get'
    })
  },
  show(id) {
    return request({
      url: RESOURCE + id,
      method: 'get'
    })
  },
  store(data) {
    return request({
      url: RESOURCE,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: RESOURCE + data.id,
      method: 'patch',
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  delete(id) {
    return request({
      url: RESOURCE + id,
      method: 'delete'
    })
  }
}
