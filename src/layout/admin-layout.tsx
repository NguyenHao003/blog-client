'use client';

import {
    AppstoreOutlined,
    DashboardOutlined,
    FileTextOutlined,
    LogoutOutlined,
    SettingOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type AdminLayoutProps = {
    children: React.ReactNode;
    user: {
        name: string;
        email?: string | null;
        picture?: string | null;
    };
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user }) => {
    const pathname = usePathname();
    const normalizedName = user.name?.trim();
    const normalizedEmail = user.email?.trim();
    const showEmailItem = normalizedEmail && normalizedEmail !== normalizedName;
    const avatarMenuItems: MenuProps['items'] = [
        {
            key: 'profile-name',
            label: normalizedName || 'User',
            disabled: true,
        },
        ...(showEmailItem
            ? [
                  {
                      key: 'profile-email',
                      label: normalizedEmail,
                      disabled: true,
                  },
              ]
            : []),
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Log out',
        },
    ];

    return (
        <div style={{ height: '100vh' }}>
            <ProLayout
                title="Admin Panel"
                logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                location={{ pathname }}
                layout="side"
                fixSiderbar
                siderWidth={208}
                breakpoint={false}
                menu={{ type: 'group' }}
                avatarProps={{
                    src: user.picture || undefined,
                    size: 'small',
                    title: '',
                    icon: <UserOutlined />,
                    render: (_, defaultDom) => (
                        <Dropdown
                            menu={{
                                items: avatarMenuItems,
                                onClick: ({ key }) => {
                                    if (key === 'logout') {
                                        window.location.href =
                                            '/api/auth/logout';
                                    }
                                },
                            }}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <Space style={{ cursor: 'pointer' }}>
                                {defaultDom}
                                {user.name}
                            </Space>
                        </Dropdown>
                    ),
                }}
                route={{
                    path: '/admin',
                    routes: [
                        {
                            path: '/admin/dashboard',
                            name: 'Dashboard',
                            icon: <DashboardOutlined />,
                        },
                        {
                            path: '/admin/posts',
                            name: 'Posts',
                            icon: <FileTextOutlined />,
                        },
                        {
                            path: '/admin/categories',
                            name: 'Categories',
                            icon: <AppstoreOutlined />,
                        },
                        {
                            path: '/admin/tags',
                            name: 'Tags',
                            icon: <TagsOutlined />,
                        },
                        {
                            path: '/admin/users',
                            name: 'Users',
                            icon: <UserOutlined />,
                        },
                        {
                            path: '/admin/settings',
                            name: 'Settings',
                            icon: <SettingOutlined />,
                        },
                    ],
                }}
                menuItemRender={(item: MenuDataItem, dom: React.ReactNode) => (
                    <Link href={item.path || '/admin'}>{dom}</Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
};

export default AdminLayout;
