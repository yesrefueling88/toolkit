import React from 'react'
import { Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";

import './index.scss'

const Index: React.FC<any> = () => {
  return (
    <View className='md5'>
      <NavBar
        title='md5'
      />
      <Text>Test</Text>
    </View>
  )
};

export default Index
