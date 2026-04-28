import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { categoryApis } from '../apis/category-api';
import { CATEGORY_QUERY_KEYS } from '../constants/category-query-keys';

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string | number) => categoryApis.deleteCategory(id),
        onSuccess: () => {
            message.success('Category deleted successfully!');
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.LIST,
            });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while deleting the category.';
            message.error(errorMsg);
        },
    });

    return {
        deleteCategory: mutation.mutateAsync,
        ...mutation,
    };
};
