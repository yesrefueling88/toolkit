import { NavBarInfo } from "@reducers/global";

export const initNavBarInfo = (): { success: boolean, data: NavBarInfo | null, msg: string } => {
  return {
    success: false,
    data: null,
    msg: 'RN不支持此API'
  }
};
