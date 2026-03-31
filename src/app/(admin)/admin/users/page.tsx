'use client';

import useModalStore from '@/common/hooks/use-modal';
import UserModalForm from '@/modules/user/components/user-modal-form';
import { UsersTable } from '@/modules/user/components/users-table';
import { UserModalType } from '@/modules/user/enums';
import { useUsers } from '@/modules/user/hooks/use-users';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

export default function UsersPage() {
    const { users, isLoading } = useUsers();
    const typeModal = useModalStore((s) => s.typeModal);
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    const isModalOpen =
        typeModal === UserModalType.USER_CREATE ||
        typeModal === UserModalType.USER_UPDATE;

    return (
        <PageContainer
            header={{
                title: 'User Management',
                subTitle: 'Manage permissions and user accounts',
                extra: [
                    <Button
                        key="add"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => openModal(UserModalType.USER_CREATE)}
                    >
                        New User
                    </Button>,
                ],
            }}
        >
            <UsersTable dataSource={users || []} loading={isLoading} />

            <UserModalForm open={isModalOpen} onCancel={closeModal} />
        </PageContainer>
    );
}
