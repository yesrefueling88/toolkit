import React, { forwardRef, ReactElement, useImperativeHandle, useState } from "react";
import { View } from '@tarojs/components'
import './menu-list.scss'

type Props = {
  children: Array<ReactElement>,
  style: string,  // CSS样式
  itemStyle: string,  // 子元素CSS样式
  onSelectItem: Function,
}

// @ts-ignore
const MenuList: any = forwardRef((props: Props, ref) => {
  const {
    children,
    style = '',
    itemStyle = '',
    onSelectItem = () => {},
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    setIndex: (index: number) => {
      setSelectedIndex(index)
    },
    getIndex: () => {
      return selectedIndex
    },
  }));

  return (
    <View
      className='c-menu-list'
      style={style}
    >
      {children?.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          index: index,
          style: itemStyle,
          isSelected: index === selectedIndex,
          onSelectItem: onSelectItem,
        })
      })}
    </View>
  )
});

export default MenuList
