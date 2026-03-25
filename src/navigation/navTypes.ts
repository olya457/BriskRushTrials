export type PracticeMode = 'logic' | 'pattern' | 'word' | 'math';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Practice: { mode: PracticeMode };
  SessionResult: undefined;
};

export type MainTabParamList = {
  HomeHub: undefined;
  RealWorld: undefined;
  SavedInsights: undefined;
  Profile: undefined;
};