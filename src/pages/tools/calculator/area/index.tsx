import React, { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import {
  NavBar,
  Button,
  Picker,
} from '@components'
import Square from "@pages/tools/calculator/area/components/square";
import Rectangle from "@pages/tools/calculator/area/components/rectangle";
import Circular from "@pages/tools/calculator/area/components/circular";
import Triangle from "@pages/tools/calculator/area/components/triangle";
import Trapezoid from "@pages/tools/calculator/area/components/trapezoid";
import './index.scss'

const shapeRange = [
  '正方形', // 0 => square
  '长方形', // 1 => reacangle
  '圆形', // 2 => circular
  '三角形', // 3 => triangle
  '梯形', // 4 => trapezoid
];

const shapeType = {
  Square: 0,
  Reacangle: 1,
  Circular: 2,
  Triangle: 3,
  Trapezoid: 4,
};

const Index: React.FC<any> = () => {
  const componentRef = useRef();
  const [selectorChecked, setSelectorChecked] = useState(0);
  const [result, setResult] = useState('');

  const handerClick = () => {
    // @ts-ignore
    componentRef.current?.compute()
  };

  return (
    <View className='area'>
      <NavBar
        title='面积计算器'
      />
      <Picker
        range={shapeRange}
        selectorChecked={shapeRange[selectorChecked]}
        onChange={(event) => {
          const { index = 0 } = event;
          setResult('');
          setSelectorChecked(parseInt(index))
        }}
      />
      <View className='area__input-groups'>
        {selectorChecked === shapeType.Square && (
          <Square
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Reacangle && (
          <Rectangle
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Circular && (
          <Circular
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Triangle && (
          <Triangle
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Trapezoid && (
          <Trapezoid
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}
      </View>
      <Button
        name='重置'
        backgroundColor='#FF4D4F'
        onClick={() => {
          // @ts-ignore
          componentRef.current?.reset();
          setResult('');
        }}
      />
      <Button
        name='计算'
        backgroundColor='#1E90FF'
        onClick={handerClick}
      />
      {!!result && (
        <View className='area__result'>
          <View
            className='area__result-label'
          >
            <Text className='area__result-label-text'>
              面积 (S) =
            </Text>
          </View>
          <View className='area__result-content'>
            <View className='area__result-content-num'>
              <Text className='area__result-content-num-text'>
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
