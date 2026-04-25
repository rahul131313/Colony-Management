export type AuthStackParamList = {
  LoginOtp: undefined;
  VerifyOtp: undefined;
};

export type AppTabParamList = {
  Feed: undefined;
  Grievances: undefined;
  Announcements: undefined;
  Directory: undefined;
  Notifications: undefined;
  Profile: undefined;
  AdminPanel: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  ColonySelection: undefined;
  MainTabs: undefined;
  Chat: { chatId: string; contextType?: "general" | "grievance" | "service_request" };
  CreateGrievance: undefined;
};
