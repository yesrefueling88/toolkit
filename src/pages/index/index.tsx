import React from 'react'
import { View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import './index.scss'

const Index: React.FC<any> = () => {

  return (
    <View className='index'>
      <NavBar
        isHomePage
      />
    </View>
  )

};

export default Index

