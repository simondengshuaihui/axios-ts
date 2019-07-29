// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders,flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 一个请求携带的 cancelToken 已经被使用过,就不发送这个请求
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res as AxiosResponse)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)  // 处理URL添加params
  // config.headers = transformHeaders(config)  // 为post的对象添加application/json;charset=utf-8请求头
  config.data = transform(config.data, config.headers, config.transformRequest) // 请求前对请求data做处理
  config.headers = flattenHeaders(config.headers,config.method!) // 把对象二级headers改为一级
}

export function transformURL(config: AxiosRequestConfig): string {
  let { url, params,paramsSerializer,baseURL } = config
  // 当有baseURL且url不是绝对地址的时候合并
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params,paramsSerializer)
}
// 把data转化为json字符串
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  // 通过配置transformResponse函数，来处理data
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

