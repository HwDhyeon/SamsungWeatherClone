import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DateUtil } from '../utils';
import WeatherBox from './WeatherBox';

const WeatherBoxList = ({ weathers, style }) => {
  const [boxWidth, setBoxWidth] = useState(0);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setBoxWidth(Math.round(width / 5));
  };

  const createTimeText = (dt) => {
    const date = new DateUtil(dt * 1000);
    return date.formatHours() + '시';
  };

  return (
    <View style={{ ...style }}>
      <ScrollView
        onLayout={onLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {weathers.slice(0, 19).map((weather, index) => (
          <WeatherBox
            key={index}
            width={boxWidth}
            name={weather.weather[0].main}
            time={createTimeText(weather.dt)}
            temperature={Math.round(weather.temp)}
            pop={Math.round(weather.pop * 100)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default WeatherBoxList;
