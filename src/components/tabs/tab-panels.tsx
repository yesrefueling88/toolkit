import React, { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './tab-panels.scss'

type Props = {
  children: Array<ReactElement>,
  selectedIndex: number,
}

// @ts-ignore
const TabPanels: any = forwardRef((props: Props, ref) => {
  const { children, selectedIndex } = props;

  return (
    <View className='c-tab-panels'>
      {!!children && children.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          isSelected: index === selectedIndex
        })
      })}
    </View>
  )
});

export default TabPanels
