import Constants from 'expo-constants';

const ENV = {
  dev: {
    OPEN_WEATHER_API_KEY: 'cd4d167eb3c576a0bd3a83500221ae34',
    COVID19_API_KEY:
      'FmSiwMcGckln/XHdi7kaFbngjuh9u/qz2cVdxvMUOWPr1SBEmv0JPp/8BjlFUTRlDnsTz9SH483PacK16Zg8gQ==',
    AIR_API_KEY:
      'FmSiwMcGckln/XHdi7kaFbngjuh9u/qz2cVdxvMUOWPr1SBEmv0JPp/8BjlFUTRlDnsTz9SH483PacK16Zg8gQ==',
  },
};

const getEnv = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnv;
