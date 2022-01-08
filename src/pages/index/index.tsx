import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Menu from "@components/menu/menu";
import MenuList from "@components/menu/menu-list";
import MenuPanels from "@components/menu/menu-panels";
import MenuItem from "@components/menu/menu-item";
import MenuPanel from "@components/menu/menu-panel";
import { createSelectorQuery } from "@utils/taro";
import ToolsItem from "@components/tools/item";
import config from "../../config";
import './index.scss'

const Index: React.FC<any> = () => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    !IS_RN && createSelectorQuery('.c-nav-bar').then((res) => {
      // @ts-ignore
      let height = res.data[0].height;
      setNavHeight(height);
    })
  }, []);

  return (
    <View className='index'>
      <NavBar
        isHomePage
      />
      {(navHeight > 0 || IS_RN) && (
        <Menu
          style={
            !IS_RN
              ? `position:fixed;width:100%;top:${navHeight}px;bottom:0px;left:0px;`
              : ''
          }
          scrollOffSet={navHeight}
        >
          <MenuList>
            <MenuItem>推荐热门</MenuItem>
            <MenuItem>生活日常</MenuItem>
            <MenuItem>编程开发</MenuItem>
            <MenuItem>计算换算</MenuItem>
            <MenuItem>加密解密</MenuItem>
            <MenuItem>文字编辑</MenuItem>
            <MenuItem>加密解密</MenuItem>
            <MenuItem>编程开发</MenuItem>
            <MenuItem>视频音频</MenuItem>
            <MenuItem>工具榜单</MenuItem>
          </MenuList>
          <MenuPanels>
            <MenuPanel name='推荐热门'>
              <ToolsItem
                name='生成二维码'
                icon={require('../../assets/images/qr-code.png')}
                path={config.page.qrCode}
              />
              <ToolsItem
                name='体积计算器'
                icon={require('../../assets/images/volume.png')}
                path={config.page.volumeCalculator}
              />
              <ToolsItem
                name='表面积计算器'
                icon={require('../../assets/images/surface-area.png')}
                path={config.page.surfaceAreaCalculator}
              />
              <ToolsItem
                name='面积计算器'
                icon={require('../../assets/images/square.png')}
                path={config.page.areaCalculator}
              />
              <ToolsItem
                name='颜色转换'
                icon={require('../../assets/images/RGB.png')}
                path={config.page.colorConversion}
              />
              <ToolsItem
                name='base64图片'
                icon={require('../../assets/images/pic.png')}
                path={config.page.base64Conversion}
              />
              <ToolsItem
                name='正则表达式'
                icon={require('../../assets/images/regular.png')}
                path={config.page.regular}
              />
              <ToolsItem
                name='Json格式化'
                icon={require('../../assets/images/json.png')}
                path={config.page.jsonFormat}
              />
              <ToolsItem
                name='条形码生成'
                icon={require('../../assets/images/bar-code.png')}
                path={config.page.barCode}
              />
              <ToolsItem
                name='计算器'
                icon={require('../../assets/images/calculator.png')}
                path={config.page.calculator}
              />
              <ToolsItem
                name='时间屏幕'
                icon={require('../../assets/images/time-screen.png')}
                path={config.page.timeScreen}
              />
              <ToolsItem
                name='秒表'
                icon={require('../../assets/images/stop-watch.png')}
                path={config.page.stopWatch}
              />
              <ToolsItem
                name='md5'
                icon={require('../../assets/images/md5.png')}
                path={config.page.md5}
              />
            </MenuPanel>
            <MenuPanel name='生活日常'>
              <ToolsItem
                name='生成二维码'
                icon={require('../../assets/images/qr-code.png')}
                path={config.page.qrCode}
              />
              <ToolsItem
                name='生成条形码'
                icon={require('../../assets/images/bar-code.png')}
                path={config.page.barCode}
              />
              <ToolsItem
                name='时间屏幕'
                icon={require('../../assets/images/time-screen.png')}
                path={config.page.timeScreen}
              />
              <ToolsItem
                name='秒表'
                icon={require('../../assets/images/stop-watch.png')}
                path={config.page.stopWatch}
              />
            </MenuPanel>
            <MenuPanel name='编程开发'>
              <ToolsItem
                name='颜色转换'
                icon={require('../../assets/images/RGB.png')}
                path={config.page.colorConversion}
              />
              <ToolsItem
                name='base64图片'
                icon={require('../../assets/images/pic.png')}
                path={config.page.base64Conversion}
              />
              <ToolsItem
                name='正则表达式'
                icon={require('../../assets/images/regular.png')}
                path={config.page.regular}
              />
              <ToolsItem
                name='Json格式化'
                icon={require('../../assets/images/json.png')}
                path={config.page.jsonFormat}
              />
            </MenuPanel>
            <MenuPanel name='计算换算'>
              <ToolsItem
                name='计算器'
                icon={require('../../assets/images/calculator.png')}
                path={config.page.calculator}
              />
              <ToolsItem
                name='体积计算器'
                icon={require('../../assets/images/volume.png')}
                path={config.page.volumeCalculator}
              />
              <ToolsItem
                name='表面积计算器'
                icon={require('../../assets/images/surface-area.png')}
                path={config.page.surfaceAreaCalculator}
              />
              <ToolsItem
                name='面积计算器'
                icon={require('../../assets/images/square.png')}
                path={config.page.areaCalculator}
              />
            </MenuPanel>
            <MenuPanel name='加密解密'>
              <ToolsItem
                name='md5'
                icon={require('../../assets/images/md5.png')}
                path={config.page.md5}
              />
            </MenuPanel>
            <MenuPanel name='文字编辑'><View className='test3'></View></MenuPanel>
            <MenuPanel name='日期时间'><View className='test1'></View></MenuPanel>
            <MenuPanel name='图形图形'><View className='test2'></View></MenuPanel>
            <MenuPanel name='计算换算'><View className='test3'></View></MenuPanel>
            <MenuPanel name='生活日常'><View className='test1'></View></MenuPanel>
          </MenuPanels>
        </Menu>
      )}
    </View>
  )

};

export default Index

