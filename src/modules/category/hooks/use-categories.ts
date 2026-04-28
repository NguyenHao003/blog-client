import { useQuery } from '@tanstack/react-query';
import { categoryApis } from '../apis/category-api';
import { CATEGORY_QUERY_KEYS } from '../constants/category-query-keys';
import { CategoryFilter } from '../types/category-types';

export const useCategories = (params: CategoryFilter) => {
    const { data, ...rest } = useQuery({
        queryKey: [...CATEGORY_QUERY_KEYS.LIST, params],
        queryFn: () => categoryApis.getCategories(params),
    });

    return { categories: data?.data?.data, ...rest };
};
