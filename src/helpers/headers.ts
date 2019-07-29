import { isPlainObject,deepMerge } from './util'
import {Method} from '../types'

// 把headers的‘content-type’初始化为‘Content-Type’
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理headers,为post的对象添加application/json;charset=utf-8请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return headers
}

// 把相应头转化为对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    let val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}

// 处理headers，合并后里面含有默认的配置，另外需要把common，以及相应请求方法里的header提到第一级
export function flattenHeaders(headers:any,method:Method):any {
  if(!headers) return headers

  headers = deepMerge(headers.common || {},headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
