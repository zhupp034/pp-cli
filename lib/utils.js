const ora = require("ora");

/**
 * loading加载效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数
 * @param {List} args fn 函数执行的参数
 * @returns 异步调用返回值
 */
 async function loading(message, fn, ...args) {
    const spinner = ora(message);
    spinner.start(); // 开启加载
    try {
        let executeRes = await fn(...args);
        spinner.succeed();
        return executeRes;
    } catch (error) {
        spinner.clear()
        return 'error'
    }
    
    
  }


  


  module.exports = {
    loading
  };
  