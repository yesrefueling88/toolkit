import React from 'react'
import { Text, View } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Menu from "@components/menu/menu";
import MenuList from "@components/menu/menu-list";
import MenuPanels from "@components/menu/menu-panels";
import MenuItem from "@components/menu/menu-item";
import MenuPanel from "@components/menu/menu-panel";
import './index.scss'

const Index: React.FC<any> = () => {

  return (
    <View className='index'>
      <NavBar
        isHomePage
      />
      <Menu>
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
    </View>
  )

};

export default Index

