import React from 'react';
import { View } from 'react-native';

const Horizontal = ({
  alignItems = 'center',
  lineWidth = 1,
  width = '100%',
  lineColor = 'black',
}) => {
  return (
    <View style={[{ alignItems, marginVertical: 10 }]}>
      <View
        style={{ borderColor: lineColor, borderWidth: lineWidth, width }}
      ></View>
    </View>
  );
};

const Line = {
  Horizontal,
};

export default Line;
