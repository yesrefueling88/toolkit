import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import NavBar from "../../components/nav-bar";

const Index: React.FC<any> = () => {

  return (
    <View className='index'>
      <NavBar />
    </View>
  )

};

export default Index

