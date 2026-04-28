'use client';

import { getSortOrder } from '@/common/helpers';
import useModalStore from '@/common/hooks/use-modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
    ProColumns,
    ProTable,
    ProTableProps,
} from '@ant-design/pro-components';
import { Button, Modal, Space, Tooltip } from 'antd';
import { TagModalType } from '../enums';
import { useDeleteTag } from '../hooks/use-delete-tag';
import { TagData } from '../types/tag-types';

export type TagsTableProps = Partial<
    ProTableProps<TagData, Record<string, unknown>>
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

export const TagsTable = ({ ...props }: TagsTableProps) => {
    const { openModal } = useModalStore();
    const { deleteTag } = useDeleteTag();

    const handleDelete = (record: TagData) => {
        Modal.confirm({
            title: 'Delete Tag',
            content: `Are you sure you want to delete tag "${record.name}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            centered: true,
            onOk: async () => {
                if (record.id) {
                    await deleteTag(record.id);
                }
            },
        });
    };

    const columns: ProColumns<TagData>[] = [
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
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            sortOrder: getSortOrder(props?.sortOrder, props?.sortField, 'name'),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            copyable: true,
            sorter: true,
            sortOrder: getSortOrder(props?.sortOrder, props?.sortField, 'slug'),
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (_dom, record) => (
                <Space>
                    <Tooltip title="Edit Tag">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() =>
                                openModal(TagModalType.TAG_UPDATE, record)
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Delete Tag">
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
        <ProTable<TagData, Record<string, unknown>>
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
                        New Tag
                    </Button>,
                ],
            }}
            {...props}
            pagination={false}
        />
    );
};
