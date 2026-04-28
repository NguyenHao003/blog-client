import { useQuery } from '@tanstack/react-query';
import { tagApis } from '../apis/tag-api';
import { TAG_QUERY_KEYS } from '../constants/tag-query-keys';
import { TagFilter } from '../types/tag-types';

export const useTags = (params: TagFilter) => {
    const { data, ...rest } = useQuery({
        queryKey: [...TAG_QUERY_KEYS.LIST, params],
        queryFn: () => tagApis.getTags(params),
    });

    return { tags: data?.data?.data, ...rest };
};
