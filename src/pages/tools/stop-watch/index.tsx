import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from '@tarojs/components'
import { NavBar } from '@components'
import './index.scss'

let timer;
const Index: React.FC<any> = () => {
  const startTimeRef = useRef(0);
  const [startTime, setStartTime] = useState(startTimeRef.current);
  const pauseTimeRef = useRef(0);
  const isPausedRef = useRef(false);
  const currentCountRef = useRef('00:00:00');
  const [currentCount, setCurrentCount] = useState(currentCountRef.current);

  useEffect(() => {
    if (startTime === 0) {
      return
    }

    timer = setInterval(() => {
      animation()
    }, 100);

    return () => {
      clearInterval(timer)
    }

  }, [startTime]);

  const animation = () => {
    if (isPausedRef.current || startTime === 0) {
      return
    }

    const currentTime = new Date().getTime();
    let pauseTime;
    if (!!pauseTimeRef.current) {
      pauseTime = currentTime - pauseTimeRef.current;
    } else {
      pauseTime = 0
    }
    const times = currentTime - startTimeRef.current - pauseTime;
    const minutes = Math.floor(times / 60000);
    const seconds = Math.floor((times - minutes * 60000) / 1000);
    const ms = Math.floor((times - minutes * 60000 - seconds * 1000) / 10);

    const showTime =
      (minutes < 10 ? "0" + minutes : minutes) + ":"
      + (seconds < 10 ? "0" + seconds : seconds) + ":"
      + (ms < 10 ? "0" + ms : ms);
    setCurrentCount(showTime);

    if (pauseTime > 0) {
      startTimeRef.current += pauseTime;
      pauseTimeRef.current = 0
    }
  };

  const onStart = () => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      return
    }

    startTimeRef.current = new Date().getTime();
    setStartTime(startTimeRef.current)
  };

  const onPause = () => {
    if (isPausedRef.current || !startTimeRef.current) {
      return
    }

    pauseTimeRef.current = new Date().getTime();
    isPausedRef.current = true;
  };

  const onReset = () => {
    setTimeout(() => {
      startTimeRef.current = 0;
      pauseTimeRef.current = 0;
      isPausedRef.current = false;
      currentCountRef.current = '00:00:00';
      setStartTime(startTimeRef.current);
      clearInterval(timer);
      setCurrentCount(currentCountRef.current);
    }, 0)
  };

  return (
    <View className='stop-watch'>
      <NavBar
        title='秒表'
      />
      <View className='stop-watch__count'>
        <Text className='stop-watch__count-text'>
          {currentCount}
        </Text>
      </View>
      <View className='stop-watch__btns'>
        <View className='stop-watch__btns-reset'>
          <View className='stop-watch__btns-reset-btn' onClick={onReset}>
            <Text className='stop-watch__btns-reset-btn-text'>
              重置
            </Text>
          </View>
        </View>
        <View className='stop-watch__btns-pause'>
          <View className='stop-watch__btns-pause-btn' onClick={onPause}>
            <Text className='stop-watch__btns-pause-btn-text'>
              暂停
            </Text>
          </View>
        </View>
        <View className='stop-watch__btns-start'>
          <View className='stop-watch__btns-start-btn' onClick={onStart}>
            <Text className='stop-watch__btns-start-btn-text'>
              开始
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
};

export default Index
