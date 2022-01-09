import React, { forwardRef, ReactElement, useRef, useState } from "react";
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
  const menusRef = useRef();
  const panelsRef = useRef();
  const { children, style = '', scrollOffSet = 0 } = props;
  // menuItem的锚点对象映射
  const [anchorMap] = useState(new Map<number, MenuAnchorItem>());
  const [panelsDataMap] = useState(new Map([
    ['setFinalScrollTop', -1],
    ['currentSelectedIndex', 0],
  ]));

  return (
    <View
      className='c-menu'
      style={style}
    >
      {children?.map((child, index) => {
        let porps;
        index === 0 && (porps = {
          key: index,
          ref: menusRef,
          onSelectItem: (itemIndex: number) => {
            const currentPanelsSelectedIndex = panelsDataMap.get('currentSelectedIndex');

            if (itemIndex === currentPanelsSelectedIndex) {
              return
            }

            // @ts-ignore
            menusRef.current.setIndex(itemIndex);
            panelsDataMap.set('currentSelectedIndex', itemIndex);
            let anchor = anchorMap.get(itemIndex);
            anchor != undefined && panelsDataMap.set('setFinalScrollTop', anchor.top - scrollOffSet);
            // @ts-ignore
            if (itemIndex === panelsRef.current.getIndex() && itemIndex !== currentPanelsSelectedIndex) {
              // @ts-ignore
              panelsRef.current.setIndex(currentPanelsSelectedIndex);
              setTimeout(() => {
                // @ts-ignore
                panelsRef.current.setIndex(itemIndex)
              }, 0)
            } else {
              // @ts-ignore
              panelsRef.current.setIndex(itemIndex)
            }
          }
        });

        index === 1 && (porps = {
          key: index,
          ref: panelsRef,
          anchorMap: anchorMap,
          panelsDataMap: panelsDataMap,
          scrollOffSet: scrollOffSet,
          onChooseMenuItem: (itemIndex: number) => {
            // @ts-ignore
            menusRef.current.setIndex(itemIndex)
          },
        });

        return React.cloneElement(child, porps)
      })}
    </View>
  )
});

export default Menu
