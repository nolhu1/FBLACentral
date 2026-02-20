// src/utils/authError.ts
export function mapFirebaseAuthError(code?: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email.';
    case 'auth/user-not-found':
      return 'No account found for this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'This email is already in use.';
    case 'auth/weak-password':
      return 'Password must be at least 8 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Try again.';
    default:
      return 'Sign-in failed. Try again.';
  }
}