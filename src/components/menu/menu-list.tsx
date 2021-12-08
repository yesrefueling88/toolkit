import React, { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './menu-list.scss'

type Props = {
  children: Array<ReactElement>,
  selectedIndex: number,
  onSetSelectIndex: Function,
  style: string,
  itemStyle: string,
}

// @ts-ignore
const MenuList: any = forwardRef((props: Props, ref) => {
  const { children, selectedIndex, onSetSelectIndex, style = '', itemStyle = '' } = props;

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
          onClick: (tabIndex: number) => {
            onSetSelectIndex(tabIndex)
          }
        })
      })}
    </View>
  )
});

export default MenuList
