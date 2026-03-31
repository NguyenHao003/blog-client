'use client'

import React from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface PostItem {
  id: string
  title: string
  category: string
  author: string
  status: 'published' | 'draft' | 'archived'
  createdAt: string
}

const tableListDataSource: PostItem[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    category: 'Technology',
    author: 'Admin User',
    status: 'published',
    createdAt: '2024-03-18'
  },
  {
    id: '2',
    title: 'Advanced Tailwind CSS Tips',
    category: 'Design',
    author: 'John Doe',
    status: 'draft',
    createdAt: '2024-03-17'
  }
]

export default function PostsPage() {
  return (
    <PageContainer
      header={{
        title: 'Posts Management',
        subTitle: 'Create and edit blog posts'
      }}
    >
      <ProTable<PostItem>
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true
          },
          {
            title: 'Category',
            dataIndex: 'category'
          },
          {
            title: 'Author',
            dataIndex: 'author'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueEnum: {
              published: { text: 'Published', status: 'Success' },
              draft: { text: 'Draft', status: 'Processing' },
              archived: { text: 'Archived', status: 'Default' }
            }
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'dateTime'
          },
          {
            title: 'Actions',
            valueType: 'option',
            render: () => [
              <a key='edit'>Edit</a>,
              <a key='preview'>Preview</a>
            ]
          }
        ]}
        dataSource={tableListDataSource}
        rowKey='id'
        search={false}
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary'>
            New Post
          </Button>
        ]}
      />
    </PageContainer>
  )
}
