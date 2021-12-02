import React from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from "@components/nav-bar";
import Tabs from "@components/tabs/tabs";
import TabList from "@components/tabs/tab-list";
import Tab from "@components/tabs/tab";
import TabPanels from "@components/tabs/tab-panels";
import TabPanel from "@components/tabs/tab-panel";
import './index.scss'

const Index: React.FC<any> = () => {

  return (
    <View className='index'>
      <NavBar
        isHomePage
      />
      <Tabs>
        <TabList>
          <Tab>
            <View><Text>1</Text></View>
          </Tab>
          <Tab>
            <View><Text>2</Text></View>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <View><Text>content1</Text></View>
          </TabPanel>
          <TabPanel>
            <View><Text>content2</Text></View>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </View>
  )

};

export default Index

