import Taro from "@tarojs/taro";
import React, { useMemo, useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import {
  NavBar,
  TextArea,
} from '@components'
import { toast } from "@utils/index";
import './index.scss'

const Index: React.FC<any> = () => {
  const [temp, setTemp] = useState('');
  const [regular, setRegular] = useState('');
  const [text, setText] = useState('');
  const [isInputing, setIsInputing] = useState(false);

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
      <View className='regular__input'>
        <View
          className={isInputing
            ? 'regular__input-content regular__input-content--active'
            : 'regular__input-content'
          }
        >
          <Input
            className='regular__input-content-comp-style'
            placeholder='请输入正则表达式...'
            placeholderClass='regular__input-content-placeholder'
            value={regular}
            onInput={(event) => {
              let { detail: { value } } = event;

              setRegular(value);
            }}
            onFocus={() => {
              Taro.eventCenter.trigger('teatArea_setLock', true);
              setIsInputing(true)
            }}
            onBlur={() => {
              Taro.eventCenter.trigger('teatArea_setLock', false);
              setIsInputing(false);
            }}
          />
        </View>
        <View className='regular__input-clear' onClick={onClear}>
          <Text className='regular__input-clear-text'>清空</Text>
        </View>
        <View className='regular__input-start' onClick={onRegular}>
          <Text className='regular__input-start-text'>匹配</Text>
        </View>
      </View>

      {useMemo(() => {
        return (
          <TextArea
            placeholder='无'
            disabled
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
