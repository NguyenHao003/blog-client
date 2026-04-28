import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { tagApis } from '../apis/tag-api';
import { TAG_QUERY_KEYS } from '../constants/tag-query-keys';
import { UpdateTagPayload } from '../types/tag-types';

export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string | number;
            data: UpdateTagPayload;
        }) => tagApis.updateTag(id, data),
        onSuccess: (_response, variables) => {
            message.success('Tag updated successfully!');
            queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.LIST });
            queryClient.invalidateQueries({
                queryKey: TAG_QUERY_KEYS.DETAIL(variables.id),
            });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while updating the tag.';
            message.error(errorMsg);
        },
    });

    const updateTag = async (
        id: string | number,
        data: UpdateTagPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate({ id, data }, options);
    };

    return {
        updateTag,
        ...mutation,
    };
};
