import React, { useState, forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './tabs.scss'

// @ts-ignore
const Tabs: any = forwardRef((props: { children: Array<ReactElement> }, ref) => {
  let { children } = props;
  let [selectedIndex, setIndex] = useState(0);

  return (
    <View className='c-tabs'>
      {!!children && children.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          selectedIndex: selectedIndex,
          onSetSelectIndex: (tabIndex) => {
            if (selectedIndex == tabIndex) return;

            setIndex(tabIndex);
          }
        })
      })}
    </View>
  )
});

export default Tabs
