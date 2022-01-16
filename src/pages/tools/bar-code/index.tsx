import React, { useEffect, useMemo, useState } from 'react'
import { Text, View } from '@tarojs/components'
import {
  NavBar,
  BarCode,
  TextArea,
  Button,
} from '@components'
import { toast } from "@utils/index";
import './index.scss'

const Index: React.FC<any> = () => {
  const [canShowToast, setCanShowToast] = useState(false);
  const [text, setText] = useState('0123456789');
  const [temp, setTemp] = useState('0123456789');

  useEffect(() => {
    setCanShowToast(true);
  }, []);

  const handerClick = () => {
    const reg = /[0-9]+/g;
    const temp_bak = temp.replace(reg, '');
    if (temp_bak.length > 0) {
      toast('请输入正确的值');
      return
    }

    setText(temp);
  };

  return (
    <View className='bar-code'>
      <NavBar
        title='生成条形码'
      />
      <View className='bar-code__content'>
        {useMemo(() => {
          if (canShowToast) {
            setTimeout(() => {
              toast('生成条形码成功!');
            }, 0)
          }

          return (
            <BarCode
              text={text}
              scale={4}
              width={300}
              height={60}
            />
          )
        }, [text])}
        {false && (
          <View className='bar-code__content-save'>
            <Text className='bar-code__content-save-btn'>保存图片</Text>
          </View>
        )}
      </View>
      <TextArea
        onInput={(event) => {
          const { content } = event;

          if (!!content) {
            setTemp(content);
          } else {
            setTemp('0123456789');
          }
        }}
      />
      <Button
        name='生成条形码'
        backgroundColor='#1E90FF'
        onClick={handerClick}
      />
    </View>
  )
};

export default Index
