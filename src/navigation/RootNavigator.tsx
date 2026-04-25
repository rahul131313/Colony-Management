import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./AuthNavigator";
import { ColonySelectionScreen } from "../features/colony/screens/ColonySelectionScreen";
import { AppTabs } from "./AppTabs";
import { ChatScreen } from "../features/chat/screens/ChatScreen";
import { CreateGrievanceScreen } from "../features/grievances/screens/CreateGrievanceScreen";
import { startOfflineSync, stopOfflineSync } from "../offline/syncManager";
import { useSessionStore } from "../state/sessionStore";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const token = useSessionStore((state) => state.token);
  const selectedColony = useSessionStore((state) => state.selectedColony);

  useEffect(() => {
    if (token) {
      startOfflineSync();
      return () => stopOfflineSync();
    }
    return;
  }, [token]);

  return (
    <Stack.Navigator>
      {!token ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : !selectedColony ? (
        <Stack.Screen
          name="ColonySelection"
          component={ColonySelectionScreen}
          options={{ title: "Select Colony" }}
        />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat" }} />
          <Stack.Screen
            name="CreateGrievance"
            component={CreateGrievanceScreen}
            options={{ title: "Create Grievance" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
