import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DateUtil } from '../utils';
import { WeatherIcon } from './WeatherBox';

const DayWeather = ({ day }) => {
  return (
    <View style={styles.dayWeatherContainer}>
      <Text style={styles.weekText}>
        {new DateUtil(day.dt * 1000).getWeekDay()}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '20%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="water-outline" size={14} color="#7fb6df" />
          <Text style={styles.popText}>{Math.round(day.pop * 100)}%</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <WeatherIcon name={day.weather[0].main} size={23} />
        </View>
      </View>
      <View>
        <Text style={styles.tempText}>
          {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  weekText: {
    fontSize: 17,
  },
  popText: {
    fontSize: 14,
  },
  tempText: {
    fontSize: 16,
  },
});

export default DayWeather;
