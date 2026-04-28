import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
} from '@tanstack/react-query';
import { message } from 'antd';
import { tagApis } from '../apis/tag-api';
import { TAG_QUERY_KEYS } from '../constants/tag-query-keys';
import { CreateTagPayload } from '../types/tag-types';

export const useCreateTag = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: CreateTagPayload) => tagApis.createTag(values),
        onSuccess: () => {
            message.success('Tag created successfully!');
            queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.LIST });
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.message ||
                'An error occurred while creating the tag.';
            message.error(errorMsg);
        },
    });

    const createTag = async (
        values: CreateTagPayload,
        options?: UseMutationOptions<any, any, any>
    ) => {
        mutation.mutate(values, options);
    };

    return {
        createTag,
        ...mutation,
    };
};
