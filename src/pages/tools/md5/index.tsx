import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import {
  NavBar,
  TextArea,
  Button,
} from '@components'
import { toast } from "@utils/index";
import { hex_md5 } from './lib/md5'
import './index.scss'

const Index: React.FC<any> = () => {
  const [temp, setTemp] = useState('');
  const [text, setText] = useState('');

  const reset = () => {
    setText('');
  };

  const handleClick = () => {
    if (!temp) {
      toast('请输入有效值');
      return
    }

    setText(hex_md5(temp))
  };

  return (
    <View className='md5'>
      <NavBar
        title='md5加密'
      />

      <TextArea
        placeholder='请输入待加密的文本...'
        onInput={(event) => {
          let { content } = event;
          setTemp(content)
        }}
        onClickClear={() => {
          reset()
        }}
      />

      <Button
        name='加密'
        backgroundColor='#1E90FF'
        onClick={handleClick}
      />

      {useMemo(() => {
        return (
          <TextArea
            placeholder='无'
            isHidePasteBtn
            isHideClearBtn
            currentValue={text}
          />
        )
      }, [text])}
    </View>
  )
};

export default Index
