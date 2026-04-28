'use client';

import { formattedDate, getSortOrder } from '@/common/helpers';
import useModalStore from '@/common/hooks/use-modal';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {
    ProColumns,
    ProTable,
    ProTableProps,
} from '@ant-design/pro-components';
import { Avatar, Button, Modal, Space, Tag, Tooltip } from 'antd';
import { PostModalType } from '../enums';
import { useDeletePost } from '../hooks/use-delete-post';
import { PostData, PostStatus } from '../types/post-types';

export type PostsTableProps = Partial<
    ProTableProps<PostData, Record<string, unknown>>
> & {
    pagination: {
        current: number;
        pageSize: number;
    };
    onChange?: (pagination: any, filters: any, sorter: any) => void;
    sortField?: string | null;
    sortOrder?: string | null;
    onCreate?: () => void;
};

const statusColorMap = {
    [PostStatus.DRAFT]: 'gold',
    [PostStatus.PUBLISHED]: 'green',
    [PostStatus.ARCHIVED]: 'default',
} as const;

export const PostsTable = ({ ...props }: PostsTableProps) => {
    const { openModal } = useModalStore();
    const { deletePost } = useDeletePost();

    const handleDelete = (record: PostData) => {
        Modal.confirm({
            title: 'Delete Post',
            content: `Are you sure you want to delete post "${record.title}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            centered: true,
            onOk: async () => {
                if (record.id) {
                    await deletePost(record.id);
                }
            },
        });
    };

    const columns: ProColumns<PostData>[] = [
        {
            title: 'No.',
            dataIndex: 'no.',
            valueType: 'text',
            width: 60,
            render: (_dom, _record, index) => {
                const current = props.pagination.current;
                const pageSize = props.pagination.pageSize;
                return <span>{(current - 1) * pageSize + index + 1}</span>;
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: true,
            sortOrder: getSortOrder(props?.sortOrder, props?.sortField, 'title'),
            render: (_dom, record) => (
                <Space align="start">
                    <Avatar
                        src={record.thumbnailUrl || undefined}
                        shape="square"
                        size={56}
                    >
                        {record.title.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 600 }}>{record.title}</div>
                        <div style={{ color: '#64748b', marginTop: 4 }}>
                            {record.slug}
                        </div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            render: (_dom, record) => record.category?.name || '--',
        },
        {
            title: 'Author',
            dataIndex: ['author', 'username'],
            render: (_dom, record) => record.author?.username || '--',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_dom, record) => (
                <Tag color={statusColorMap[record.status] || 'default'}>
                    {record.status}
                </Tag>
            ),
        },
        {
            title: 'Views',
            dataIndex: 'viewCount',
        },
        {
            title: 'Published At',
            dataIndex: 'publishedAt',
            sorter: true,
            sortOrder: getSortOrder(
                props?.sortOrder,
                props?.sortField,
                'publishedAt'
            ),
            render: (_dom, record) =>
                record.publishedAt ? formattedDate(record.publishedAt) : '--',
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (_dom, record) => (
                <Space>
                    <Tooltip title="Preview">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Tooltip title="Edit Post">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() =>
                                openModal(PostModalType.POST_UPDATE, record)
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Delete Post">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <ProTable<PostData, Record<string, unknown>>
            columns={columns}
            rowKey="id"
            search={false}
            toolbar={{
                actions: [
                    <Button
                        key="add"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={props.onCreate}
                    >
                        New Post
                    </Button>,
                ],
            }}
            {...props}
            pagination={false}
        />
    );
};
