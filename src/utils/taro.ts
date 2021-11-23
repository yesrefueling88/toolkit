import Taro from "@tarojs/taro";
import { NavBarInfo } from "@reducers/global";

// @ts-ignore
export function initNavBarInfo (): { success: boolean, data: NavBarInfo | null, msg: string } {
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
}
