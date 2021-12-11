import { forwardRef, memo, ReactElement } from "react";
import { View } from '@tarojs/components'
import { MenuAnchorItem } from "@components/menu/menu";
import './menu-panel.scss'

type Props = {
  index: number,  // 当前索引
  children: Array<ReactElement>,
  anchorMap: Map<number, MenuAnchorItem>,  // menuItem的锚点对象映射
}

// @ts-ignore
const MenuPanel: any = memo(forwardRef((props: Props, ref) => {
  const { index, children, anchorMap } = props;

  return (
    <View
      id={`${index}`}
      className='c-menu-panel'
      // @ts-ignore
      onLayout={({ nativeEvent: e }) => {
        // RN端获取当前组件的宽高等信息
        let { layout: { height, width } } = e;
        let id = index,
          // @ts-ignore
          top = id === 0 ? 0 : anchorMap.get(index - 1).bottom,
          bottom = top + height;
        anchorMap.set(id, { top, bottom, width, height });
      }}
    >
      {children}
    </View>
  )
}));

export default MenuPanel
