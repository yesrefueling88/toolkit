import { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './menu-item.scss'

type Props = {
  children: Array<ReactElement>,
  index: 0,
  isSelected: false,
  onClick: Function,
}

// @ts-ignore
const MenuItem: any = forwardRef((props: Props, ref) => {
  let { children, index, isSelected, onClick } = props;
  //console.info(isSelected)
  return (
    <View className='c-menu-item' onClick={() => onClick(index)}>
      {children}
    </View>
  )
});

export default MenuItem
