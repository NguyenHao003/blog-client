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
import { CategoryModalType } from '../enums';
import { useDeleteCategory } from '../hooks/use-delete-category';
import { CategoryData } from '../types/category-types';

export type CategoriesTableProps = Partial<
    ProTableProps<CategoryData, Record<string, unknown>>
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

export const CategoriesTable = ({ ...props }: CategoriesTableProps) => {
    const { openModal } = useModalStore();
    const { deleteCategory } = useDeleteCategory();

    const handleDelete = (record: CategoryData) => {
        Modal.confirm({
            title: 'Delete Category',
            content: `Are you sure you want to delete category "${record.name}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            centered: true,
            onOk: async () => {
                if (record.id) {
                    await deleteCategory(record.id);
                }
            },
        });
    };

    const columns: ProColumns<CategoryData>[] = [
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
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
            search: false,
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (_dom, record) => (
                <Space>
                    <Tooltip title="Edit Category">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() =>
                                openModal(
                                    CategoryModalType.CATEGORY_UPDATE,
                                    record
                                )
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Delete Category">
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
        <ProTable<CategoryData, Record<string, unknown>>
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
                        New Category
                    </Button>,
                ],
            }}
            {...props}
            pagination={false}
        />
    );
};
