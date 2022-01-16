import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import {
  NavBar,
  TextArea,
  Button,
  Picker,
} from '@components'
import { toast } from "@utils/index"
import './index.scss'

const pickRange = [
  '转换为大写',
  '转换为小写',
];

const Index: React.FC<any> = () => {
  const [selectorChecked, setSelectorChecked] = useState(0);
  const [temp, setTemp] = useState('');
  const [text, setText] = useState('');

  const reset = () => {
    setText('');
  };

  const doConver = () => {
    if (!temp) {
      toast('请输入待转换文本');
      return
    }

    const reg = /[a-zA-Z]/;
    let newText = '';
    for (let i = 0; i < temp.length - 1; i++) {
      if (reg.test(temp[i])) {
        selectorChecked === 0
          ? newText += temp[i].toLocaleUpperCase()
          : newText += temp[i].toLocaleLowerCase()
      } else {
        newText += temp[i]
      }
    }

    setText(newText)
  };

  return (
    <View className='case-conversion'>
      <NavBar
        title='英文大小写转换'
      />
      <Picker
        range={pickRange}
        selectorChecked={pickRange[selectorChecked]}
        onChange={(event) => {
          const { index = 0 } = event;
          reset();
          setSelectorChecked(parseInt(index))
        }}
      />

      <TextArea
        style={IS_RN ? { marginTop: -10 } : 'margin-top:-10px'}
        placeholder='请输入待转换文本...'
        onInput={(event) => {
          let { content } = event;
          setTemp(content)
        }}
        onClickClear={() => {
          reset()
        }}
      />

      <Button
        name='转换'
        backgroundColor='#1E90FF'
        onClick={doConver}
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
