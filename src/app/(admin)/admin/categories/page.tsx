"use client";

import React from "react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

const tableListDataSource: CategoryItem[] = [
  { id: "1", name: "Technology", slug: "technology", count: 12 },
  { id: "2", name: "Design", slug: "design", count: 8 },
  { id: "3", name: "Life", slug: "life", count: 5 },
];

export default function CategoriesPage() {
  return (
    <PageContainer
      header={{
        title: "Categories",
        subTitle: "Organize your content by topics",
      }}
    >
      <ProTable<CategoryItem>
        columns={[
          {
            title: "Category Name",
            dataIndex: "name",
            formItemProps: {
              rules: [{ required: true, message: "Name is required" }],
            },
          },
          {
            title: "Slug",
            dataIndex: "slug",
          },
          {
            title: "Post Count",
            dataIndex: "count",
            valueType: "digit",
          },
          {
            title: "Actions",
            valueType: "option",
            render: () => [
              <a key="edit">Edit</a>,
              <a key="delete" style={{ color: "red" }}>Delete</a>,
            ],
          },
        ]}
        dataSource={tableListDataSource}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            New Category
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
