import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { message } from 'antd';
import { userApis } from '../apis/user-api';
import { UserData } from '../types/user-types';
import { USER_QUERY_KEYS } from '../constants/user-query-keys';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<UserData> }) =>
            userApis.updateUser(id, data),
        onSuccess: (_response, variables) => {
            message.success('User updated successfully!');
            // Invalidate the entire list to ensure consistency
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.LIST });
            // Invalidate the specific user detail query cache
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.DETAIL(variables.id),
            });
        },
        onError: (error: any) => {
            console.error('Update user failed:', error);
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while updating the user.';
            message.error(errorMsg);
        },
    });

    const updateUser = async (
        id: string,
        data: Partial<UserData>,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate({ id, data }, options);
    };

    return {
        updateUser,
        ...mutation,
    };
};
