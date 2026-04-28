import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { categoryApis } from '../apis/category-api';
import { CATEGORY_QUERY_KEYS } from '../constants/category-query-keys';
import { CreateCategoryPayload } from '../types/category-types';

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: CreateCategoryPayload) =>
            categoryApis.createCategory(values),
        onSuccess: () => {
            message.success('Category created successfully!');
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.LIST,
            });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while creating the category.';
            message.error(errorMsg);
        },
    });

    const createCategory = async (
        values: CreateCategoryPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate(values, options);
    };

    return {
        createCategory,
        ...mutation,
    };
};
