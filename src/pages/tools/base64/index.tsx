import Taro from "@tarojs/taro";
import React, { useMemo, useState } from 'react'
import { Block, Image, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import TextArea from "@components/editor/text-area";
import Button from "@components/editor/button";
import Picker from "@components/editor/picker";
import { chooseImage, readFileOnBase64 } from "@utils/index";
import './index.scss'


const pickRange = [
  '图片转Base64',
  'Base64转图片',
];

const Index: React.FC<any> = () => {
  const [selectorChecked, setSelectorChecked] = useState(0);
  const [text, setText] = useState('');
  const [temp, setTemp] = useState('');
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const reset = () => {
    setText('');
    setTemp('');
    setImgSize({ width: 0, height: 0 });
  };

  const handleClick = () => {
    setText(temp);
  };

  return (
    <View className='base64'>
      <NavBar
        title='base64图片'
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
      {selectorChecked === 0 && (
        <Block>
          <TextArea
            style={IS_RN ? { marginTop: -10 } : 'margin-top:-10px'}
            currentValue={text}
            disabled
            placeholder='base64编码...'
            isHidePasteBtn
            onInput={(event) => {
              const { content } = event;

              if (!!content) {
                setTemp(content);
              }
            }}
            onClickClear={() => {
              reset()
            }}
          />
          <Button
            name='打开图片'
            backgroundColor='#1E90FF'
            onClick={() => {
              chooseImage({ count: 1 }).then((res: {
                success: boolean,
                path: string,
                paths: string,
                error: string
              }) => {
                Taro.showLoading({ title: '加载中' });
                let { success = false, path = '' } = res;
                if (!success) {
                  return
                }

                readFileOnBase64(path).then((base64: { success: boolean, data: string }) => {
                  let { success: suc = false, data = '' } = base64;
                  if (suc) {
                    setText(data)
                  }
                }).catch(() => {
                  Taro.hideLoading();
                })
              })
            }}
          />
        </Block>
      )}

      {selectorChecked === 1 && (
        <Block>
          <TextArea
            style={IS_RN ? { marginTop: -10 } : 'margin-top:-10px'}
            placeholder='请输入Base64编码'
            onInput={(event) => {
              const { content } = event;

              if (!!content) {
                setTemp(content);
              }
            }}
            onClickClear={() => {
              reset()
            }}
          />
          <Button
            name='转换'
            backgroundColor='#1E90FF'
            onClick={handleClick}
          />
        </Block>
      )}

      {useMemo(() => {
        return (
          !!text && (
            <View className='base64-img-show'>
              <Image
                className='base64-img-show-content'
                src={text}
                mode='heightFix'
                style={IS_RN && { width: imgSize.width, height: imgSize.height }}
                onLoad={event => {
                  Taro.hideLoading();

                  let { detail: { width = 0, height = 0 } } = event;
                  if (!IS_RN) {
                    return
                  }


                  // @ts-ignore
                  let ratio: number = width / height;
                  setImgSize({
                    width: 130 * ratio,
                    height: 130,
                  })
                }}
              />
            </View>
          )
        )
      }, [text, imgSize])}
    </View>
  )
};

export default Index
