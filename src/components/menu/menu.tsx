import React, { forwardRef, ReactElement, useState } from "react";
import { View } from '@tarojs/components'
import './menu.scss'

let anchorMap = new Map<number, { top: number, height: number }>();

// @ts-ignore
const Menu: any = forwardRef((props: { children: Array<ReactElement> }, ref) => {
  let { children } = props;
  let [selectedIndex, setIndex] = useState(0);

  return (
    <View className='c-menu'>
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
        });

        return React.cloneElement(child, porps)
      })}
    </View>
  )
});

export default Menu
