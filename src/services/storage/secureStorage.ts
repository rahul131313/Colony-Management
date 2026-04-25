import * as Keychain from "react-native-keychain";

const TOKEN_SERVICE = "colony-connect-token";

export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await Keychain.setGenericPassword("access_token", token, { service: TOKEN_SERVICE });
  },
  async getToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({ service: TOKEN_SERVICE });
    if (!credentials) {
      return null;
    }
    return credentials.password;
  },
  async clearToken(): Promise<void> {
    await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
  }
};
