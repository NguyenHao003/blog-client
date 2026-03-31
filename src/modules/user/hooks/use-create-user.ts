import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { message } from 'antd';
import { userApis } from '../apis/user-api';
import { USER_QUERY_KEYS } from '../constants/user-query-keys';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: any) => userApis.createUser(values),
        onSuccess: () => {
            message.success('User created successfully!');
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            console.error('Create user failed:', error);
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while creating the user.';
            message.error(errorMsg);
        },
    });

    const createUser = async (values: any, options?: UseMutationOptions<any, any, any>) => {
        mutation.mutate(values, options);
    };

    return {
        createUser,
        ...mutation,
    };
};
