import React from 'react'
import { Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";

import './index.scss'

const Index: React.FC<any> = () => {
  return (
    <View className='test'>
      <NavBar
        title='测试'
      />
      <Text>Test</Text>
    </View>
  )
};

export default Index
