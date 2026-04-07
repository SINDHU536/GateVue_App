import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ title, value }: any) => {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    width: '48%',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});