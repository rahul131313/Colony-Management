import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Colony, UserProfile } from "../types";

interface SessionState {
  token: string | null;
  user: UserProfile | null;
  selectedColony: Colony | null;
  pendingPhone: string | null;
  otpTxnId: string | null;
  setPendingOtp: (phone: string, txnId: string) => void;
  setAuthenticated: (token: string, user: UserProfile) => void;
  setSelectedColony: (colony: Colony) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      selectedColony: null,
      pendingPhone: null,
      otpTxnId: null,
      setPendingOtp: (phone, txnId) => set({ pendingPhone: phone, otpTxnId: txnId }),
      setAuthenticated: (token, user) =>
        set({
          token,
          user
        }),
      setSelectedColony: (colony) => set({ selectedColony: colony }),
      clearSession: () =>
        set({
          token: null,
          user: null,
          selectedColony: null,
          pendingPhone: null,
          otpTxnId: null
        })
    }),
    {
      name: "cc-session-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
