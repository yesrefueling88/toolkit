import React from "react";
import { Text, View } from '@tarojs/components'
import './index.scss'

type Props = {
  style?: string | undefined,
  name?: string | undefined,
  backgroundColor?: string | undefined,
  onClick?: Function | undefined,
}

const Button: React.FC<Props> = ({
  style = '',
  name = '',
  backgroundColor = '',
  onClick = () => {},
}) => {

  return (
    <View
      className='c-button'
      style={style}
    >
      <View
        className='c-button__content'
        style={
          IS_RN
            ? { backgroundColor: backgroundColor }
            : `background-color: ${backgroundColor};`
        }
        onClick={() => {
          onClick()
        }}
      >
        <Text className='c-button__content-text'>{name}</Text>
      </View>
    </View>
  )
};

export default Button
