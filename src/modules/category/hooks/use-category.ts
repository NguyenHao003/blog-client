import { useQuery } from '@tanstack/react-query';
import { categoryApis } from '../apis/category-api';
import { CATEGORY_QUERY_KEYS } from '../constants/category-query-keys';

export const useCategory = (id?: string | number) => {
    const query = useQuery({
        queryKey: CATEGORY_QUERY_KEYS.DETAIL(id as string | number),
        queryFn: () => categoryApis.getCategoryById(id as string | number),
        enabled: !!id,
    });

    return {
        category: query.data?.data?.data,
        ...query,
    };
};
