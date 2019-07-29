// 每次测试都会执行boot.ts
// 初始化 jasmine-ajax。
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
