export const USER_QUERY_KEYS = {
    LIST: ['users'] as const,
    DETAIL: (id: string) => ['users', id] as const,
    PROFILE: ['users', 'profile'] as const,
};
