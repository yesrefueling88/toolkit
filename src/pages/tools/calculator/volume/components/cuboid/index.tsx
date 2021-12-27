import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, isValid, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算长方体
const Cuboid = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      switch (isValid(length, width, height)) {
        case 0:
          toast('长度（a）不能为空');
          return;
        case 1:
          toast('宽度（b）不能为空');
          return;
        case 2:
          toast('高度（c）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(length, width, height)) {
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

      let result = parseInt(length) * parseInt(width) * parseInt(height);

      onResult({ result })
    },
    reset: () => {
      setLength('');
      setWidth('');
      setHeight('');
    }
  }));

  return (
    <Block>
      <Input
        label='长度（a）'
        placeholder='请输入长度'
        content={length.toString()}
        onInput={({ content }) => {
          setLength(content)
        }}
      />
      <Input
        label='宽度（b）'
        placeholder='请输入宽度'
        content={width.toString()}
        onInput={({ content }) => {
          setWidth(content)
        }}
      />
      <Input
        label='高度（c）'
        placeholder='请输入高度'
        content={height.toString()}
        onInput={({ content }) => {
          setHeight(content)
        }}
      />
    </Block>
  )
});

export default Cuboid
