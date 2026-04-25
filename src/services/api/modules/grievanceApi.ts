import { apiClient } from "../client";
import type { ApiResponse, Grievance, GrievanceStatus } from "../../../types";

export const grievanceApi = {
  async list(): Promise<Grievance[]> {
    const response = await apiClient.get<ApiResponse<Grievance[]>>("/grievances");
    return response.data.data;
  },
  async create(payload: { title: string; description: string; mediaUrls?: string[] }): Promise<Grievance> {
    const response = await apiClient.post<ApiResponse<Grievance>>("/grievances", payload);
    return response.data.data;
  },
  async updateStatus(grievanceId: string, status: GrievanceStatus): Promise<Grievance> {
    const response = await apiClient.patch<ApiResponse<Grievance>>(`/grievances/${grievanceId}/status`, {
      status
    });
    return response.data.data;
  },
  async rate(grievanceId: string, rating: number): Promise<void> {
    await apiClient.post(`/grievances/${grievanceId}/rating`, { rating });
  }
};
