import React, { useState } from 'react'
import { View, Block, Text } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Input from "@components/editor/input";
import Button from "@components/editor/button";
import Picker from "@components/editor/picker";
import './index.scss'

const shapeRange = [
  '圆柱',
  '圆锥',
  '球体',
];

const Index: React.FC<any> = () => {
  const [selectorChecked, setSelectorChecked] = useState(0);
  const [r, serR] = useState('');
  const [h, setH] = useState('');
  const [result, setResult] = useState('');

  const handerClick = () => {
    let radius = parseInt(r);
    let height = parseInt(h);

    switch (selectorChecked) {
      case 0:
        // @ts-ignore
        setResult(Math.PI * radius * radius * height);
        break;
      case 1:
        // @ts-ignore
        setResult((Math.PI * radius * radius * height) / 3);
        break;
      case 2:
        // @ts-ignore
        setResult(4 * (Math.PI * radius * radius * radius) / 3);
        break;
      default:
        break
    }
  };

  return (
    <View className='volume'>
      <NavBar
        title='体积计算器'
      />
      <Picker
        range={shapeRange}
        selectorChecked={shapeRange[selectorChecked]}
        onChange={(event) => {
          const { index = 0 } = event;
          serR('');
          setH('');
          setResult('');
          setSelectorChecked(parseInt(index))
        }}
      />
      <View className='volume-input-groups'>
        {[0, 1].includes(selectorChecked) && (
          <Block>
            <Input
              label='（r）'
              placeholder='请输入圆半径'
              content={r.toString()}
              onInput={({ content }) => {
                serR(content)
              }}
            />
            <Input
              label='（h）'
              placeholder='请输入圆柱高'
              content={h.toString()}
              onInput={({ content }) => {
                setH(content)
              }}
            />
          </Block>
        )}

        {selectorChecked === 2 && (
          <Block>
            <Input
              label='（r）'
              placeholder='请输入圆半径'
              content={r.toString()}
              onInput={({ content }) => {
                serR(content)
              }}
            />
          </Block>
        )}
      </View>
      <Button
        name='计算'
        backgroundColor='#1E90FF'
        onClick={handerClick}
      />
      {!!result && (
        <View className='volume-result'>
          <View
            className='volume-result-label'
          >
            <Text className='volume-result-label-text'>
              （v） =
            </Text>
          </View>
          <View className='volume-result-content'>
            <View className='volume-result-content-num'>
              <Text className='volume-result-content-num-text'>
                {result}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
};

export default Index
