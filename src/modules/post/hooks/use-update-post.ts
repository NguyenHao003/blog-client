import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { postApis } from '../apis/post-api';
import { POST_QUERY_KEYS } from '../constants/post-query-keys';
import { UpdatePostPayload } from '../types/post-types';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string | number;
            data: UpdatePostPayload;
        }) => postApis.updatePost(id, data),
        onSuccess: (_response, variables) => {
            message.success('Post updated successfully!');
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.LIST });
            queryClient.invalidateQueries({
                queryKey: POST_QUERY_KEYS.DETAIL(variables.id),
            });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while updating the post.';
            message.error(errorMsg);
        },
    });

    const updatePost = async (
        id: string | number,
        data: UpdatePostPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate({ id, data }, options);
    };

    return {
        updatePost,
        ...mutation,
    };
};
