import { CommonAttribute, CommonFilter } from '@/common/types';

export interface TagData extends CommonAttribute {
    name: string;
    slug: string;
}

export interface CreateTagPayload {
    name: string;
}

export interface UpdateTagPayload {
    name: string;
}

export interface TagFilter extends CommonFilter {}
