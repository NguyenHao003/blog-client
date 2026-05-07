import HomeClientUI from '@/modules/home/components/home-client-ui';
import { postApis } from '@/modules/post/apis/post-api';
import { PostData, PostStatus } from '@/modules/post/types/post-types';

export const revalidate = 60; // ISR each 60 seconds

export default async function HomePage() {
    let items: PostData[] = [];

    try {
        const response = await postApis.getPosts({
            page: 1,
            pageSize: 8,
            status: PostStatus.PUBLISHED,
            sortField: 'updatedAt',
            sortOrder: 'DESC',
        });
        items = response.data.data.items || [];
    } catch (error) {
        console.error('Error fetching posts for home page:', error);
    }

    return <HomeClientUI items={items} />;
}
