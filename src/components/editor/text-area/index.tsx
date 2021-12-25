import React, { useState } from "react";
import { Textarea, View, Image } from '@tarojs/components'
import './index.scss'

type Props = {
  style?: string,
  placeholder?: string,
  maxlength?: number,
  onInput?: Function,
}

const TextArea: React.FC<Props> = ({
  style = '',
  placeholder = '请输入内容',
  maxlength = -1,
  onInput = () => {},
}) => {
  const [value, setValue] = useState('');

  return (
    <View
      className='c-text-area'
      style={style}
    >
      <Textarea
        className='c-text-area-content'
        // @ts-ignore
        style={{ textAlignVertical: 'top' }}
        placeholder={placeholder}
        value={value}
        maxlength={maxlength}
        onInput={(event) => {
          const { detail: { value: content } } = event;
          onInput({ content });
          setValue(content);
        }}
      />
      <View
        className='c-text-area-clear'
        onClick={() => {
          onInput({ value: '' });
          setValue('');
        }}
      >
        <Image
          className='c-text-area-clear-img'
          src={require('../../../assets/images/clear.png')}
        />
      </View>
    </View>
  )
};

export default TextArea
