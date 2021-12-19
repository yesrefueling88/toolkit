import React, { useMemo } from 'react'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from './lib/qrcode'
import './index.scss'

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
  const image = useMemo(() => {
    const options = { errorCorrectLevel, typeNumber, size: size * scale }
    return createQrCodeImg(text, options)
  }, [text, scale, size, errorCorrectLevel, typeNumber])
  const style = { width: size + 'px', height: size + 'px' }
  return <Image style={style} src={image} />
};

export default QRCode
