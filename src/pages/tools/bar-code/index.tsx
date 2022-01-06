import React, { useEffect, useMemo, useState } from 'react'
import { Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import { toast } from "@utils/index";
import BarCode from "@components/bar-code";
import TextArea from "@components/editor/text-area";
import Button from "@components/editor/button";
import './index.scss'

const Index: React.FC<any> = () => {
  const [canShowToast, setCanShowToast] = useState(false);
  const [text, setText] = useState('0123456789');
  const [temp, setTemp] = useState('0123456789');

  useEffect(() => {
    setCanShowToast(true);
  }, []);

  const handerClick = () => {
    const reg = /([\u4E00-\u9FFF]+)|([\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]+)/g;
    if (reg.test(temp)) {
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
      <View className='bar-code-content'>
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
          <View className='bar-code-content-save'>
            <Text className='bar-code-content-save-btn'>保存图片</Text>
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
