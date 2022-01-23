import React, { useRef, useEffect, useState } from 'react'
import { Text, View } from '@tarojs/components'
import { NavBar } from '@components'
import { createSelectorQuery } from "@utils/taro";
import './index.scss'

const Index: React.FC<any> = () => {
  const [navHeight, setNavHeight] = useState(0);
  const nowTimeRef = useRef({ hour: '', min: '', isShowColon: false });
  const [nowTime, setNowTime] = useState(nowTimeRef.current);
  const todayRef = useRef('');
  const [today, setToday] = useState(todayRef.current);

  const fotmatNum = (num: number): string => {
    return num < 10 ? `0${num}` : String(num)
  };

  useEffect(() => {
    !IS_RN && createSelectorQuery('.c-nav-bar').then((res) => {
      // @ts-ignore
      let height = res.data[0].height;
      setNavHeight(height);
    });

    const timer = setInterval(() => {
      const date = new Date();
      nowTimeRef.current = {
        hour: fotmatNum(date.getHours()),
        min: fotmatNum(date.getMinutes()),
        isShowColon: !nowTimeRef.current.isShowColon,
      };

      setNowTime(nowTimeRef.current);
      const day = "星期" + "日一二三四五六".charAt(new Date().getDay())
      todayRef.current = `${date.getFullYear()}-${fotmatNum(date.getMonth() + 1)}-${fotmatNum(date.getDate())} ${day}`;
      setToday(todayRef.current)
    }, 500);

    return () => {
      clearInterval(timer)
    }
  }, []);

  return (
    <View className='time-screen'>
      <NavBar
        title='时间屏幕'
        bgColor='#000000'
        statusBarColor='#000000'
      />
      <View
        className='time-screen__content'
        style={
          !IS_RN
            ? `position:fixed;width:100%;top:${navHeight}px;bottom:0px;left:0px;`
            : ''
        }
      >
        <View
          className='time-screen__content-date'
          style={
            !IS_RN
              ? `margin-top:-${navHeight}px;`
              : ''
          }
        >
          <View className='time-screen__content-date-now-time'>
            <Text className='time-screen__content-date-now-time-hour'>
              {nowTime.hour}
            </Text>
            <Text
              className={
                nowTime.isShowColon
                  ? 'time-screen__content-date-now-time-colon'
                  : 'time-screen__content-date-now-time-colon time-screen__content-date-now-time--hidden'
              }
            >
              :
            </Text>
            <Text className='time-screen__content-date-now-time-min'>
              {nowTime.min}
            </Text>
          </View>

          {!!today && (
            <Text className='time-screen__content-date-today'>
              {today}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
};

export default Index
