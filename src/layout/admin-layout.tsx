'use client';

import {
    AppstoreOutlined,
    DashboardOutlined,
    FileTextOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();

    return (
        <div style={{ height: '100vh' }}>
            <ProLayout
                title="Admin Panel"
                logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                location={{ pathname }}
                layout="side"
                colorPrimary="#1677ff"
                fixSiderbar
                siderWidth={208} // Fixed width to prevent jumping
                breakpoint={false}
                menu={{ type: 'group' }}
                token={{
                    header: {
                        colorBgHeader: '#fff',
                        heightLayoutHeader: 64,
                    },
                    sider: {
                        colorBgMenuItemSelected: '#e6f4ff',
                    },
                    pageContainer: {
                        paddingInlinePageContainerContent: 24,
                        paddingBlockPageContainerContent: 24,
                    },
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efpAdH7ic/Kyva9NoSBy0iDsOxubMf.png',
                    size: 'small',
                    title: 'Admin',
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
