import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { postApis } from '../apis/post-api';
import { POST_QUERY_KEYS } from '../constants/post-query-keys';

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string | number) => postApis.deletePost(id),
        onSuccess: () => {
            message.success('Post deleted successfully!');
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while deleting the post.';
            message.error(errorMsg);
        },
    });

    return {
        deletePost: mutation.mutateAsync,
        ...mutation,
    };
};
