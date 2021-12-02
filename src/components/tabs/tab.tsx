import { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './tab.scss'

type Props = {
  children: Array<ReactElement>,
  index: 0,
  isSelected: false,
  onClick: Function,
}

// @ts-ignore
const Tab: any = forwardRef((props: Props, ref) => {
  let { children, index, isSelected, onClick } = props;
  console.info(isSelected)
  return (
    <View className='c-tab' onClick={() => onClick(index)}>
      {children}
    </View>
  )
});

export default Tab
