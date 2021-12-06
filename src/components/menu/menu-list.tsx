import React, { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './menu-list.scss'

type Props = {
  children: Array<ReactElement>,
  selectedIndex: number,
  onSetSelectIndex: Function,
}

// @ts-ignore
const MenuList: any = forwardRef((props: Props, ref) => {
  const { children, selectedIndex, onSetSelectIndex } = props;

  return (
    <View className='c-menu-list'>
      {children?.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          index: index,
          isSelected: index === selectedIndex,
          onClick: (tabIndex: number) => {
            onSetSelectIndex(tabIndex)
          }
        })
      })}
    </View>
  )
});

export default MenuList
