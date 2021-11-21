import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { add, minus, asyncAdd } from '@actions/counter'

import './index.scss'

type State = {
  counter: {
    num: number
  }
}

const Index: React.FC<any> = () => {
  let { counter: { num } } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  return (
    <View className='index'>
      <Button className='add_btn' onClick={() => dispatch(add())}>+</Button>
      <Button className='dec_btn' onClick={() => dispatch(minus())}>-</Button>
      <Button className='dec_btn' onClick={() => dispatch(asyncAdd())}>async</Button>
      <View><Text>{num}</Text></View>
      <View><Text>Hello, World</Text></View>
    </View>
  )

}

export default Index

