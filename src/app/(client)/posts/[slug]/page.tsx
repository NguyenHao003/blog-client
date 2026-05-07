import { postApis } from '@/modules/post/apis/post-api';
import PostDetailContent from '@/modules/post/components/post-detail-content';
import { PostStatus } from '@/modules/post/types/post-types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR each 60 seconds

interface PageProps {
    params: {
        slug: string;
    };
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const response = await postApis.getPostBySlug(params.slug);
        const post = response.data.data;

        if (!post) return { title: 'Post Not Found' };

        return {
            title: `${post.title} | Blog Công Nghệ`,
            description: post.summary || post.title,
            openGraph: {
                title: post.title,
                description: post.summary || '',
                images: post.thumbnailUrl ? [post.thumbnailUrl] : [],
                type: 'article',
            },
        };
    } catch {
        return { title: 'Post Not Found' };
    }
}

// Generate static params for build time
export async function generateStaticParams() {
    try {
        const response = await postApis.getPosts({ 
            page: 1, 
            pageSize: 100, 
            status: PostStatus.PUBLISHED 
        });
        const posts = response.data.data.items;

        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Failed to generate static params:', error);
        return [];
    }
}

export default async function PostDetailPage({ params }: PageProps) {
    try {
        const response = await postApis.getPostBySlug(params.slug);
        const post = response.data.data;

        if (!post) {
            notFound();
        }

        return (
            <div className="min-h-screen bg-white">
                <PostDetailContent post={post} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching post detail:', error);
        notFound();
    }
}
