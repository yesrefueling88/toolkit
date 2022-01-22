import Taro from "@tarojs/taro";
import React, { forwardRef, memo, ReactElement, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ScrollView, View } from '@tarojs/components'
import { createSelectorQuery } from "@utils/taro";
import { MenuAnchorItem } from "@components/menu/menu";
import { debounce } from "@utils/index";
import './menu-panels.scss'

type Props = {
  children: Array<ReactElement>,
  anchorMap: Map<number, MenuAnchorItem>,  // menuItem的锚点对象映射
  panelsDataMap: Map<any, any>,
  scrollOffSet: number,  // 点击menuItem后, 滚动轴跳转的偏移量
  onChooseMenuItem: Function,
}

// @ts-ignore
const MenuPanels: any = memo(forwardRef((props: Props, ref) => {
  let {
    children,
    anchorMap,
    panelsDataMap,
    scrollOffSet = 0,
    onChooseMenuItem = () => {
    },
  } = props;

  const randomOffset = useRef(0);
  // @ts-ignore
  const [doRefresh, setDoRefresh] = useState(0);

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

    Taro.eventCenter.on('onGoToBottom', debounce(onGoToBottom, 100));

    return () => {
      Taro.eventCenter.off('onGoToBottom')
    }
  }, []);

  useImperativeHandle(ref, () => ({
    setIndex: (index: number) => {
      randomOffset.current === 0 ? randomOffset.current = 1 : randomOffset.current = 0;
      panelsDataMap.set('currentSelectedIndex', index);
      panelsDataMap.set('setFinalScrollTop', (anchorMap.get(panelsDataMap.get('currentSelectedIndex'))!.top - scrollOffSet + randomOffset.current));
      setDoRefresh(new Date().getTime())
    },
    getIndex: () => {
      return panelsDataMap.get('currentSelectedIndex')
    },
  }));

  const onGoToBottom = () => {
    onChooseMenuItem(anchorMap.size - 1);
    randomOffset.current === 0 ? randomOffset.current = 1 : randomOffset.current = 0;
    panelsDataMap.set('currentSelectedIndex', anchorMap.size - 1);
    panelsDataMap.set('setFinalScrollTop', (anchorMap.get(panelsDataMap.get('currentSelectedIndex'))!.top - scrollOffSet + randomOffset.current));
    setDoRefresh(new Date().getTime())
  };

  const currentIndex = panelsDataMap.get('currentSelectedIndex');

  return (
    <View
      className='c-menu-panels'
    >
      <ScrollView
        className='c-menu-panels__scroll-view'
        scrollY
        scrollTop={
          anchorMap.get(currentIndex) != undefined
            ? anchorMap.get(currentIndex)!.top - scrollOffSet + randomOffset.current
            : 0
        }
        scrollWithAnimation
        onScroll={debounce((e) => {
          let { detail: { scrollTop: top } } = e;

          if (panelsDataMap.get('setFinalScrollTop') != -1) {
            let gap = Math.abs(Math.floor(panelsDataMap.get('setFinalScrollTop')! - top));
            if (gap <= 2) {
              panelsDataMap.set('setFinalScrollTop', -1);
            }
            return;
          }

          if (top > anchorMap.get(anchorMap.size - 1)!.top - scrollOffSet + 2) {
            Taro.eventCenter.trigger('onGoToBottom');
            return
          }

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

          panelsDataMap.set('currentSelectedIndex', currentSelectedIndex);
          onChooseMenuItem(currentSelectedIndex);
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
