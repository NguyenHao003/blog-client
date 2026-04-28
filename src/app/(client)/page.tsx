'use client';

import { PostCard } from '@/modules/post/components';
import { usePosts } from '@/modules/post/hooks/use-posts';
import { PostStatus } from '@/modules/post/types/post-types';
import { Card, Col, Empty, Row, Skeleton, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function HomePage() {
    const { posts, isFetching } = usePosts({
        page: 1,
        pageSize: 18,
        status: PostStatus.PUBLISHED,
        sortField: 'updatedAt',
        sortOrder: 'DESC',
    });

    const items = posts?.items || [];

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <section className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10">
                <div className="mb-16 flex flex-col items-center text-center">
                    <Title 
                        level={1} 
                        className="!mb-6 !text-4xl md:!text-5xl lg:!text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent"
                    >
                        Khám Phá Tri Thức Mới
                    </Title>
                    <Paragraph className="max-w-2xl text-lg text-slate-500 leading-relaxed">
                        Cập nhật những bài viết chuyên sâu về công nghệ, lập trình và xu hướng phát triển phần mềm mới nhất từ đội ngũ chuyên gia.
                    </Paragraph>
                    <div className="h-1.5 w-24 rounded-full bg-blue-500 mt-2" />
                </div>

                {isFetching ? (
                    <Row gutter={[32, 40]}>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Col xs={24} md={12} lg={8} xl={6} key={index}>
                                <Card 
                                    className="rounded-[24px] border-none shadow-sm overflow-hidden" 
                                    styles={{ body: { padding: 24 } }}
                                >
                                    <Skeleton.Image className="!w-full !h-52 rounded-2xl mb-4" />
                                    <Skeleton active paragraph={{ rows: 4 }} title />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : items.length === 0 ? (
                    <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-white shadow-sm">
                        <Empty 
                            description={
                                <span className="text-slate-400 text-base">
                                    Hiện chưa có bài viết nào được xuất bản. Vui lòng quay lại sau!
                                </span>
                            } 
                        />
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
            </section>
        </div>
    );
}
