import React, { useEffect, forwardRef, ReactElement, useState } from "react";
import { View, ScrollView } from '@tarojs/components'
import { createSelectorQuery } from "@utils/taro";
import './menu-panels.scss'

type Props = {
  children: Array<ReactElement>,
  selectedIndex: number,
  anchorMap: Map<number, { top: number, height: number }>,
}

// @ts-ignore
const MenuPanels: any = forwardRef((props: Props, ref) => {
  let { children, selectedIndex, anchorMap, } = props;
  let [scrollTop, setScrollTop] = useState(0);
  let anchor = anchorMap.get(selectedIndex);

  useEffect(() => {
    !IS_RN && anchorMap.size !== children.length && createSelectorQuery('.c-menu-panel').then((res: { success: boolean, data: Array<BoundingClientRectCallback>, msg: string }) => {
      let { success, data } = res;
      if (success) {
        data.forEach(item => {
          let { id, top, height } = item;
          anchorMap.set(parseInt(id), { top, height });
        })
      }
    })
  });

  if ((anchor != undefined) && (anchor.top != scrollTop)) {
    setScrollTop(anchor.top);
  }

  return (
    <View
      className='c-menu-panels'
    >
      <ScrollView
        className='c-menu-panels-scroll-view'
        scrollY
        scrollTop={scrollTop}
      >
        {children?.map((child, index) => {
          return React.cloneElement(child, {
            key: index,
            index: index,
            anchorMap: anchorMap,
          })
        })}
      </ScrollView>
    </View>
  )
});

export default MenuPanels
