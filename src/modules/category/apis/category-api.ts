import {
    ApiResponse,
    PaginationResponse,
} from '@/common/shared/types/api-response';
import axiosInstance from '@/lib/axios';
import {
    CategoryData,
    CategoryFilter,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from '../types/category-types';

export const categoryApis = {
    getCategories: async (params: CategoryFilter) => {
        return axiosInstance.get<PaginationResponse<CategoryData>>(
            '/categories',
            {
                params,
            }
        );
    },
    createCategory: async (data: CreateCategoryPayload) => {
        return axiosInstance.post<ApiResponse<CategoryData>>('/categories', data);
    },
    getCategoryById: async (id: string | number) => {
        return axiosInstance.get<ApiResponse<CategoryData>>(`/categories/${id}`);
    },
    updateCategory: async (
        id: string | number,
        data: UpdateCategoryPayload
    ) => {
        return axiosInstance.patch<ApiResponse<CategoryData>>(
            `/categories/${id}`,
            data
        );
    },
    deleteCategory: async (id: string | number) => {
        return axiosInstance.delete<ApiResponse<CategoryData>>(
            `/categories/${id}`
        );
    },
};
