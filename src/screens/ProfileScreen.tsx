// src/screens/ProfileScreen.tsx (temporary sign-out button for testing)
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../repositories/firebase/firebaseAuth';
import { useAppDispatch } from '../store';
import { setBusy } from '../store/slices/uiSlice';
import AuthErrorBanner from '../components/AuthErrorBanner';
import { mapFirebaseAuthError } from '../utils/authError';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSignOut() {
    try {
      setError(null);
      setSubmitting(true);
      dispatch(setBusy({ isBusy: true, message: 'Signing out…' }));

      await signOut(auth);

      // Do not navigate manually.
      // Auth listener will flip Redux and RootNavigator will return to Auth flow.
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
    } finally {
      setSubmitting(false);
      dispatch(setBusy({ isBusy: false }));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      {!!error && <AuthErrorBanner message={error} />}

      <Pressable
        onPress={onSignOut}
        disabled={submitting}
        style={({ pressed }) => [
          styles.button,
          (pressed || submitting) && styles.buttonPressed,
          submitting && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>{submitting ? 'Signing out…' : 'Sign out (temp)'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});