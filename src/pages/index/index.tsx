import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Menu from "@components/menu/menu";
import MenuList from "@components/menu/menu-list";
import MenuPanels from "@components/menu/menu-panels";
import MenuItem from "@components/menu/menu-item";
import MenuPanel from "@components/menu/menu-panel";
import { createSelectorQuery } from "@utils/taro";
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
            <MenuItem>工具榜单</MenuItem>
            <MenuItem>视频音频</MenuItem>
            <MenuItem>图形图形</MenuItem>
            <MenuItem>日期时间</MenuItem>
            <MenuItem>文字编辑</MenuItem>
            <MenuItem>加密解密</MenuItem>
            <MenuItem>编程开发</MenuItem>
            <MenuItem>计算换算</MenuItem>
            <MenuItem>生活日常</MenuItem>
          </MenuList>
          <MenuPanels>
            <MenuPanel><Text>content1</Text></MenuPanel>
            <MenuPanel><Text>content2</Text></MenuPanel>
            <MenuPanel><Text>content3</Text></MenuPanel>
            <MenuPanel><Text>content4</Text></MenuPanel>
            <MenuPanel><Text>content5</Text></MenuPanel>
            <MenuPanel><Text>content6</Text></MenuPanel>
            <MenuPanel><Text>content7</Text></MenuPanel>
            <MenuPanel><Text>content8</Text></MenuPanel>
            <MenuPanel><Text>content9</Text></MenuPanel>
            <MenuPanel><Text>content10</Text></MenuPanel>
          </MenuPanels>
        </Menu>
      )}
    </View>
  )

};

export default Index

