// src/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './routes';

import AuthNavigator from './AuthNavigator';
import MainTabsNavigator from './MainTabsNavigator';

import EventDetailScreen from '../screens/EventDetailScreen';
import AnnouncementDetailScreen from '../screens/AnnouncementDetailScreen';
import ResourceDetailScreen from '../screens/ResourceDetailScreen';
import SocialHubScreen from '../screens/SocialHubScreen';
import SplashScreen from '../screens/SplashScreen';

import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../store';
import { setSignedIn, setSignedOut, setAuthUnknown } from '../store/slices/authSlice';
import OnboardingScreen from '../screens/OnboardingScreen';
import { setUserProfile, clearUserProfile } from '../store/slices/userSlice';
import { createUserDocIfMissing, getUserDoc } from '../repositories/usersRepostiory';
// IMPORTANT: this must be your initialized Firebase Auth instance that uses
// React Native persistence (initializeAuth + getReactNativePersistence)
import { auth } from '../repositories/firebase/firebaseAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const userProfile = useAppSelector((s) => s.user.profile);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.auth);

  useEffect(() => {
    // Ensure we start in a known loading state
    dispatch(setAuthUnknown());

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSignedIn({ userId: user.uid }));
      } else {
        dispatch(setSignedOut());
      }
    });

    return unsubscribe;
  }, [dispatch]);
  useEffect(() => {
  let isCancelled = false;

  async function loadUser() {
    if (authState.status !== 'signedIn' || !authState.userId) {
      dispatch(clearUserProfile());
      return;
    }

    try {
      await createUserDocIfMissing(authState.userId);
      const docData = await getUserDoc(authState.userId);

      if (!isCancelled && docData) {
        dispatch(setUserProfile(docData));
      }
    } catch {
      // If this fails, keep profile null; gating will route to Onboarding.
      // You can add a banner later if needed.
      if (!isCancelled) dispatch(clearUserProfile());
    }
  }

  loadUser();

  return () => {
    isCancelled = true;
  };
}, [authState.status, authState.userId, dispatch]);

  // While Firebase determines session state, show Splash only
  if (authState.status === 'unknown') {
    return <SplashScreen />;
  }

  const needsOnboarding =
    authState.status === 'signedIn' &&
    (!!authState.userId) &&
    (!userProfile || userProfile.onboardingComplete === false);

  const canEnterMain =
    authState.status === 'signedIn' &&
    !!userProfile &&
    userProfile.onboardingComplete === true;

  return (
    <Stack.Navigator>
      {authState.status === 'signedOut' ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : needsOnboarding ? (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      ) : canEnterMain ? (
        <Stack.Screen name="Main" component={MainTabsNavigator} options={{ headerShown: false }} />
      ) : (
        // Signed in but profile not loaded yet
        <Stack.Screen
          name="Onboarding"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event' }} />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{ title: 'Announcement' }}
      />
      <Stack.Screen
        name="ResourceDetail"
        component={ResourceDetailScreen}
        options={{ title: 'Resource' }}
      />
      <Stack.Screen name="SocialHub" component={SocialHubScreen} options={{ title: 'Social' }} />
    </Stack.Navigator>
  );
}