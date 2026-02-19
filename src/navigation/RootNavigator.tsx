// src/navigation/RootNavigator.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import AuthNavigator from "./AuthNavigator";
import MainTabsNavigator from "./MainTabsNavigator";

import EventDetailScreen from "../screens/EventDetailScreen";
import AnnouncementDetailScreen from "../screens/AnnouncementDetailScreen";
import ResourceDetailScreen from "../screens/ResourceDetailScreen";
import SocialHubScreen from "../screens/SocialHubScreen";

// Temporary: hardcode signed-in state for now.
// In Phase 2, this will come from Firebase auth + Redux.
const isSignedIn = false;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <Stack.Screen name="Main" component={MainTabsNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}

      {/* Secondary screens live in the same Root stack so they can open above tabs */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Event" }} />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{ title: "Announcement" }}
      />
      <Stack.Screen
        name="ResourceDetail"
        component={ResourceDetailScreen}
        options={{ title: "Resource" }}
      />
      <Stack.Screen name="SocialHub" component={SocialHubScreen} options={{ title: "Social Hub" }} />
    </Stack.Navigator>
  );
}