import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/shared/types/api-response";
import { UserData } from "../types/user-types";

// User API service
export const userApis = {
  getUsers: async () => {
    return axiosInstance.get<ApiResponse<UserData[]>>("/users");
  },
  getProfile: async () => {
    return axiosInstance.get<ApiResponse<UserData>>("/users/profile");
  },
  updateProfile: async (data: Partial<UserData>) => {
    return axiosInstance.put<ApiResponse<UserData>>("/users/profile", data);
  },
  createUser: async (data: any) => {
    return axiosInstance.post<ApiResponse<UserData>>("/users", data);
  },
  getUserById: async (id: string) => {
    return axiosInstance.get<ApiResponse<UserData>>(`/users/${id}`);
  },
  updateUser: async (id: string, data: Partial<UserData>) => {
    return axiosInstance.patch<ApiResponse<UserData>>(`/users/${id}`, data);
  },
  deleteUser: async (id: string) => {
    return axiosInstance.delete<ApiResponse<UserData>>(`/users/${id}`);
  },
};
