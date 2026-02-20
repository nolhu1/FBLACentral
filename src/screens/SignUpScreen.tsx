// src/screens/SignInScreen.tsx (update: add navigation to SignUp)
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { auth } from '../repositories/firebase/firebaseAuth';
import { useAppDispatch } from '../store';
import { setBusy } from '../store/slices/uiSlice';
import { mapFirebaseAuthError } from '../utils/authError';
import AuthErrorBanner from '../components/AuthErrorBanner';
import type { AuthStackParamList } from '../navigation/routes';
import { createUserDocIfMissing } from '../repositories/usersRepostiory';

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => !submitting, [submitting]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      next.email = 'Enter a valid email.';
    }
    if (!password || password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (!confirmPassword || confirmPassword !== password) {
      next.confirmPassword = 'Passwords must match.';
    }
    return next;
  }

  async function onSubmit() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      dispatch(setBusy({ isBusy: true, message: 'Creating account…' }));

      const userCredential = await createUserWithEmailAndPassword(
  auth,
  email.trim(),
  password
);

// Create Firestore user document with defaults
await createUserDocIfMissing(userCredential.user.uid);

      // Do not navigate manually.
    } catch (e: any) {
      setErrors((prev) => ({
        ...prev,
        form: mapFirebaseAuthError(e?.code),
      }));
    } finally {
      setSubmitting(false);
      dispatch(setBusy({ isBusy: false }));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      {!!errors.form && <AuthErrorBanner message={errors.form} />}

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(t) => setEmail(t)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="you@example.com"
          style={[styles.input, !!errors.email && styles.inputError]}
        />
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(t) => setPassword(t)}
          secureTextEntry
          placeholder="At least 8 characters"
          style={[styles.input, !!errors.password && styles.inputError]}
        />
        {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
          secureTextEntry
          placeholder="Re-enter password"
          style={[styles.input, !!errors.confirmPassword && styles.inputError]}
        />
        {!!errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <Pressable
        onPress={onSubmit}
        disabled={!canSubmit}
        style={({ pressed }) => [
          styles.button,
          (!canSubmit || pressed) && styles.buttonPressed,
          !canSubmit && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>{submitting ? 'Creating…' : 'Create account'}</Text>
      </Pressable>
            <Pressable
              onPress={() => navigation.navigate('SignIn')}
              disabled={submitting}
              style={({ pressed }) => [styles.linkButton, pressed && styles.linkPressed]}
              accessibilityRole="button"
            >
              <Text style={styles.linkText}>Already have an account? Sign in</Text>
            </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    linkText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
    linkButton: {
    marginTop: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
    linkPressed: {
    opacity: 0.7,
  },
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
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 2,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
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