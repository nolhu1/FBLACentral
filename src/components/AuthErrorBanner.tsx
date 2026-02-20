// src/components/AuthErrorBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthErrorBanner({ message }: { message: string }) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});