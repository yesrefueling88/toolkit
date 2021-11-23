import Taro from '@tarojs/taro'
import React from 'react'
import { Block, View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { getNavBarInfo } from "@actions/global";
import { NavBarInfo } from "@reducers/global";

import './index.scss'

type Props = {
  isHomePage?: boolean, //是否在首页调用
  title?: string, //页面标题
  onBack?: Function | null,
}

type StateType = {
  global: {
    navBarInfo: NavBarInfo
  }
}

const NavBar: React.FC<Props> = ({
  isHomePage = false,
  title = '工具箱',
  onBack = null,
}) => {
  const dispatch = useDispatch();
  let {
    navBarHeight = 0,
    statusBarHeight = 0,
    navBarContentHeight = 0,
  } = useSelector((state: StateType) => state.global.navBarInfo);
  if (IS_WEAPP && navBarHeight === 0) {
    dispatch(getNavBarInfo());
  }

  const handleClick = () => {
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  };

  return (
    <Block>
      {(IS_H5 || IS_RN) && (
        <Block>
          {!isHomePage ? (
            <View className='c-nav-bar'>
              <View
                className='c-nav-bar-back'
                onClick={handleClick}
              >
                <Image
                  className='c-nav-bar-back-icon'
                  src={require('../../assets/images/back.png')}
                />
              </View>
              <Text className='c-nav-bar-title'>{title}</Text>
            </View>
          ) : (
            <View className='c-nav-bar'>
              <View className='c-nav-bar-logo'>
                <Image
                  className='c-nav-bar-logo-icon'
                  src={require('../../assets/images/logo.png')}
                />
              </View>
              <Text className='c-nav-bar-title'>{title}</Text>
            </View>
          )}
        </Block>
      )}

      {IS_WEAPP && (
        <View
          className='c-nav-bar'
          style={`height:${statusBarHeight + navBarHeight}px;`}
        >
          <View
            className='c-nav-bar-status-bar'
            style={`height:${statusBarHeight}px;`}
          />
          <View
            className='c-nav-bar-container'
            style={`height:${navBarHeight}px;`}
          >
            <View
              className='c-nav-bar-container-content'
              style={`height:${navBarContentHeight}px`}
            >
              {!isHomePage ? (
                <Block>
                  <View
                    className='c-nav-bar-container-content-back'
                    onClick={handleClick}
                  >
                    <Image
                      className='c-nav-bar-container-content-back-icon'
                      src={require('../../assets/images/back.png')}
                    />
                  </View>
                  <Text
                    className='c-nav-bar-container-content-title'
                    style={`line-height:${navBarContentHeight}px;`}
                  >
                    {title}
                  </Text>
                </Block>
              ) : (
                <Block>
                  <Image
                    className='c-nav-bar-container-content-logo'
                    src={require('../../assets/images/logo.png')}
                  />
                  <Text
                    className='c-nav-bar-container-content-title'
                    style={`line-height:${navBarContentHeight}px;`}
                  >
                    {title}
                  </Text>
                </Block>
              )}
            </View>
          </View>
        </View>
      )}
    </Block>
  )
};

export default NavBar
