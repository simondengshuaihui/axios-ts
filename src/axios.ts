import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context) // 需要绑定this为Axios的实例

  // 把context的所有属性方法扩展到instance里面，instance本身是函数，又带有Axios实例的方法
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
