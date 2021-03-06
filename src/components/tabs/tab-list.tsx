import React, { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './tab-list.scss'

type Props = {
  children: Array<ReactElement>,
  selectedIndex: number,
  onSetSelectIndex: Function,
}

// @ts-ignore
const TabList: any = forwardRef((props: Props, ref) => {
  const { children, selectedIndex, onSetSelectIndex } = props;

  return (
    <View className='c-tab-list'>
      {!!children && children.map((child, index) => {
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

export default TabList
