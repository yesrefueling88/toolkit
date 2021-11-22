import React from 'react'
import { View, Image, Text } from '@tarojs/components'

import './index.scss'

const NavBar: React.FC<any> = () => {
  return (
    <View className='c-nav-bar'>
      <View className='c-nav-bar-logo'>
        <Image
          className='c-nav-bar-logo-img'
          src={require('../../assets/images/logo.png')}
        />
      </View>
      <View className='c-nav-bar-title'>
        <Text className='c-nav-bar-title-text'>工具箱</Text>
      </View>
      <View className='c-nav-bar-more-options'>
        <View className='c-nav-bar-more-options-icon'></View>
      </View>
    </View>
  )
};

export default NavBar
