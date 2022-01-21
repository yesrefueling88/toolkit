import React from "react";
import { Text, View, Picker as TaroPicker, Image } from '@tarojs/components'
import './index.scss'

type Props = {
  style?: string | undefined,
  range: string[],
  selectorChecked: string,
  onChange?: Function | undefined,
}

const Picker: React.FC<Props> = ({
  style = '',
  range = [],
  selectorChecked = '',
  onChange = () => {},
}) => {

  return (
    <View
      className='c-picker'
      style={style}
    >
      <TaroPicker
        mode='selector'
        range={range}
        onChange={(event) => {
          const { detail: { value } } = event;
          onChange({ index: value })
        }}
      >
        <View className='c-picker__content'>
          <View className='c-picker__content-label'>
            <Text className='c-picker__content-label-text'>{selectorChecked}</Text>
          </View>
          <View className='c-picker__content-icon'>
            <Image
              className='c-picker__content-icon-img'
              src={require('../../../assets/images/picker.png')}
            />
          </View>
        </View>
      </TaroPicker>
    </View>
  )
};

export default Picker
