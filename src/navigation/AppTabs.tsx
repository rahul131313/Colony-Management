import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FeedScreen } from "../features/feed/screens/FeedScreen";
import { GrievanceDashboardScreen } from "../features/grievances/screens/GrievanceDashboardScreen";
import { AnnouncementsScreen } from "../features/announcements/screens/AnnouncementsScreen";
import { DirectoryScreen } from "../features/directory/screens/DirectoryScreen";
import { NotificationsScreen } from "../features/notifications/screens/NotificationsScreen";
import { ProfileScreen } from "../features/profile/screens/ProfileScreen";
import { AdminPanelScreen } from "../features/admin/screens/AdminPanelScreen";
import { useSessionStore } from "../state/sessionStore";
import type { AppTabParamList } from "./types";

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  const role = useSessionStore((state) => state.user?.role);
  const adminAccess = role === "colony_admin" || role === "supervisor" || role === "local_authority";

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Grievances" component={GrievanceDashboardScreen} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
      <Tab.Screen name="Directory" component={DirectoryScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {adminAccess ? <Tab.Screen name="AdminPanel" component={AdminPanelScreen} /> : null}
    </Tab.Navigator>
  );
}
