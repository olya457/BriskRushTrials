import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressPanel() {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Today’s Progress</Text>
      <Text style={styles.text}>Completed modes: 0</Text>
      <Text style={styles.text}>Saved insights: 0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#172554',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 4,
  },
});