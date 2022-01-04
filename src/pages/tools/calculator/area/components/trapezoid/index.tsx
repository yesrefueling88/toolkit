import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, isValid, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算梯形
const Trapezoid = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [lengthA, setLengthA] = useState('');
  const [lengthB, setLengthB] = useState('');
  const [height, setHeight] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      switch (isValid(lengthA, lengthB, height)) {
        case 0:
          toast('上底（a）不能为空');
          return;
        case 1:
          toast('下底（b）不能为空');
          return;
        case 2:
          toast('高度（h）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(lengthA, lengthB, height)) {
        case 0:
          toast('输入的上底（a）有误，应为数字');
          return;
        case 1:
          toast('输入的下底（b）有误，应为数字');
          return;
        case 2:
          toast('输入的高度（h）有误，应为数字');
          return;
        default:
          break;
      }

      let result = (parseFloat(lengthA) + parseFloat(lengthB)) * parseFloat(height) / 2;

      onResult({ result })
    },
    reset: () => {
      setLengthA('');
      setLengthB('');
      setHeight('');
    }
  }));

  return (
    <Block>
      <Input
        label='上底（a）'
        placeholder='请输入上底长度'
        content={lengthA.toString()}
        onInput={({ content }) => {
          setLengthA(content)
        }}
      />
      <Input
        label='下底（b）'
        placeholder='请输入下底长度'
        content={lengthB.toString()}
        onInput={({ content }) => {
          setLengthB(content)
        }}
      />
      <Input
        label='高度（h）'
        placeholder='请输入高度'
        content={height.toString()}
        onInput={({ content }) => {
          setHeight(content)
        }}
      />
    </Block>
  )
});

export default Trapezoid
