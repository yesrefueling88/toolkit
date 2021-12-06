import { forwardRef, ReactElement } from "react";
import { View } from '@tarojs/components'
import './tab-panel.scss'

type Props = {
  isSelected: false,
  children: Array<ReactElement>,
}

// @ts-ignore
const TabPanel: any = forwardRef((props: Props, ref) => {
  const { isSelected, children } = props;

  if (!isSelected) return null;

  return (
    <View className='c-tab-panel'>
      {children}
    </View>
  )
});

export default TabPanel
