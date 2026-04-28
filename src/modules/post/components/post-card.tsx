'use client';

import { timeFromNow } from '@/common/helpers';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PostData } from '../types/post-types';

const { Title, Paragraph, Text } = Typography;

interface PostCardProps {
    post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            {/* Image Wrapper */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                {post.thumbnailUrl ? (
                    <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 font-medium text-slate-400">
                        No Illustration
                    </div>
                )}
                {/* Overlay for a subtle gradient if needed, but the image looks clean */}
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5 pt-6">
                {/* Category Tag */}
                <div className="mb-4">
                    {post.category && (
                        <span 
                            className="inline-block rounded-[12px] px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
                            style={{ backgroundColor: '#72c1d3', color: '#fff' }}
                        >
                            {post.category.name}
                        </span>
                    )}
                </div>

                <Link href={`/posts/${post.slug}`} className="block">
                    <Title
                        level={3}
                        className="!mb-4 !mt-0 line-clamp-2 transition-colors group-hover:text-[#2d3748]"
                        style={{
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            lineHeight: 1.3,
                            color: '#1a202c',
                            letterSpacing: '-0.01em'
                        }}
                    >
                        {post.title}
                    </Title>
                </Link>

                <Paragraph
                    className="mb-8 line-clamp-2 text-[#4a5568]"
                    style={{ 
                        fontSize: '0.95rem', 
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}
                >
                    {post.summary || 'An exploration into the truck\'s polarising design and its impact on the future.'}
                </Paragraph>

                {/* Author Section */}
                <div className="mt-auto flex items-center gap-3">
                    <Avatar
                        src={post.author?.avatarUrl}
                        icon={<UserOutlined />}
                        size={44}
                        className="border-none bg-slate-100"
                    />
                    <div className="flex flex-col justify-center">
                        <Text className="text-[15px] font-bold leading-tight text-[#1a202c]">
                            {post.author?.username || 'Carrie Brewer'}
                        </Text>
                        <Text className="mt-0.5 text-[13px] font-medium text-slate-500">
                            {timeFromNow(post.publishedAt || post.createdAt)}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
