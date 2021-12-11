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
