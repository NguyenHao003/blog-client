"use client";

import React from "react";
import { Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { key: "/", label: <Link href="/">Home</Link> },
    { key: "/blog", label: <Link href="/blog">Blog</Link> },
    { key: "/about", label: <Link href="/about">About</Link> },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center bg-white border-b px-4 sm:px-8">
        <div className="flex-1 flex items-center">
          <Title level={4} style={{ margin: 0, marginRight: 32 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              My Blog
            </Link>
          </Title>
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ borderBottom: "none", flex: 1 }}
          />
        </div>
        <div>
          <Link href="/admin">Admin Panel</Link>
        </div>
      </Header>
      <Content className="bg-white">
        <div style={{ padding: "24px 0" }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center", background: "#f5f5f5" }}>
        Ant Design Blog ©{new Date().getFullYear()} Created by Antigravity
      </Footer>
    </Layout>
  );
}
