'use client';

import { PostCard } from '@/modules/post/components';
import { usePosts } from '@/modules/post/hooks/use-posts';
import { PostStatus } from '@/modules/post/types/post-types';
import { Card, Col, Empty, Row, Skeleton, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function BlogPage() {
    const { posts, isFetching } = usePosts({
        page: 1,
        pageSize: 12,
        status: PostStatus.PUBLISHED,
        sortField: 'publishedAt',
        sortOrder: 'DESC',
    });

    const items = posts?.items || [];

    return (
        <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-col items-start px-2">
                <Title 
                    level={1} 
                    className="!mb-4 !text-4xl font-black tracking-tight text-slate-900"
                >
                    Blog
                </Title>
                <Paragraph className="max-w-2xl text-lg text-slate-500 leading-relaxed">
                    Khám phá những kiến thức mới nhất về công nghệ và lập trình.
                </Paragraph>
                <div className="h-1.5 w-24 rounded-full bg-blue-500 mt-2" />
            </div>

            {isFetching ? (
                <Row gutter={[32, 48]}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Col xs={24} md={12} lg={8} xl={6} key={index}>
                            <Card 
                                className="rounded-[16px] border-none shadow-sm overflow-hidden" 
                                styles={{ body: { padding: 24 } }}
                            >
                                <Skeleton.Image className="!w-full !h-48 rounded-xl mb-4" />
                                <Skeleton active paragraph={{ rows: 3 }} title />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : items.length === 0 ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-slate-50 shadow-sm border border-dashed border-slate-200">
                    <Empty description="Hiện chưa có bài viết nào được xuất bản." />
                </div>
            ) : (
                <Row gutter={[32, 48]}>
                    {items.map((post) => (
                        <Col xs={24} md={12} lg={8} xl={6} key={String(post.id)}>
                            <PostCard post={post} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
