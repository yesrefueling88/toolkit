import React, { forwardRef, ReactElement, useState } from "react";
import { View } from '@tarojs/components'
import './menu.scss'

type Props = {
  children: Array<ReactElement>,
  style?: string,  // CSS样式
  scrollOffSet?: number,  // 点击menuItem后, 滚动轴跳转的偏移量
}

// 每个menuItem的锚点对象
export interface MenuAnchorItem {
  top: number,  // 每个menuItem对应的Panel距离scroll的最小值
  bottom: number,  // 每个menuItem对应的Panel距离scroll的最大值
  width: number,  // 每个menuItem对应的Panel的宽度
  height: number,  // 每个menuItem对应的Panel的高度
}

// @ts-ignore
const Menu: any = forwardRef((props: Props, ref) => {
  const { children, style = '', scrollOffSet = 0 } = props;
  // 当前选中的menuItem值
  const [selectedIndex, setSelectedIndex] = useState(0);
  // menuItem的锚点对象映射
  const [anchorMap] = useState(new Map<number, MenuAnchorItem>());

  return (
    <View
      className='c-menu'
      style={style}
    >
      {children?.map((child, index) => {
        let porps;
        index === 0 && (porps = {
          key: index,
          selectedIndex: selectedIndex,
          onSetSelectIndex: (tabIndex) => {
            if (selectedIndex == tabIndex) return;

            setSelectedIndex(tabIndex);
          }
        });

        index === 1 && (porps = {
          key: index,
          selectedIndex: selectedIndex,
          anchorMap: anchorMap,
          scrollOffSet: scrollOffSet,
          onSetSelectIndex: (tabIndex) => {
            if (selectedIndex == tabIndex) return;

            setSelectedIndex(tabIndex);
          }
        });

        return React.cloneElement(child, porps)
      })}
    </View>
  )
});

export default Menu
