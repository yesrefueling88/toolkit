import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, isValid, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算三角形
const Triangle = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [lengthA, setLengthA] = useState('');
  const [height, setHeight] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      switch (isValid(lengthA, height)) {
        case 0:
          toast('底（a）不能为空');
          return;
        case 1:
          toast('高（h）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(lengthA, height)) {
        case 0:
          toast('输入的底（a）有误，应为数字');
          return;
        case 1:
          toast('输入的高（h）有误，应为数字');
          return;
        default:
          break;
      }

      let result = (parseInt(lengthA) * parseInt(height)) / 2;

      onResult({ result })
    },
    reset: () => {
      setLengthA('');
      setHeight('');
    }
  }));

  return (
    <Block>
      <Input
        label='底边长（a）'
        placeholder='请输入底边长'
        content={lengthA.toString()}
        onInput={({ content }) => {
          setLengthA(content)
        }}
      />
      <Input
        label='高（h）'
        placeholder='请输入高'
        content={height.toString()}
        onInput={({ content }) => {
          setHeight(content)
        }}
      />
    </Block>
  )
});

export default Triangle
