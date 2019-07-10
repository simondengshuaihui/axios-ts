import { AxiosRequestConfig } from './types'

const defaults:AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers:{
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']
// 为没有data的请求header置为空对象
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
// 为有data的请求header添加默认请求头
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
