import Taro from "@tarojs/taro";

/**
 * 防抖
 * @param fn 传入的方法
 * @param delay 间隔时间
 */
export function debounce (fn, delay = 1000) {
  return args => {
    clearTimeout(fn.id);

    fn.id = setTimeout(() => {
      fn.call(this, args)
    }, delay)
  }
}

/**
 * 节流
 * @param fn 传入的方法
 * @param delay 间隔时间
 */
export function throttle (fn, delay = 1000) {
  let last;

  return args => {
    let now = Date.now();

    if (last && now < last + delay) {
      clearTimeout(fn.id);

      fn.id = setTimeout(() => {
        fn.call(this, args);
        last = now
      }, delay)
    } else {
      fn.call(this, args);
      last = now
    }
  }
}

/**
 * 验证字符串是否是数字
 * @param args 传入的值，可传入多个值
 */
export function checkNumber (...args) {
  let currentItemIndex = -1;
  let reg = /^[0-9]*$/;
  args.some((item, index) => {
    if (reg.test(item)) {
      return false;
    }
    currentItemIndex = index;
    return true;
  });

  return currentItemIndex
}

/**
 * 检测值是否为null、undefined和空字符串
 * @param args 传入的值，可传入多个值
 */
export function isValid (...args) {
  let currentItemIndex = -1;
  args.some((item, index) => {
    if (!item) {
      currentItemIndex = index;
      return true
    } else {
      return false
    }
  });

  return currentItemIndex
}

/**
 * 文本弹窗
 * @param title 标题
 * @param duration 持续时间
 */
export function toast (title: string, duration: number = 2000) {
  Taro.showToast({
    title: title,
    icon: 'none',
    duration: duration
  });
}
