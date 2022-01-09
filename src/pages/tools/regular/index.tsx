import React, { useMemo, useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import TextArea from "@components/editor/text-area";
import './index.scss'
import { toast } from "@utils/index";

const Index: React.FC<any> = () => {
  const [temp, setTemp] = useState('');
  const [regular, setRegular] = useState('');
  const [text, setText] = useState('');

  const reset = () => {
    setText('');
    setRegular('')
  };

  const onClear = () => {
    reset()
  };

  const onRegular = () => {
    if (!temp) {
      toast('请输入正确的待匹配文本');
      return
    }

    let pattern = new RegExp(regular, 'gi');
    let res = temp.match(pattern);
    let newText = '';
    res?.forEach((item, index) => {
      newText += item;
      index != res!.length - 1 && (newText += '\n');
    });

    setText(newText)
  };

  return (
    <View className='regular'>
      <NavBar
        title='正则表达式'
      />
      <TextArea
        placeholder='待匹配的文本...'
        onInput={(event) => {
          let { content } = event;
          setTemp(content)
        }}
        onClickClear={() => {
          reset()
        }}
      />
      <View className='regular-input'>
        <View className='regular-input-content'>
          <Input
            className='regular-input-content-input-style'
            placeholder='请输入正则表达式...'
            placeholderClass='regular-input-content-placeholder'
            value={regular}
            onInput={(event) => {
              let { detail: { value } } = event;

              setRegular(value);
            }}
          />
        </View>
        <View className='regular-input-clear' onClick={onClear}>
          <Text className='regular-input-clear-text'>清空</Text>
        </View>
        <View className='regular-input-start' onClick={onRegular}>
          <Text className='regular-input-start-text'>匹配</Text>
        </View>
      </View>

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
