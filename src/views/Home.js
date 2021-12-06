import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WeatherBoxList from '../components/WeatherBoxList';
import RoundButton from '../components/RoundButton';
import Card from '../components/Card';
import { DateUtil, numberWithCommas, regionMinify } from '../utils';
import { descriptions, WeatherIcon } from '../components/WeatherBox';
import useAxios from 'axios-hooks';
import getEnv from '../environment';
import DayWeather from '../components/DayWeather';
import WeatherDetail from '../components/WeatherDetail';
import Line from '../components/Line';

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

  const onPressOpenMenu = () => {};

  const onPressPlusMenu = () => {};

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerMenu}>
          <TouchableOpacity onPress={onPressOpenMenu}>
            <Ionicons name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPlusMenu}>
            <AntDesign name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerText}>
          <Text
            stlye={{
              fontWeight: 'bold',
              fontSize: 40,
            }}
          >
            날씨
          </Text>
        </View>
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
                  <WeatherIcon
                    name={weathers.current.weather[0].main}
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
                {regionMinify(location.address.region)} COVID-19 현황
              </Text>
              <View style={styles.rowBetween}>
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
          <Card></Card>
          <Card>
            <View style={styles.cardContainer}>
              {weathers.daily.map((day, index) => (
                <DayWeather key={index} day={day} />
              ))}
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
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card>
            <View style={styles.cardContainer}>
              <WeatherDetail title="일출" content="오전 7:07" />
              <Line.Horizontal
                alignItems="flex-end"
                lineWidth={0.7}
                width="87%"
                lineColor="black"
              />
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
    padding: 20,
  },
  headerMenu: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 8,
    width: '95%',
  },
  cardContainer: { flex: 1, padding: 20 },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
