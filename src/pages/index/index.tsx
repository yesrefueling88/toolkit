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
            <MenuItem>
              <Text>工具分类1</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类2</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类3</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类4</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类5</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类6</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类7</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类8</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类9</Text>
            </MenuItem>
            <MenuItem>
              <Text>工具分类10</Text>
            </MenuItem>
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

