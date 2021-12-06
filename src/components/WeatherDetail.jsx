import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WeatherDetail = ({ title, content }) => {
  return (
    <View style={styles.rowBetween}>
      <View style={{ flexDirection: 'row' }}>
        <Text>Icon</Text>
        <Text style={{ marginLeft: 10 }}>{title}</Text>
      </View>
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeatherDetail;
