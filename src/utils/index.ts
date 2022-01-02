import Taro from "@tarojs/taro";
import { readFileSync } from "@utils/taro";

let RNFS;
if (IS_RN) {
  RNFS = require('react-native-fs')
}

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
export function RGB2Hex (r: number, g: number, b: number): string {
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

/**
 * 选择图片 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
 * @param count 默认9
 * @param sizeType 可以指定是原图还是压缩图，默认二者都有
 * @param sourceType 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
 */
export function chooseImage ({
  count = 9,
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera'],
}: {
  count?: number,
  sizeType?: string[],
  sourceType?: string[],
}) {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: count,
      // @ts-ignore
      sizeType: sizeType,
      // @ts-ignore
      sourceType: sourceType,
      success: function (res) {
        if (count === 1) {
          resolve({
            success: true,
            path: res.tempFilePaths[0]
          })
        } else {
          resolve({
            success: true,
            paths: res.tempFilePaths
          })
        }
      },
      fail: function (error) {
        reject({
          success: false,
          error: error
        })
      }
    })
  })
}

/**
 * 以base64的方式读取本地文件
 * @param path 文件路径
 */
export function readFileOnBase64 (path = '') {
  return new Promise((resolve, reject) => {
    Taro.showLoading({ title: '加载中...' });
    if (IS_WEAPP) {
      resolve({
        success: true,
        data: 'data:image/png;base64,' + readFileSync(path, 'base64')
      });
      Taro.hideLoading()
    }

    if (IS_RN) {
      RNFS.readFile(path, 'base64')
        .then((content) => {
          resolve({
            success: true,
            data: 'data:image/png;base64,' + content
          });
          Taro.hideLoading()
        })
        .catch(() => {
          reject("图片读取失败")
          Taro.hideLoading()
        });
    }

    if (IS_H5) {
      const getBase64Image = (img) => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        let dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
      };

      let image = new Image();
      image.src = path;
      image.onload = function () {
        resolve({
          success: true,
          data: getBase64Image(image)
        });
        Taro.hideLoading()
      }
    }
  })
}

/**
 * 获取系统剪贴板内容
 */
export function getClipboardData () {
  return new Promise((resolve, reject) => {
    Taro.getClipboardData({
      success: function (res) {
        toast('已粘贴');
        resolve({
          success: true,
          data: res.data
        })
      },
      fail: function () {
        toast('粘贴失败');
        reject({
          success: false,
          data: ''
        })
      },
    })
  })
}

/**
 * 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s
 * @param data 内容
 */
export function setClipboardData (data: string) {
  return new Promise((resolve, reject) => {
    Taro.setClipboardData({
      data: data,
      success: function () {
        IS_H5 && toast('内容已复制');
        resolve({
          success: true,
          msg: '设置成功'
        })
      },
      fail: function () {
        IS_H5 && toast('内容复制失败');
        reject({
          success: false,
          msg: '设置失败'
        })
      },
    })
  })
}

