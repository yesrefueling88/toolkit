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

/**
 * RGB转16进制
 * @param color
 */
export function RGB2Hex (r: number, g: number, b: number):string {
  if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
    return ''
  }

  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

/**
 * 16进制转RGB
 * @param hex
 */
export function Hex2RGB (hex: string) {
  if (hex == "") {
    return ""
  }
  hex = hex.substring(1);
  hex = hex.toLowerCase();
  let b = new Array();
  for (let x = 0; x < 3; x++) {
    b[0] = hex.substr(x * 2, 2);
    b[3] = "0123456789abcdef";
    b[1] = b[0].substr(0, 1);
    b[2] = b[0].substr(1, 1);
    b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2]);
  }
  return "rgb(" + b[20] + "," + b[21] + "," + b[22] + ")";
}

