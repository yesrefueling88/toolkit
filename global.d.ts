declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
};

declare const IS_H5: any;
declare const IS_WEAPP: any;
declare const IS_RN: any;

declare interface BoundingClientRectCallback {
  id,      // 节点的ID
  dataset, // 节点的dataset
  left,    // 节点的左边界坐标
  right,   // 节点的右边界坐标
  top,     // 节点的上边界坐标
  bottom,  // 节点的下边界坐标
  width,   // 节点的宽度
  height,  // 节点的高度
}
