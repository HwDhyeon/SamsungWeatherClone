import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Home from './src/views/Home';

const OPEN_WEATHER_API_KEY = 'cd4d167eb3c576a0bd3a83500221ae34';
const COVID19_API_KEY =
  'FmSiwMcGckln/XHdi7kaFbngjuh9u/qz2cVdxvMUOWPr1SBEmv0JPp/8BjlFUTRlDnsTz9SH483PacK16Zg8gQ==';
const AIR_API_KEY =
  'FmSiwMcGckln/XHdi7kaFbngjuh9u/qz2cVdxvMUOWPr1SBEmv0JPp/8BjlFUTRlDnsTz9SH483PacK16Zg8gQ==';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [location, setLocation] = useState({
    coords: { latitude: null, longitude: null },
    address: { region: null, district: null, street: null },
  });
  const [weathers, setWeathers] = useState({});
  const [covid19, setCovid19] = useState([]);
  const [air, setAir] = useState({});

  const getWeathers = async (lat, lon) => {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat,
          lon,
          exclude: 'alert,minutely',
          units: 'metric',
          appid: OPEN_WEATHER_API_KEY,
        },
      },
    );
    setWeathers(response.data);
  };

  const getLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission) return;

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    );

    const { region, district, street } = location[0];
    setLocation({
      coords: { latitude, longitude },
      address: { region, district, street },
    });

    await getWeathers(latitude, longitude);
  };

  const getCovid19Data = async () => {
    const response = await axios.get(
      'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson',
      {
        params: {
          ServiceKey: COVID19_API_KEY,
          pageNo: 1,
          numOfRows: 10,
          startCreateDt: 20211108,
          endCreateDt: 20211109,
        },
      },
    );

    setCovid19(response.data.response.body.items.item);
  };

  const getAirData = async () => {
    const response = await axios.get(
      'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {
        params: {
          ServiceKey: AIR_API_KEY,
          returnType: 'json',
          pageNo: 1,
          numOfRows: 100,
          sidoName: '서울',
          ver: '1.0',
        },
      },
    );

    const data = response.data.response.body.items;

    setAir(data);
  };

  useEffect(() => {
    const getAppData = async () => {
      await SplashScreen.preventAutoHideAsync();

      await getLocation();
      await getCovid19Data();
      await getAirData();
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    getAppData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <Home
      location={location}
      weathers={weathers}
      covid19={covid19}
      air={air}
      onLayout={onLayoutRootView}
    />
  );
};

export default App;
