import { useState, useImperativeHandle, forwardRef } from "react";
import { Block } from '@tarojs/components'
import Input from "@components/editor/input";
import { checkNumber, isValid, toast } from "@utils/index";

type Props = {
  onResult: Function,
}

// 计算圆柱体
const Cylinder = forwardRef((props: Props, ref) => {
  const {
    onResult = () => {
    }
  } = props;

  const [r, setR] = useState('');
  const [h, setH] = useState('');

  useImperativeHandle(ref, () => ({
    compute: () => {
      switch (isValid(r, h)) {
        case 0:
          toast('半径（r）不能为空');
          return;
        case 1:
          toast('高（h）不能为空');
          return;
        default:
          break;
      }

      switch (checkNumber(r, h)) {
        case 0:
          toast('输入的半径（r）有误，应为数字');
          return;
        case 1:
          toast('输入的高（h）有误，应为数字');
          return;
        default:
          break;
      }

      // S表=2πr²+2πrh
      let result = 2 * Math.PI * Math.pow(parseFloat(r), 2) + 2 * Math.PI * parseFloat(r) * parseFloat(h);

      onResult({ result })
    },
    reset: () => {
      setR('');
      setH('');
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
      <Input
        label='高（h）'
        placeholder='请输入高度'
        content={h.toString()}
        onInput={({ content }) => {
          setH(content)
        }}
      />
    </Block>
  )
});

export default Cylinder
