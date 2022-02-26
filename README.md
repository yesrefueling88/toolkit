# toolkit

### 简介
一个基于Taro3开发的工具箱，集合了各种各样、功能丰富的小工具。此项目旨在实践前端多端统一，目标是一套代码可以运行在多平台(小程序、H5、安卓、IOS)。

> 微信小程序

![](http://r7x8fsnpd.hn-bkt.clouddn.com/weapp-20220202.jpg)

> H5

![](http://r7x8fsnpd.hn-bkt.clouddn.com/h5-20220202.jpg)

> 安卓

![](http://r7x8fsnpd.hn-bkt.clouddn.com/rn-20220202.jpg)

### 项目技术栈
* Taro 文档见 http://taro-docs.jd.com/taro/docs/README/index.html
* TypeScript 文档见 https://www.typescriptlang.org/
* React 文档见 https://react.docschina.org/
* React-Hooks 文档见 https://reactjs.org/docs/hooks-reference.html
* Redux 文档见 http://cn.redux.js.org/

### 已开发完成的工具
- [x] 生成二维码
- [x] 生成条形码
- [x] 屏幕时间
- [x] 秒表
- [x] Base64图片转换
- [x] RGB颜色转换
- [x] 正则表达式匹配测试
- [x] Json格式化
- [x] 英文大小写转换
- [x] 计算器
- [x] 体积计算器
- [x] 表面积计算器
- [x] 面积计算器
- [x] MD5加密
- [ ] 更多工具持续开发中...

### 多端开发进度
- [x] 微信小程序
- [x] H5
- [x] 安卓
- [ ] IOS适配中...

### 目录结构

```
├── config // Taro配置目录
├── src
│   ├── app.config.ts // app配置文件(页面声明、状态栏属性等)
│   ├── app.scss // 项目总通用样式
│   ├── app.ts // 项目入口文件
│   ├── assets // 静态资源文件(图片、字体等)
│   ├── components // 封装的一些多端组件
│   ├── index.html // 页面模板
│   ├── pages // 业务页面文件夹
│   ├── style // 公共样式文件夹   
│   └── utils // 工具类库
├── global.d.ts // 全局类型声明文件
├── package.json // npm配置文件
├── project.config.json // 小程序配置文件
├── tsconfig.json // typescript配置文件
└── yarn.lock // node依赖包锁定配置文件
```

## 在线预览


| <center>小程序</center> | <center>H5</center> | <center>React Native</center> |
|--------------|-------|----|
| ![](http://r7x8fsnpd.hn-bkt.clouddn.com/weapp-qrcode-20220203.jpg) | ![](http://r7x8fsnpd.hn-bkt.clouddn.com/h5-qrcode-20220204.png) | 安卓：[toolkit.apk](https://pan.baidu.com/s/1ILN1g93IaOXuiOx4JIcVmA?pwd=f4gc) |


## 本地运行

```
  # clone到本地
  git clone https://github.com/yesrefueling88/toolkit.git
  
  # 进去项目根目录
  cd toolkit
  
  # 安装依赖
  yarn
  
  # 运行微信小程序
  yarn dev:weapp

  # 运行RN 默认端口8081
  yarn dev:rn

  # 运行H5
  yarn dev:h5
```

## License

MIT
