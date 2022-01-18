import Taro from "@tarojs/taro";
import React from "react";
import { Image } from '@tarojs/components';
import { getHtml } from "@utils/index";
import barcode from "./lib/index";

let WebView;
if (IS_RN) {
  WebView = require('react-native-webview').WebView
}

type Props = {
  text?: string,
  scale?: number,
  width?: number,
  height?: number,
}

const BarCode: React.FC<Props> = ({
  text = '',
  scale = 4,
  width = IS_RN ? 350 : 300,
  height = 60
}) => {
  const image = barcode({ text, scale });
  const widthString = width ? width + 'px' : '';
  const heightString = height ? height + 'px' : '';
  const style = { width: widthString, height: heightString };

  let rnImage = `<div style="width:100%;height:100%;display: flex;justify-content:center;align-items:center;">
                    <img src="${image}" alt="Paris" width="300px" height="60px">
                 </div>`;

  return IS_RN
    ? (
      <WebView
        source={{
          html: getHtml(rnImage)
        }}
        style={{
          width: Taro.getSystemInfoSync().screenWidth,
          height: 100,
          backgroundColor: '#fff'
        }}
      />
    )
    : (
      <Image
        style={style}
        // @ts-ignore
        src={image}
      />
    )
};

export default BarCode;
