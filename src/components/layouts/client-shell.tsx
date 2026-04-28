'use client';

import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Space, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type ClientShellProps = {
    children: React.ReactNode;
    isAuthenticated: boolean;
    userName?: string | null;
};

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const navigationItems = [
    { key: '/', label: 'Trang chủ' },
    { key: '/blog', label: 'Bài viết' },
    { key: '/about', label: 'Giới thiệu' },
    { key: '/admin', label: 'Quản trị' },
];

export default function ClientShell({
    children,
    // isAuthenticated,
    // userName,
}: ClientShellProps) {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    height: 'auto',
                    lineHeight: 'normal',
                    padding: 0,
                    background: 'rgba(255, 255, 255, 0.96)',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
                    backdropFilter: 'blur(18px)',
                }}
            >
                <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            style={{
                                textDecoration: 'none',
                                color: '#111827',
                            }}
                        >
                            <Title
                                level={3}
                                style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    fontStyle: 'italic',
                                    fontFamily:
                                        'Georgia, Times New Roman, serif',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                IT Blog
                            </Title>
                        </Link>

                        <nav className="hidden items-center gap-5 lg:flex">
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.key;

                                return (
                                    <Link
                                        key={item.key}
                                        href={item.key}
                                        style={{
                                            fontSize: 13,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.04em',
                                            color: isActive
                                                ? '#111827'
                                                : '#475569',
                                            fontWeight: isActive ? 700 : 500,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Input
                            placeholder="Tìm xem bài viết"
                            prefix={
                                <SearchOutlined style={{ color: '#94a3b8' }} />
                            }
                            style={{
                                width: 220,
                                borderRadius: 999,
                                background: '#f8fafc',
                            }}
                        />

                        {/* {isAuthenticated && userName ? (
                            <Space
                                size={8}
                                style={{
                                    padding: '7px 12px',
                                    borderRadius: 999,
                                    background: '#f8fafc',
                                }}
                            >
                                <UserOutlined />
                                <Text style={{ fontWeight: 600 }}>
                                    {userName}
                                </Text>
                            </Space>
                        ) : null} */}

                        {/* {isAuthenticated ? (
                            <Button
                                href="/api/auth/logout"
                                icon={<LogoutOutlined />}
                                style={{ borderRadius: 999 }}
                            >
                                Log out
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                href="/auth/login?returnTo=/admin"
                                icon={<ArrowRightOutlined />}
                                style={{ borderRadius: 999 }}
                            >
                                Log in
                            </Button>
                        )} */}
                    </div>

                    <Button
                        className="lg:!hidden"
                        icon={<MenuOutlined />}
                        onClick={() => setDrawerOpen(true)}
                        style={{ borderRadius: 999 }}
                    />
                </div>
            </Header>

            <Content>{children}</Content>

            <Footer
                style={{
                    background: '#dcedfb',
                    padding: '56px 24px 28px',
                    borderTop: '1px solid rgba(15, 23, 42, 0.06)',
                }}
            >
                <div className="mx-auto w-full max-w-[1280px]">
                    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                        <div className="flex gap-5">
                            <div className="h-24 w-24 shrink-0 rounded-2xl bg-[linear-gradient(135deg,_#1d4ed8_0%,_#0f172a_120%)]" />
                            <div>
                                <Title
                                    level={4}
                                    style={{ marginTop: 0, marginBottom: 8 }}
                                >
                                    IT Blog
                                </Title>
                                <Paragraph
                                    style={{
                                        color: '#334155',
                                        marginBottom: 12,
                                    }}
                                >
                                    Chào bạn, đây là một góc nhỏ để chia sẻ hành
                                    trình, trải nghiệm và những bài viết dài hơi
                                    về cuộc sống, du lịch và cảm hứng làm việc.
                                </Paragraph>
                                <Space size={10}>
                                    <div className="h-8 w-8 rounded-full bg-white" />
                                    <div className="h-8 w-8 rounded-full bg-white" />
                                    <div className="h-8 w-8 rounded-full bg-white" />
                                </Space>
                            </div>
                        </div>

                        <div>
                            <Text
                                style={{
                                    display: 'block',
                                    fontWeight: 700,
                                    marginBottom: 12,
                                    color: '#0f172a',
                                }}
                            >
                                Theo dõi blog của tôi
                            </Text>
                            <Input
                                placeholder="Email"
                                style={{
                                    height: 42,
                                    marginBottom: 12,
                                    borderRadius: 10,
                                }}
                            />
                            <Button
                                type="primary"
                                block
                                style={{
                                    height: 42,
                                    borderRadius: 10,
                                    fontWeight: 700,
                                }}
                            >
                                Theo dõi
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-300/70 pt-6">
                        <Text style={{ color: '#334155' }}>
                            © {new Date().getFullYear()} IT Blog. All Rights
                            Reserved.
                        </Text>
                        <Text style={{ color: '#334155' }}>
                            37 Người theo dõi
                        </Text>
                    </div>
                </div>
            </Footer>

            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                width={300}
                title="Navigation"
            >
                <div className="flex flex-col gap-3">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.key}
                            href={item.key}
                            onClick={() => setDrawerOpen(false)}
                            style={{
                                padding: '12px 14px',
                                borderRadius: 16,
                                background:
                                    pathname === item.key
                                        ? '#eff6ff'
                                        : '#f8fafc',
                                color: '#0f172a',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </Drawer>
        </Layout>
    );
}
