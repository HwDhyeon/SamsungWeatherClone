import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';

export const WeatherIcon = ({ name, size, color }) => {
  let icon;
  switch (name) {
    case 'Atmosphere':
      icon = <Fontisto name="cloudy-gusts" size={size} color={color} />;
      break;
    case 'Clear':
      icon = <Ionicons name="sunny" size={size} color={color} />;
      break;
    case 'Clouds':
      icon = <Ionicons name="cloudy" size={size} color={color} />;
      break;
    case 'Drizzle':
      icon = <Ionicons name="rainy-outline" size={size} color={color} />;
      break;
    case 'Rain':
      icon = <Ionicons name="rainy" size={size} color={color} />;
      break;
    case 'Snow':
      icon = <Ionicons name="snow" size={size} color={color} />;
      break;
    case 'Thunderstorm':
      icon = <Ionicons name="thunderstorm" size={size} color={color} />;
      break;
    case 'Mist':
      icon = <Fontisto name="fog" size={size} color={color} />;
      break;
    default:
      icon = <Ionicons name="build" size={size} color={color} />;
      break;
  }
  return icon;
};

export const descriptions = {
  500: '얕은 비',
  501: '비',
  502: '약간 굵은 비',
  503: '강한 비',
  504: '매우 강한 비',
  511: '눈 비',
  520: '얕은 소나기',
  521: '소나기',
  522: '강한 소나기',
  531: '매우 강한 소나기',
  800: '맑음',
  801: '구름 약간',
  802: '구름 낀 하늘',
  803: '구름 많음',
  804: '흐림',
};

const WeatherBox = ({ width, name, time, temperature, pop }) => {
  return (
    <View style={{ ...styles.box, width }}>
      <Text style={styles.timeText}>{time}</Text>
      <WeatherIcon name={name} size={40} color="#88c2e8" />
      <Text style={styles.temperatureText}>{temperature}°</Text>
      <View style={styles.popContainer}>
        <Ionicons name="water-outline" size={15} color="#7fb6df" />
        <Text style={styles.popText}>{pop}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
  },
  temperatureText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  popContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  popText: {
    fontSize: 15,
  },
});

export default WeatherBox;
