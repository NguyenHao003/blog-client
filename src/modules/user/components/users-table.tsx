import useModalStore from '@/common/hooks/use-modal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    ProColumns,
    ProTable,
    ProTableProps,
} from '@ant-design/pro-components';
import { Button, Modal, Space, Tooltip } from 'antd';
import { UserModalType } from '../enums';
import { useDeleteUser } from '../hooks/use-delete-user';
import { UserData } from '../types/user-types';

export type UsersTableProps = Partial<
    ProTableProps<UserData, Record<string, unknown>>
> & {};

export const UsersTable = (props: UsersTableProps) => {
    const { openModal } = useModalStore();
    const { deleteUser } = useDeleteUser();

    const handleDelete = (record: UserData) => {
        Modal.confirm({
            title: 'Delete User',
            content: `Are you sure you want to delete user "${record.username}"? This action cannot be undone.`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            centered: true,
            onOk: async () => {
                if (record.id) {
                    await deleteUser(record.id);
                }
            },
        });
    };

    const columns: ProColumns<UserData>[] = [
        {
            title: 'Avatar',
            dataIndex: 'avatarUrl',
            valueType: 'avatar',
        },
        {
            title: 'Name',
            dataIndex: 'username',
            copyable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            valueEnum: {
                ADMIN: { text: 'Administrator', status: 'Error' },
                AUTHOR: { text: 'Author', status: 'Success' },
                VISITOR: { text: 'Visitor', status: 'Default' },
            },
        },

        {
            title: 'Joined At',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (_dom, record) => (
                <Space>
                    <Tooltip title="Edit User">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() =>
                                openModal(UserModalType.USER_UPDATE, record)
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Delete User">
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
        <ProTable<UserData, Record<string, unknown>>
            columns={columns}
            rowKey="id"
            search={false}
            {...props}
        />
    );
};
