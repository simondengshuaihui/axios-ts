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
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // 如果拷贝的是对象
        if (isPlainObject(val)) {
          // 如果resulty已经含有这个对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

// 检测数据是不是FormData类型
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}

// 判断是否是URLSearchParams实例
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
