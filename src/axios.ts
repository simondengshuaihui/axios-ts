import { AxiosStatic,AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context) // 需要绑定this为Axios的实例

  // 把context的所有属性方法扩展到instance里面，instance本身是函数，又带有Axios实例的方法
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 创建静态方法创建新实例
axios.create = function create(config){
  return createInstance(mergeConfig(defaults,config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
