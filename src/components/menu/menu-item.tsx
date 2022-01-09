import { forwardRef, ReactElement } from "react";
import { View, Text } from '@tarojs/components'
import './menu-item.scss'

type Props = {
  children: Array<ReactElement>,
  index: 0,  // 当前索引
  isSelected: false,  // 当前menuItem是否选中
  style: string,  // CSS样式
  onSelectItem: Function,  // 点击munuItem后, 将当前组件索引回传给上一级组件
}

// @ts-ignore
const MenuItem: any = forwardRef((props: Props, ref) => {
  const {
    children,
    index,
    isSelected,
    style = '',
    onSelectItem = () => {},
  } = props;
  return (
    <View
      className={isSelected ? 'c-menu-item active' : 'c-menu-item'}
      style={style}
      onClick={() => {
        onSelectItem(index)
      }}
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
