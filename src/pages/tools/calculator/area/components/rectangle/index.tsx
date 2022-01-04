import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, isValid, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算长方形
const Rectangle = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      switch (isValid(length, width)) {
        case 0:
          toast('长度（a）不能为空');
          return;
        case 1:
          toast('宽度（b）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(length, width)) {
        case 0:
          toast('输入的长度（a）有误，应为数字');
          return;
        case 1:
          toast('输入的宽度（b）有误，应为数字');
          return;
        default:
          break;
      }

      let result = parseFloat(length) * parseFloat(width);

      onResult({ result })
    },
    reset: () => {
      setLength('');
      setWidth('');
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
    </Block>
  )
});

export default Rectangle
