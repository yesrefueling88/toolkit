import Taro from "@tarojs/taro";
import React from "react";
import { Image, Text, View } from '@tarojs/components'
import './item.scss'

type Props = {
  name?: string,  // 工具名称
  icon?: string | number,  // 工具的显示图标
  path?: string,  // 页面路径
}

// @ts-ignore
const ToolsItem: React.FC<Props> = ({
  name = 'IP查询',
  icon = require('../../assets/images/tools-item.png'),
  path: url = '',
}) => {

  const handleClick = () => {
    url && Taro.navigateTo({ url })
  };

  return (
    <View className='c-tool-item' onClick={handleClick}>
      <View className='c-tool-item__icon-wrap'>
        <Image
          src={icon}
          className='c-tool-item__icon-wrap-icon'
        />
      </View>
      <View className='c-tool-item__title-wrap'>
        <Text className='c-tool-item__title-wrap-text'>{name}</Text>
      </View>
    </View>
  )
};

export default ToolsItem
