import Taro from "@tarojs/taro";
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import QRCode from "@components/qr-code";
import TextArea from "@components/editor/text-area";
import Button from "@components/editor/button";
import './index.scss'

const Index: React.FC<any> = () => {
  const [canShowToast, setCanShowToast] = useState(false);
  const [text, setText] = useState('https://github.com/yesrefueling88/toolkit');
  const [temp, setTemp] = useState('https://github.com/yesrefueling88/toolkit');

  useEffect(() => {
    setCanShowToast(true);
  }, []);

  const handerClick = () => {
    setText(temp);
  };

  return (
    <View className='qr-code'>
      <NavBar
        title='生成二维码'
      />
      <View className='qr-code-content'>
        {useMemo(() => {
          if (canShowToast) {
            setTimeout(() => {
              Taro.showToast({
                title: '生成二维码成功!',
                icon: 'none',
                duration: 2000
              });
            }, 0)
          }

          return (
            <QRCode
              text={text}
              size={125}
              scale={4}
              errorCorrectLevel='M'
              typeNumber={2}
            />
          )
        }, [text])}
        {false && (
          <View className='qr-code-content-save'>
            <Text className='qr-code-content-save-btn'>保存图片</Text>
          </View>
        )}
      </View>
      <TextArea
        onInput={(event) => {
          const { content } = event;

          if (!!content) {
            setTemp(content);
          } else {
            setTemp('https://github.com/yesrefueling88/toolkit');
          }
        }}
      />
      <Button
        name='生成二维码'
        backgroundColor='#1E90FF'
        onClick={handerClick}
      />
    </View>
  )
};

export default Index
