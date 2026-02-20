export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Onboarding: undefined;
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
  Onboarding: undefined; // add this

  EventDetail: { eventId: string };
  AnnouncementDetail: { announcementId: string };
  ResourceDetail: { resourceId: string };
  SocialHub: undefined;
};