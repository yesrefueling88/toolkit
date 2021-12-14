import React, { forwardRef, memo, ReactElement, useEffect, useState } from "react";
import { ScrollView, View } from '@tarojs/components'
import { createSelectorQuery } from "@utils/taro";
import { MenuAnchorItem } from "@components/menu/menu";
import { debounce } from "@utils/index";
import './menu-panels.scss'

type Props = {
  children: Array<ReactElement>,
  anchorMap: Map<number, MenuAnchorItem>,  // menuItem的锚点对象映射
  selectedIndex: number,  // 当前选中的menuItem值
  scrollOffSet: number,  // 点击menuItem后, 滚动轴跳转的偏移量
  onSetSelectIndex: Function,  // 设置当前选中的menuItem值
}

// @ts-ignore
const MenuPanels: any = memo(forwardRef((props: Props, ref) => {
  let {
    children,
    anchorMap,
    selectedIndex,
    scrollOffSet = 0,
    onSetSelectIndex
  } = props;
  const [dataMap] = useState(new Map([['scrollTop', 0], ['selectedIndex', 0]]));

  // 检测滚动条位置是否需要更新
  let anchor = anchorMap.get(selectedIndex);
  if (selectedIndex != dataMap.get('selectedIndex') && anchor != undefined) {
    dataMap.set('scrollTop', anchor.top - scrollOffSet);
    dataMap.set('selectedIndex', selectedIndex);
  }

  useEffect(() => {
    // 获取所有子元素的宽高等信息
    !IS_RN && createSelectorQuery('.c-menu-panel').then((res: { success: boolean, data: Array<BoundingClientRectCallback>, msg: string }) => {
      let { success, data } = res;
      if (success) {
        data.forEach(item => {
          let { id, top, bottom, width, height } = item;
          anchorMap.set(parseInt(id), { top, bottom, width, height });
        })
      }
    })
  }, []);

  return (
    <View
      className='c-menu-panels'
    >
      <ScrollView
        className='c-menu-panels-scroll-view'
        scrollY
        scrollTop={dataMap.get('scrollTop')}
        onScroll={debounce((e) => {
          let { detail: { scrollTop: top } } = e;

          let currentScrollTop = dataMap.get('scrollTop') != undefined
            ? dataMap.get('scrollTop')
            : -1;

          if (currentScrollTop != -1 && Math.abs(currentScrollTop! - top) < 5) return;

          // 计算当前滚动位置对对应于哪个menuItem
          let anchorArr = Array.from(anchorMap.values());
          let currentSelectedIndex = 0;
          anchorArr.some((anchorItem, index) => {
            if (top + scrollOffSet >= anchorItem.top && top + scrollOffSet < anchorItem.bottom) {
              currentSelectedIndex = index;
              return true
            } else {
              return false;
            }
          });

          // 将滚动条的状态保存起来
          dataMap.set('scrollTop', top);
          dataMap.set('selectedIndex', currentSelectedIndex);
          // 将滚动条信息回传给上一级组件
          onSetSelectIndex(currentSelectedIndex);
        }, 0)}
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
}));

export default MenuPanels
