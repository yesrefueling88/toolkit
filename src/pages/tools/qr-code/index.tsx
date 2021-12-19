import React, { useMemo, useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import QRCode from "@components/qr-code";

import './index.scss'

const Index: React.FC<any> = () => {
  const [text, setText] = useState('https://github.com/yesrefueling88/toolkit');
  const [temp, setTemp] = useState('https://github.com/yesrefueling88/toolkit');

  const handerClick = () => {
    setText(temp);
  };

  return (
    useMemo(() => {
      return (
        <View className='qr-code'>
          <NavBar
            title='生成二维码'
          />
          <View className='qr-code-content'>
            {!IS_RN && (
              <QRCode
                text={text}
                size={125}
                scale={4}
                errorCorrectLevel='M'
                typeNumber={2}
              />
            )}
            <View className='qr-code-content-save'>
              <Text className='qr-code-content-save-btn'>保存图片</Text>
            </View>
          </View>
          <View className='qr-code-edit-box'>
            <Textarea
              // @ts-ignore
              style={{ textAlignVertical: 'top' }}
              className='qr-code-edit-box-textarea'
              placeholder='请输入内容'
              maxlength={-1}
              onInput={(event) => {
                let { detail: { value } } = event;

                if (!!value) {
                  setTemp(value);
                } else {
                  setTemp('https://github.com/yesrefueling88/toolkit');
                }
              }}
            />
          </View>
          <View className='qr-code-generate' onClick={handerClick}>
            <View
              className='qr-code-generate-btn'
              hoverStayTime={10}
              hoverClass='qr-code-generate-hover'
              hoverStyle={{
                backgroundColor: '#4097E6'
              }}
            >
              <Text className='qr-code-generate-btn-text'>生成二维码</Text>
            </View>
          </View>
        </View>
      )
    }, [text, temp])
  )
};

export default Index
