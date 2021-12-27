import React, { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Button from "@components/editor/button";
import Picker from "@components/editor/picker";
import Cylinder from "@pages/tools/calculator/surface-area/components/cylinder";
import Cone from "@pages/tools/calculator/surface-area/components/cone";
import Sphere from "@pages/tools/calculator/surface-area/components/sphere";
import Cuboid from "@pages/tools/calculator/surface-area/components/cuboid";
import Cube from "@pages/tools/calculator/surface-area/components/cube";
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
    <View className='surface-area'>
      <NavBar
        title='表面积计算器'
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
      <View className='surface-area-input-groups'>
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
        <View className='surface-area-result'>
          <View
            className='surface-area-result-label'
          >
            <Text className='surface-area-result-label-text'>
              表面积（S） =
            </Text>
          </View>
          <View className='surface-area-result-content'>
            <View className='surface-area-result-content-num'>
              <Text className='surface-area-result-content-num-text'>
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
