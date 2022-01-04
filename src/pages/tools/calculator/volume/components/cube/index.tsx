import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算立方体
const Cube = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [length, setLength] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      if (!length) {
        toast('边长（a）不能为空');
        return;
      }

      if (!checkNumber(length)) {
        toast('输入的边长（a）有误，应为数字');
        return;
      }

      let result = Math.pow(parseFloat(length), 3);

      onResult({ result })
    },
    reset: () => {
      setLength('');
    }
  }));

  return (
    <Block>
      <Input
        label='边长（a）'
        placeholder='请输入边长'
        content={length.toString()}
        onInput={({ content }) => {
          setLength(content)
        }}
      />
    </Block>
  )
});

export default Cube
