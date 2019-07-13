import { AxiosRequestConfig } from "../types"
import { deepMerge, isPlainObject } from '../helpers/util'


const strats = Object.create(null)

// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
// 属性如 url、params、data，合并策略，只取val2的值，因为默认的这些数据没有意义
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 属性如 headers，合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) { // 如果val2是undefined就拷贝val1的值
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})


const stratKeysDeepMerge = ['headers','auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})


export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
):AxiosRequestConfig{
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)

  // 遍历合并config2到config
  for (let key in config2) {
    mergeField(key)
  }
  // 遍历合并config1到config
  for (let key in config1) {
    // 如果key没有在config2中出现过
    if (!config2![key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
