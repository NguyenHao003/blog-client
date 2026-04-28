import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { tagApis } from '../apis/tag-api';
import { TAG_QUERY_KEYS } from '../constants/tag-query-keys';

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string | number) => tagApis.deleteTag(id),
        onSuccess: () => {
            message.success('Tag deleted successfully!');
            queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while deleting the tag.';
            message.error(errorMsg);
        },
    });

    return {
        deleteTag: mutation.mutateAsync,
        ...mutation,
    };
};
