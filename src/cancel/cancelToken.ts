import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    // 实例化出一个padding状态的promise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      // 如果reson有值说明已经取消过了
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  // 静态方法
  static source(): CancelTokenSource {
    let cancel!: Canceler
    // c就是一个函数体excutor里面的参数
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
  // 当一个请求携带的 cancelToken 已经被使用过，那么我们甚至都可以不发送这个请求，只需要抛一个异常即可，并且抛异常的信息就是我们取消的原因
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
