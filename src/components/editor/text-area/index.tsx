import React, { useEffect, useState } from "react";
import { Textarea, View, Image, Text } from '@tarojs/components'
import { getClipboardData, setClipboardData } from "@utils/index";
import './index.scss'

type Props = {
  style?: string | any,
  currentValue?: string,
  disabled?: boolean,
  placeholder?: string,
  maxlength?: number,
  isHidePasteBtn?: boolean,
  isHideClearBtn?: boolean,
  onInput?: Function,
  onClickCopy?: Function | null,
  onClickPaste?: Function | null,
  onClickClear?: Function,
}

const TextArea: React.FC<Props> = ({
  style = '',
  currentValue = '',
  disabled = false,
  placeholder = '请输入内容',
  maxlength = -1,
  isHidePasteBtn = false,
  isHideClearBtn = false,
  onInput = () => {},
  onClickCopy = null,
  onClickPaste = null,
  onClickClear = () => {},
}) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setValue(currentValue)
  }, [currentValue]);

  const onCopy = () => {
    if (onClickCopy) {
      onClickCopy();
      return
    }

    setClipboardData(value)
  };

  const onPaste = () => {
    if (onClickPaste) {
      onClickPaste();
      return
    }

    getClipboardData().then((res: { success: boolean, data: string }) => {
      let { success = false, data = '' } = res;

      if (success) {
        onInput({ content: data });
        setValue(data);
      }
    })
  };

  const onClear = () => {
    onInput({ value: '' });
    setValue('');
    onClickClear()
  };

  return (
    <View
      className='c-text-area'
      style={style}
    >
      <Textarea
        className={isActive
          ? 'c-text-area__content c-text-area__content--active'
          : 'c-text-area__content'
        }
        // @ts-ignore
        style={{ textAlignVertical: 'top' }}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        maxlength={maxlength}
        onInput={(event) => {
          const { detail: { value: content } } = event;
          onInput({ content });
          setValue(content);
        }}
        onFocus={() => {
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
        }}
      />

      <View
        className='c-text-area__copy'
        onClick={onCopy}
      >
        <Text className='c-text-area__copy-text'>复制</Text>
      </View>

      {!isHidePasteBtn && (
        <View
          className='c-text-area__paste'
          onClick={onPaste}
        >
          <Text className='c-text-area__paste-text'>粘贴</Text>
        </View>
      )}

      {!isHideClearBtn && (
        <View
          className='c-text-area__clear'
          onClick={onClear}
        >
          <Image
            className='c-text-area__clear-img'
            src={require('../../../assets/images/clear.png')}
          />
        </View>
      )}
    </View>
  )
};

export default TextArea
