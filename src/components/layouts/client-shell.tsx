"use client";

import { Button, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ClientShellProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userName?: string | null;
};

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function ClientShell({
  children,
  isAuthenticated,
  userName,
}: ClientShellProps) {
  const pathname = usePathname();

  const menuItems = [
    { key: "/", label: <Link href="/">Home</Link> },
    { key: "/blog", label: <Link href="/blog">Blog</Link> },
    { key: "/about", label: <Link href="/about">About</Link> },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center border-b bg-white px-4 sm:px-8">
        <div className="flex flex-1 items-center gap-4">
          <Title level={4} style={{ margin: 0, marginRight: 16 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              My Blog
            </Link>
          </Title>
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ borderBottom: "none", flex: 1, minWidth: 0 }}
          />
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && userName ? <Text>{userName}</Text> : null}
          <Link href="/admin">Admin Panel</Link>
          {isAuthenticated ? (
            <Button href="/auth/logout">Log out</Button>
          ) : (
            <Button type="primary" href="/auth/login?returnTo=/admin">
              Log in
            </Button>
          )}
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
