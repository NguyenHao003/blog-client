import { postApis } from '@/modules/post/apis/post-api';
import { PostData, PostStatus } from '@/modules/post/types/post-types';
import BlogClientUI from '@/modules/blog/components/blog-client-ui';

export const revalidate = 60; // ISR each 60 seconds

export default async function BlogPage() {
    let items: PostData[] = [];
    
    try {
        const response = await postApis.getPosts({
            page: 1,
            pageSize: 24, // Fetch more for the list page
            status: PostStatus.PUBLISHED,
            sortField: 'publishedAt',
            sortOrder: 'DESC',
        });
        items = response.data.data.items || [];
    } catch (error) {
        console.error('Error fetching posts for blog page:', error);
    }

    return <BlogClientUI items={items} />;
}
