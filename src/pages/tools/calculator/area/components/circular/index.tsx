import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算圆形
const Circular = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [r, setR] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      if (!r) {
        toast('半径（r）不能为空');
        return;
      }

      if (!checkNumber(r)) {
        toast('输入的半径（r）有误，应为数字');
        return;
      }

      let result = Math.PI * Math.pow(parseInt(r), 2);

      onResult({ result })
    },
    reset: () => {
      setR('');
    }
  }));

  return (
    <Block>
      <Input
        label='半径（r）'
        placeholder='请输入半径'
        content={r.toString()}
        onInput={({ content }) => {
          setR(content)
        }}
      />
    </Block>
  )
});

export default Circular
