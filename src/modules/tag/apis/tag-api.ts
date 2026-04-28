import {
    ApiResponse,
    PaginationResponse,
} from '@/common/shared/types/api-response';
import axiosInstance from '@/lib/axios';
import {
    CreateTagPayload,
    TagData,
    TagFilter,
    UpdateTagPayload,
} from '../types/tag-types';

export const tagApis = {
    getTags: async (params: TagFilter) => {
        return axiosInstance.get<PaginationResponse<TagData>>('/tags', {
            params,
        });
    },
    createTag: async (data: CreateTagPayload) => {
        return axiosInstance.post<ApiResponse<TagData>>('/tags', data);
    },
    getTagById: async (id: string | number) => {
        return axiosInstance.get<ApiResponse<TagData>>(`/tags/${id}`);
    },
    updateTag: async (id: string | number, data: UpdateTagPayload) => {
        return axiosInstance.patch<ApiResponse<TagData>>(`/tags/${id}`, data);
    },
    deleteTag: async (id: string | number) => {
        return axiosInstance.delete<ApiResponse<TagData>>(`/tags/${id}`);
    },
};
