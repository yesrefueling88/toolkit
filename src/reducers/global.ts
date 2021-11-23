import { GetNavBarInfo } from "@constants/global";
import { initNavBarInfo } from "@utils/taro";

/** 获取小程序导航栏info */
export interface NavBarInfo {
  /** 导航栏总高度 */
  navBarHeight: number,
  /** 系统状态栏高度 */
  statusBarHeight: number,
  /** 导航栏内容区域高度 */
  navBarContentHeight: number,
}

interface StateType {
  navBarInfo: NavBarInfo
}

const INITIAL_STATE: StateType = {
  navBarInfo: {
    navBarHeight: 0,
    statusBarHeight: 0,
    navBarContentHeight: 0,
  }
};

export default function global (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GetNavBarInfo:
      let info: { success: boolean, data: NavBarInfo | null, msg: string } = initNavBarInfo();
      if (info.success) {
        return {
          ...state,
          navBarInfo: info.data
        }
      }
    default:
      return state
  }
}
