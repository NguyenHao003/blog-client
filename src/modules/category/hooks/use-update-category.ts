import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { categoryApis } from '../apis/category-api';
import { CATEGORY_QUERY_KEYS } from '../constants/category-query-keys';
import { UpdateCategoryPayload } from '../types/category-types';

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string | number;
            data: UpdateCategoryPayload;
        }) => categoryApis.updateCategory(id, data),
        onSuccess: (_response, variables) => {
            message.success('Category updated successfully!');
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.LIST,
            });
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.DETAIL(variables.id),
            });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while updating the category.';
            message.error(errorMsg);
        },
    });

    const updateCategory = async (
        id: string | number,
        data: UpdateCategoryPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate({ id, data }, options);
    };

    return {
        updateCategory,
        ...mutation,
    };
};
