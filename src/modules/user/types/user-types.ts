export type UserRole = 'AUTHOR' | 'ADMIN' | 'VISITOR';

export interface UserData {
    id?: string;
    username: string;
    email: string;
    password?: string;
    role: UserRole;
    avatarUrl?: string;
    createdAt?: string | Date;
}
