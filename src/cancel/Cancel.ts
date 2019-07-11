export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

// 判断是否是Cancel的实例
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
