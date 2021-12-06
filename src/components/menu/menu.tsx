import React, { forwardRef, ReactElement, useState } from "react";
import { View } from '@tarojs/components'
import './menu.scss'

type Props = {
  children: Array<ReactElement>,
  style?: string,
  scrollOffSet?: number,
}

// @ts-ignore
const Menu: any = forwardRef((props: Props, ref) => {
  const { children, style = '', scrollOffSet = 0 } = props;
  const [selectedIndex, setIndex] = useState(0);
  const [anchorMap] = useState(new Map<number, { top: number, height: number }>());

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

            setIndex(tabIndex);
          }
        });

        index === 1 && (porps = {
          key: index,
          selectedIndex: selectedIndex,
          anchorMap: anchorMap,
          scrollOffSet: scrollOffSet,
        });

        return React.cloneElement(child, porps)
      })}
    </View>
  )
});

export default Menu
