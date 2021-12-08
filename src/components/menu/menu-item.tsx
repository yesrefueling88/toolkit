import { forwardRef, ReactElement } from "react";
import { View, Text } from '@tarojs/components'
import './menu-item.scss'

type Props = {
  children: Array<ReactElement>,
  index: 0,
  isSelected: false,
  style: string,
  onClick: Function,
}

// @ts-ignore
const MenuItem: any = forwardRef((props: Props, ref) => {
  const { children, index, isSelected, style = '', onClick } = props;

  return (
    <View
      className={isSelected ? 'c-menu-item active' : 'c-menu-item'}
      style={style}
      onClick={() => onClick(index)}
    >
      {isSelected && <View className='c-menu-item-flag'></View>}
      <Text
        className={isSelected ? 'c-menu-item-text active-text' : 'c-menu-item-text'}
      >
        {children}
      </Text>
    </View>
  )
});

export default MenuItem
