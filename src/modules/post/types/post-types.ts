import { CommonAttribute, CommonFilter } from '@/common/types';
import { CategoryData } from '@/modules/category/types/category-types';
import { TagData } from '@/modules/tag/types/tag-types';

export enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export const POST_STATUS_OPTIONS = [
    { label: 'Draft', value: PostStatus.DRAFT },
    { label: 'Published', value: PostStatus.PUBLISHED },
    { label: 'Archived', value: PostStatus.ARCHIVED },
];

export interface PostAuthor {
    id: string;
    username: string;
    email?: string;
    avatarUrl?: string;
}

export interface PostData extends CommonAttribute {
    title: string;
    slug: string;
    summary?: string | null;
    content: string;
    thumbnailUrl?: string | null;
    status: PostStatus;
    viewCount: number;
    authorId: string;
    author?: PostAuthor;
    categoryId?: string | null;
    category?: CategoryData | null;
    tags?: TagData[];
    publishedAt?: string | Date | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface CreatePostPayload {
    title: string;
    summary?: string;
    content: string;
    thumbnailUrl?: string;
    categoryId?: string;
    tagIds?: string[];
    status?: PostStatus;
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {}

export interface PostFilter extends CommonFilter {
    status?: PostStatus | null;
    categoryId?: string | null;
}
