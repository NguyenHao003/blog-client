import {
    ApiResponse,
    PaginationResponse,
} from '@/common/shared/types/api-response';
import axiosInstance from '@/lib/axios';
import {
    CreatePostPayload,
    PostData,
    PostFilter,
    UpdatePostPayload,
} from '../types/post-types';

export const postApis = {
    getPosts: async (params: PostFilter) => {
        return axiosInstance.get<PaginationResponse<PostData>>('/posts', {
            params,
        });
    },
    createPost: async (data: CreatePostPayload) => {
        return axiosInstance.post<ApiResponse<PostData>>('/posts', data);
    },
    getPostById: async (id: string | number) => {
        return axiosInstance.get<ApiResponse<PostData>>(`/posts/${id}`);
    },
    getPostBySlug: async (slug: string) => {
        return axiosInstance.get<ApiResponse<PostData>>(`/posts/slug/${slug}`);
    },
    updatePost: async (id: string | number, data: UpdatePostPayload) => {
        return axiosInstance.patch<ApiResponse<PostData>>(`/posts/${id}`, data);
    },
    deletePost: async (id: string | number) => {
        return axiosInstance.delete<ApiResponse<PostData>>(`/posts/${id}`);
    },
};
