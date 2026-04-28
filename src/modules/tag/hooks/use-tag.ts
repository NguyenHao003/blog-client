import { useQuery } from '@tanstack/react-query';
import { tagApis } from '../apis/tag-api';
import { TAG_QUERY_KEYS } from '../constants/tag-query-keys';

export const useTag = (id?: string | number) => {
    const query = useQuery({
        queryKey: TAG_QUERY_KEYS.DETAIL(id as string | number),
        queryFn: () => tagApis.getTagById(id as string | number),
        enabled: !!id,
    });

    return {
        tag: query.data?.data?.data,
        ...query,
    };
};
