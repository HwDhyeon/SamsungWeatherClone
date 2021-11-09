import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children, width = 'auto', height = 'auto' }) => {
  return (
    <View
      style={{
        ...styles.container,
        width,
        height,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    width: 'auto',
    height: 'auto',
  },
});

export default Card;
