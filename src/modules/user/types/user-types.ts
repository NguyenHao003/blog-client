import { CommonAttribute, CommonFilter } from '@/common/types';

export type UserRole = 'AUTHOR' | 'ADMIN' | 'VISITOR';

export interface UserData extends CommonAttribute {
    username: string;
    email: string;
    password?: string;
    role: UserRole;
    avatarUrl?: string;
    createdAt?: string | Date;
}

export interface UserFilter extends CommonFilter {
    role?: UserRole | null;
}
