import { useQuery } from '@tanstack/react-query';
import { userApis } from '../apis/user-api';
import { USER_QUERY_KEYS } from '../constants/user-query-keys';
import { UserFilter } from '../types/user-types';

export const useUsers = (params: UserFilter) => {
    const { data, ...rest } = useQuery({
        queryKey: [...USER_QUERY_KEYS.LIST, params],
        queryFn: () => userApis.getUsers(params),
    });

    return { users: data?.data?.data, ...rest };
};
