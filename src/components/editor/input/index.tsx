import React, { useState } from "react";
import { Text, View, Input as TaroInput } from '@tarojs/components'
import './index.scss'

type Props = {
  style?: string | undefined,
  placeholder?: string | undefined,
  label?: string | undefined,
  labelStyle?: string | any,
  type?: "number" | "text" | "idcard" | "digit" | undefined,
  content?: string | undefined,
  onInput?: Function | undefined,
}

const Input: React.FC<Props> = ({
  style = '',
  placeholder = '请输入',
  label = '体积（V）',
  labelStyle = '',
  type = 'digit',
  content = '',
  onInput = () => {},
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View
      className='c-input'
      style={style}
    >
      <View
        className='c-input__label-content'
        style={labelStyle}
      >
        <View
          className={isActive
            ? 'c-input__label-content-detail'
            : 'c-input__label-content-detail'
          }
        >
          <Text className='c-input__label-content-detail-text'>{`${label}`}</Text>
        </View>
      </View>
      <View className='c-input__content'>
        <View
          className={isActive
            ? 'c-input__content-taro-input c-input--active'
            : 'c-input__content-taro-input'
          }
        >
          <TaroInput
            className='c-input__content-taro-input-style'
            placeholderClass='c-input__content-taro-input-placeholder'
            placeholder={placeholder}
            value={content}
            type={type}
            onInput={(event) => {
              const { detail: { value } } = event;
              onInput({ content: value })
            }}
            onFocus={() => {
              setIsActive(true);
            }}
            onBlur={() => {
              setIsActive(false);
            }}
          />
        </View>
      </View>
    </View>
  )
};

export default Input
