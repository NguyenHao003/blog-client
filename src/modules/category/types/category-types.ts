import { CommonAttribute, CommonFilter } from '@/common/types';

export interface CategoryData extends CommonAttribute {
    name: string;
    slug: string;
    description?: string | null;
}

export interface CreateCategoryPayload {
    name: string;
    description?: string;
}

export interface UpdateCategoryPayload {
    name: string;
    description?: string;
}

export interface CategoryFilter extends CommonFilter {}
