import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + '/api/', // url = base url + request url
  timeout: 0 // request timeout
})

service.interceptors.request.use(
  config => {
    config.headers['x-header'] = 'test'
    return config
  },
  error => {
    // do something with request error
    console.log('error', error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 'success') {
      console.log(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
