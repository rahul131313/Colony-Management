import { apiClient } from "../client";
import type { ApiResponse, UserProfile } from "../../../types";

interface RequestOtpPayload {
  phone: string;
}

interface VerifyOtpPayload {
  phone: string;
  otp: string;
  txnId: string;
}

interface OtpRequestResult {
  txnId: string;
}

interface OtpVerifyResult {
  accessToken: string;
  profile: UserProfile;
}

export const authApi = {
  async requestOtp(payload: RequestOtpPayload): Promise<OtpRequestResult> {
    const response = await apiClient.post<ApiResponse<OtpRequestResult>>("/auth/otp/request", payload);
    return response.data.data;
  },
  async verifyOtp(payload: VerifyOtpPayload): Promise<OtpVerifyResult> {
    const response = await apiClient.post<ApiResponse<OtpVerifyResult>>("/auth/otp/verify", payload);
    return response.data.data;
  },
  async me(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>("/auth/me");
    return response.data.data;
  }
};
