'use client';

import { PostData } from '../types/post-types';
import CKContent from '@/common/components/text-editor/ck-content';
import { Typography, Avatar, Tag, Space, Divider } from 'antd';
import { UserOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { timeFromNow } from '@/common/helpers';
import Image from 'next/image';

const { Title, Text, Paragraph } = Typography;

interface PostDetailContentProps {
    post: PostData;
}

export default function PostDetailContent({ post }: PostDetailContentProps) {
    return (
        <article className="mx-auto max-w-[900px] px-6 py-12 lg:px-0">
            {/* Header */}
            <header className="mb-12">
                <div className="mb-6 flex flex-wrap gap-2">
                    {post.category && (
                        <Tag color="blue" className="px-3 py-1 text-sm font-medium">
                            {post.category.name}
                        </Tag>
                    )}
                    {post.tags?.map((tag) => (
                        <Tag key={String(tag.id)} className="px-3 py-1 text-sm">
                            {tag.name}
                        </Tag>
                    ))}
                </div>

                <Title level={1} className="!mb-8 !text-4xl md:!text-5xl !font-black !leading-tight text-slate-900">
                    {post.title}
                </Title>

                <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-slate-50 p-6">
                    <div className="flex items-center gap-4">
                        <Avatar 
                            src={post.author?.avatarUrl} 
                            icon={<UserOutlined />} 
                            size={56} 
                            className="border-2 border-white shadow-sm"
                        />
                        <div>
                            <div className="text-lg font-bold text-slate-900">
                                {post.author?.username || 'Chuyên gia'}
                            </div>
                            <div className="text-sm text-slate-500">
                                {post.author?.email}
                            </div>
                        </div>
                    </div>

                    <Space size={24} className="text-slate-500">
                        <span className="flex items-center gap-2">
                            <ClockCircleOutlined />
                            {timeFromNow(post.publishedAt || post.createdAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <EyeOutlined />
                            {post.viewCount} lượt xem
                        </span>
                    </Space>
                </div>
            </header>

            {/* Featured Image */}
            {post.thumbnailUrl && (
                <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-[32px] shadow-2xl shadow-slate-200">
                    <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Summary */}
            {post.summary && (
                <div className="mb-12 rounded-2xl bg-blue-50/50 p-8">
                    <Paragraph className="!mb-0 text-xl font-medium italic leading-relaxed text-slate-700">
                        &quot;{post.summary}&quot;
                    </Paragraph>
                </div>
            )}

            <Divider className="my-12 opacity-50" />

            {/* Content */}
            <div className="ck-content prose prose-slate max-w-none">
                <CKContent value={post.content} />
            </div>

            <Divider className="my-16 opacity-50" />
            
            {/* Footer / Sharing (Placeholder) */}
            <footer className="text-center">
                <Paragraph className="text-slate-400">
                    Cảm ơn bạn đã đọc bài viết này. Hãy chia sẻ nếu bạn thấy hữu ích!
                </Paragraph>
            </footer>
        </article>
    );
}
