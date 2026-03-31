import { useQuery } from '@tanstack/react-query';
import { userApis } from '../apis/user-api';
import { USER_QUERY_KEYS } from '../constants/user-query-keys';

export const useUser = (id?: string) => {
    const query = useQuery({
        queryKey: USER_QUERY_KEYS.DETAIL(id as string),
        queryFn: () => userApis.getUserById(id as string),
        enabled: !!id,
    });

    return {
        user: query.data?.data,
        ...query,
    };
};
