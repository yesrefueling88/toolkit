import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import {
  NavBar,
  TextArea,
  Button,
} from '@components'
import { toast } from "@utils/index";
import './index.scss'

const Index: React.FC<any> = () => {
  const [temp, setTemp] = useState('');
  const [text, setText] = useState('');

  const reset = () => {
    setText('');
  };

  const format = () => {
    try {
      let newText = JSON.stringify(JSON.parse(temp), null, "\t");
      setText(newText);
    } catch (e) {
      setText('');
      toast('输入的json文本的格式有误')
    }

  };

  return (
    <View className='json-format'>
      <NavBar
        title='Json格式化'
      />
      <TextArea
        placeholder='请输入Json文本...'
        onInput={(event) => {
          let { content } = event;
          setTemp(content)
        }}
        onClickClear={() => {
          reset()
        }}
      />

      <Button
        name='格式化'
        backgroundColor='#1E90FF'
        onClick={format}
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
