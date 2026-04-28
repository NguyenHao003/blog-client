export const CATEGORY_QUERY_KEYS = {
    LIST: ['categories'] as const,
    DETAIL: (id: string | number) => ['categories', id] as const,
};
