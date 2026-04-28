export const POST_QUERY_KEYS = {
    LIST: ['posts'] as const,
    DETAIL: (id: string | number) => ['posts', id] as const,
};
