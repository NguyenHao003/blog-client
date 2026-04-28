import { useQuery } from '@tanstack/react-query';
import { postApis } from '../apis/post-api';
import { POST_QUERY_KEYS } from '../constants/post-query-keys';

export const usePost = (id?: string | number) => {
    const query = useQuery({
        queryKey: POST_QUERY_KEYS.DETAIL(id as string | number),
        queryFn: () => postApis.getPostById(id as string | number),
        enabled: !!id,
    });

    return {
        post: query.data?.data?.data,
        ...query,
    };
};
