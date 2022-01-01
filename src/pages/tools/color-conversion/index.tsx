import React, { useMemo, useState } from 'react'
import { Block, Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Picker from "@components/editor/picker";
import Button from "@components/editor/button";
import Input from "@components/editor/input";
import { checkNumber, RGB2Hex, isValid, toast, Hex2RGB } from "@utils/index";
import './index.scss'

const pickRange = [
  'RGB转16进制',
  '16进制转RGB',
];

const Index: React.FC<any> = () => {
  const [selectorChecked, setSelectorChecked] = useState(0);
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');
  const [hex, setHex] = useState('');
  const [result, setResult] = useState('');

  const handerClick = () => {
    if (selectorChecked === 0) {
      switch (isValid(r, g, b)) {
        case 0:
          toast('（r）不能为空');
          return;
        case 1:
          toast('（g）不能为空');
          return;
        case 2:
          toast('（b）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(r, g, b)) {
        case 0:
          toast('输入的长度（a）有误，应为数字');
          return;
        case 1:
          toast('输入的宽度（b）有误，应为数字');
          return;
        case 2:
          toast('输入的高度（c）有误，应为数字');
          return;
        default:
          break;
      }

      if (parseInt(r) < 0 || parseInt(r) > 255) {
        toast('输入的r值有误，范围应为0-255');
        return
      }

      if (parseInt(g) < 0 || parseInt(g) > 255) {
        toast('输入的g值有误，范围应为0-255');
        return
      }

      if (parseInt(b) < 0 || parseInt(b) > 255) {
        toast('输入的b值有误，范围应为0-255');
        return
      }

      setResult(RGB2Hex(parseInt(r), parseInt(g), parseInt(b)))
    } else {
      if (!hex) {
        toast('请输入16进制的颜色值');
        return
      }

      setResult(Hex2RGB(hex))
    }

  };

  return (
    <View className='color-conver'>
      <NavBar
        title='颜色转换'
      />
      <Picker
        range={pickRange}
        selectorChecked={pickRange[selectorChecked]}
        onChange={(event) => {
          const { index = 0 } = event;
          setR('');
          setG('');
          setB('');
          setHex('');
          setResult('');
          setSelectorChecked(parseInt(index))
        }}
      />
      <View className='color-conver-input-groups'>
        {selectorChecked === 0 && (
          <Block>
            <Input
              label='（r）'
              labelStyle={IS_RN ? { width: 60 } : 'width:70px;'}
              placeholder='请输入r的数值'
              content={r.toString()}
              onInput={({ content }) => {
                setR(content)
              }}
            />
            <Input
              label='（g）'
              labelStyle={IS_RN ? { width: 60 } : 'width:70px;'}
              placeholder='请输入g的数值'
              content={g.toString()}
              onInput={({ content }) => {
                setG(content)
              }}
            />
            <Input
              label='（b）'
              labelStyle={IS_RN ? { width: 60 } : 'width:70px;'}
              placeholder='请输入b的数值'
              content={b.toString()}
              onInput={({ content }) => {
                setB(content)
              }}
            />
          </Block>
        )}

        {selectorChecked === 1 && (
          <Block>
            <Input
              type='text'
              label='（hex）'
              labelStyle={IS_RN ? { width: 75 } : 'width:85px;'}
              placeholder='请输入16进制的颜色值'
              content={hex.toString()}
              onInput={({ content }) => {
                setHex(content)
              }}
            />
          </Block>
        )}
      </View>
      <Button
        name='清空'
        backgroundColor='#FF4D4F'
        onClick={() => {
          // @ts-ignore
          setR('');
          setG('');
          setB('');
          setHex('');
          setResult('');
        }}
      />
      <Button
        name='转换'
        backgroundColor='#1E90FF'
        onClick={handerClick}
      />

      {useMemo(() => {
        return (
          !!result && (
            <View className='color-conver-result'>
              <View className='color-conver-result-content'>
                <Text
                  className='color-conver-result-content-text'
                >
                  {`${result}`}
                </Text>
              </View>
              <View
                className='color-conver-result-color-show'
              >
                <View
                  className='color-conver-result-color-show-detail'
                  style={IS_RN
                    ? { backgroundColor: result }
                    : `background-color:${result}`}
                />
              </View>
            </View>
          )
        )
      }, [result])}
    </View>
  )
};

export default Index
