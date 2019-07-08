const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 验证是否是纯对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 实现混合对象
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
