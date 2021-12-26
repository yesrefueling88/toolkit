import React from "react";
import { Text, View, Input as TaroInput } from '@tarojs/components'
import './index.scss'

type Props = {
  style?: string | undefined,
  placeholder?: string | undefined,
  label?: string | undefined,
  labelStyle?: string | undefined,
  type?: "number" | "text" | "idcard" | "digit" | undefined,
  content?: string | undefined,
  onInput?: Function | undefined,
}

const Input: React.FC<Props> = ({
  style = '',
  placeholder = '请输入',
  label = '体积（V）',
  labelStyle = '',
  type = 'number',
  content = '',
  onInput = () => {},
}) => {

  return (
    <View
      className='c-input'
      style={style}
    >
      <View
        className='c-input-label'
        style={labelStyle}
      >
        <Text className='c-input-label-text'>{`${label} =`}</Text>
      </View>
      <View className='c-input-content'>
        <View className='c-input-content-taro-input'>
          <TaroInput
            className='c-input-content-taro-input-style'
            placeholderClass='c-input-content-taro-input-placeholder'
            placeholder={placeholder}
            value={content}
            type={type}
            onInput={(event) => {
              const { detail: { value } } = event;
              onInput({ content: value })
            }}
          />
        </View>
      </View>
    </View>
  )
};

export default Input