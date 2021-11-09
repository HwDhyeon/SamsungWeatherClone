import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/Card';
import WeatherBoxList from '../components/WeatherBoxList';
import RoundButton from '../components/RoundButton';
import { DateUtil, numberWithCommas } from '../utils';
import { descriptions, iconNames } from '../components/WeatherBox';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = ({ location, weathers, covid19, air, onLayout }) => {
  const creteDateText = () => {
    const date = new DateUtil();

    return `${date.month}월 ${
      date.days
    }일 ${date.getWeekDay()} ${date.formatHours()}:${date.formatMinutes()}`;
  };

  const formatStdDay = (stdDay) => {
    stdDay = stdDay.replace(/^[0-9]{4}년 /, '');
    stdDay = stdDay.replace('시', ':');
    return stdDay + '00 집계 기준';
  };

  const todayWeather = weathers.daily[0];
  const currentCovidInfo = covid19.find((item) => item.gubun === '서울');
  const currentAirInfo = air.find(
    (item) => item.stationName === location.address.district,
  );

  const getAirGrade = (value, pm) => {
    if (pm === 10) {
      if (value >= 0 || value <= 30) {
        return '좋음';
      } else if (value >= 31 || value <= 80) {
        return '보통';
      } else if (value >= 31 || value <= 80) {
        return '나쁨';
      } else if (value >= 151) {
        return '매우 나쁨';
      } else {
        return '-1';
      }
    } else if (pm === 2.5 || pm === 25) {
      if (value >= 0 || value <= 15) {
        return '좋음';
      } else if (value >= 16 || value <= 35) {
        return '보통';
      } else if (value >= 36 || value <= 75) {
        return '나쁨';
      } else if (value >= 76) {
        return '매우 나쁨';
      } else {
        return '-1';
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text>날씨</Text>
      </View>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <View style={styles.cardContainer}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <FontAwesome name="map-marker" size={24} color="black" />
                  <Text style={{ marginLeft: 10, fontSize: 24 }}>
                    {location.address.street}
                  </Text>
                </View>
                <Text style={{ marginTop: 3, fontSize: 13, color: '#8b8b8b' }}>
                  {creteDateText()}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    name={iconNames[weathers.current.weather[0].main]}
                    size={60}
                    color="#88c2e8"
                  />
                  <Text style={{ marginLeft: 5, fontSize: 60 }}>
                    {Math.round(weathers.current.temp)}°
                  </Text>
                </View>
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-end' }}
                >
                  <Text>{descriptions[weathers.current.weather[0].id]}</Text>
                  <Text>
                    {Math.round(todayWeather.temp.min)}°/
                    {Math.round(todayWeather.temp.max)}°
                  </Text>
                  <Text>
                    체감온도 {Math.round(weathers.current.feels_like)}°
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: '#dae8f1',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: '#8b8b8b',
                    }}
                  >
                    찬 바람 불며 춥게 느껴지는 하루{'\n'}
                    일부 지역에서는 약한 비가 내려요
                  </Text>
                </View>
              </View>
              <WeatherBoxList
                weathers={weathers.hourly}
                style={{ marginTop: 30 }}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <RoundButton text="더보기" width="30%" />
              </View>
            </View>
          </Card>
          <Card>
            <View style={styles.cardContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                서울 COVID-19 현황
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{
                    marginTop: 10,
                    width: 100,
                    height: 80,
                    borderRadius: 8,
                  }}
                  source={require('../../assets/covid19.jpg')}
                />
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#858585', fontSize: 16 }}>
                    총 확진자 수
                  </Text>
                  <Text style={{ color: '#858585', fontSize: 16 }}>
                    총 사망자 수
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {numberWithCommas(currentCovidInfo.defCnt)}
                    <Text style={{ color: 'red', fontWeight: 'normal' }}>
                      (+{numberWithCommas(currentCovidInfo.incDec)})
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {numberWithCommas(currentCovidInfo.deathCnt)}
                  </Text>
                  <Text style={{ marginTop: 10, color: '#858585' }}>
                    {formatStdDay(currentCovidInfo.stdDay)}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text>Chart</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#858585', fontSize: 16 }}>
                    미세먼지
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {getAirGrade(currentAirInfo.pm10Value, 10)}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {currentAirInfo.pm10Value}μg/㎥
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text>Chart</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#858585', fontSize: 16 }}>
                    초미세먼지
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {getAirGrade(currentAirInfo.pm10Value, 2.5)}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {currentAirInfo.pm25Value}μg/㎥
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  header: {
    flex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 8,
    width: '95%',
  },
  cardContainer: { flex: 1, padding: 20 },
});

export default Home;
