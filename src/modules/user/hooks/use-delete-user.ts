import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { userApis } from '../apis/user-api';
import { USER_QUERY_KEYS } from '../constants/user-query-keys';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => userApis.deleteUser(id),
        onSuccess: () => {
            message.success('User deleted successfully!');
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            console.error('Delete user failed:', error);
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while deleting the user.';
            message.error(errorMsg);
        },
    });

    return {
        deleteUser: mutation.mutateAsync,
        ...mutation,
    };
};
