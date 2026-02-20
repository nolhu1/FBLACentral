import React from 'react';
import { View, Text } from 'react-native';
import { useListAnnouncementsQuery } from '../store/services/announcementsApi';

export default function HomeScreen() {
  const { data } = useListAnnouncementsQuery();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      <Text>{data?.[0]?.title ?? 'No announcements'}</Text>
    </View>
  );
}