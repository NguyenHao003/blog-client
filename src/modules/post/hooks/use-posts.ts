import { useQuery } from '@tanstack/react-query';
import { postApis } from '../apis/post-api';
import { POST_QUERY_KEYS } from '../constants/post-query-keys';
import { PostFilter } from '../types/post-types';

export const usePosts = (params: PostFilter) => {
    const { data, ...rest } = useQuery({
        queryKey: [...POST_QUERY_KEYS.LIST, params],
        queryFn: () => postApis.getPosts(params),
    });

    return { posts: data?.data?.data, ...rest };
};
