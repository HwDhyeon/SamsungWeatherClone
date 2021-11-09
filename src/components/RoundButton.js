import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RoundButton = ({ width = 'auto', height = 'auto', textStyle, text }) => {
  return (
    <TouchableOpacity style={[styles.button, { width, height }]}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ebebeb',
  },
});

export default RoundButton;
