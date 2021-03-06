import React, { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import {
  NavBar,
  Button,
  Picker,
} from '@components'
import Cylinder from "@pages/tools/calculator/volume/components/cylinder";
import Cone from "@pages/tools/calculator/volume/components/cone";
import Sphere from "@pages/tools/calculator/volume/components/sphere";
import Cuboid from "@pages/tools/calculator/volume/components/cuboid";
import Cube from "@pages/tools/calculator/volume/components/cube";
import './index.scss'

const shapeRange = [
  '圆柱', // 0 => Cylinder
  '圆锥', // 1 => Cone
  '球体', // 2 => Sphere
  '长方体', // 3 => Cuboid
  '立方体', // 4 => Cube
];

const shapeType = {
  Cylinder: 0,
  Cone: 1,
  Sphere: 2,
  Cuboid: 3,
  Cube: 4,
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
    <View className='volume'>
      <NavBar
        title='体积计算器'
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
      <View className='volume__input-groups'>
        {selectorChecked === shapeType.Cylinder && (
          <Cylinder
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Cone && (
          <Cone
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Sphere && (
          <Sphere
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Cuboid && (
          <Cuboid
            ref={componentRef}
            onResult={({ result: newResult }) => {
              setResult(newResult)
            }}
          />
        )}

        {selectorChecked === shapeType.Cube && (
          <Cube
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
        <View className='volume__result'>
          <View
            className='volume__result-label'
          >
            <Text className='volume__result-label-text'>
              体积 (V) =
            </Text>
          </View>
          <View className='volume__result-content'>
            <View className='volume__result-content-num'>
              <Text className='volume__result-content-num-text'>
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
