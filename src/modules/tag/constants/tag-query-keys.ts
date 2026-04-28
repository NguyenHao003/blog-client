export const TAG_QUERY_KEYS = {
    LIST: ['tags'] as const,
    DETAIL: (id: string | number) => ['tags', id] as const,
};
