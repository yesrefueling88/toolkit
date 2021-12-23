import React from 'react'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from './lib/qrcode'
import './index.scss'

let RnQRCode: any;

if (IS_RN) {
  RnQRCode = require("react-native-qrcode-svg").default;
}

type Props = {
  text: string,
  size: number,
  scale: number,
  errorCorrectLevel: string,
  typeNumber: number,
}

const QRCode: React.FC<Props> = ({
  text = '',
  size = 100,
  scale = 4,
  errorCorrectLevel = 'M',
  typeNumber = 2,
}) => {
  const style = { width: size + 'px', height: size + 'px' };
  return (
    IS_RN ? (
      <RnQRCode
        value={text}
      />
    ) : (
      <Image
        style={style}
        src={createQrCodeImg(text, {
          errorCorrectLevel,
          typeNumber,
          size: size * scale
        })}
      />
    )
  )
};

export default QRCode
