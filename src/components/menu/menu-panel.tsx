import { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './menu-panel.scss'

type Props = {
  index: number,
  children: Array<ReactElement>,
  anchorMap: Map<number, { top: number, height: number }>,
}

// @ts-ignore
const MenuPanel: any = forwardRef((props: Props, ref) => {
  let { index, children, anchorMap } = props;

  return (
    <View
      id={`${index}`}
      className='c-menu-panel'
      // @ts-ignore
      onLayout={({ nativeEvent: e }) => {
        let { layout: { height } } = e;
        anchorMap.set(index, { top: index * height, height: height })
      }}
    >
      {children}
    </View>
  )
});

export default MenuPanel
