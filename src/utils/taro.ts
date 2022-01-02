import Taro from "@tarojs/taro";
import { NavBarInfo } from "@reducers/global";

export const initNavBarInfo = (): { success: boolean, data: NavBarInfo | null, msg: string } => {
  let menu = Taro.getMenuButtonBoundingClientRect();
  let system = Taro.getSystemInfoSync();
  return {
    success: true,
    data: {
      navBarHeight: menu.height + (menu.top - system.statusBarHeight) * 2,
      statusBarHeight: system.statusBarHeight,
      navBarContentHeight: menu.height,
    },
    msg: 'ok',
  }
};

export const createSelectorQuery = (key: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // @ts-ignore
      Taro.createSelectorQuery().selectAll(key).boundingClientRect((res: Array<any>) => {
        if (res.length > 0) {
          resolve({
            success: true,
            data: res,
            msg: 'ok',
          })
        } else {
          reject({
            success: false,
            data: null,
            msg: 'error',
          })
        }
      }).exec();
    }, 500)
  })
};

export const readFileSync = (path: string, encoding: string) => {
  // @ts-ignore
  return Taro.getFileSystemManager().readFileSync(path, encoding)
};
