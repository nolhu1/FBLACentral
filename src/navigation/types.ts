// src/navigation/types.ts

export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  OnboardingStep3: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  News: undefined;
  Resources: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;

  // Secondary stack screens (presented above tabs)
  EventDetail: { eventId: string };
  AnnouncementDetail: { announcementId: string };
  ResourceDetail: { resourceId: string };
  SocialHub: undefined;
};