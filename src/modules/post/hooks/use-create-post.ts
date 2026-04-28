import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { postApis } from '../apis/post-api';
import { POST_QUERY_KEYS } from '../constants/post-query-keys';
import { CreatePostPayload } from '../types/post-types';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: CreatePostPayload) => postApis.createPost(values),
        onSuccess: () => {
            message.success('Post created successfully!');
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while creating the post.';
            message.error(errorMsg);
        },
    });

    const createPost = async (
        values: CreatePostPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate(values, options);
    };

    return {
        createPost,
        ...mutation,
    };
};
