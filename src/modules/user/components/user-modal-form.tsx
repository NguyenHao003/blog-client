'use client';

import useModalStore from '@/common/hooks/use-modal';
import { Form, Input, Modal, Select, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { UserModalType } from '../enums';
import { useCreateUser } from '../hooks/use-create-user';
import { useUpdateUser } from '../hooks/use-update-user';
import { useUser } from '../hooks/use-user';

interface UserModalFormProps {
    open: boolean;
    onCancel: () => void;
}

const UserModalForm: React.FC<UserModalFormProps> = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const { createUser, isPending: isCreating } = useCreateUser();
    const { updateUser, isPending: isUpdating } = useUpdateUser();

    const typeModal = useModalStore((s) => s.typeModal);
    const dataEdit = useModalStore((s) => s.dataEdit);

    const isEdit = typeModal === UserModalType.USER_UPDATE;
    const { user, isLoading: isFetching } = useUser(dataEdit?.id);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const successCallback = {
                onSuccess: () => {
                    form.resetFields();
                    onCancel();
                },
            };

            return dataEdit?.id
                ? updateUser(dataEdit.id, values, successCallback)
                : createUser(values, successCallback);
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

    useEffect(() => {
        if (open) {
            if (isEdit && user) {
                form.setFieldsValue(user);
            }
        } else {
            form.resetFields();
        }
    }, [open, isEdit, user, form]);

    return (
        <Modal
            title={isEdit ? 'Update User' : 'Create New User'}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={isCreating || isUpdating}
            okText={isEdit ? 'Update' : 'Create'}
            cancelText="Cancel"
            destroyOnClose
        >
            {isFetching ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="user_form"
                    initialValues={{ role: 'AUTHOR' }}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the username!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not a valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input the email!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    {!isEdit && (
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the password!',
                                },
                                {
                                    min: 6,
                                    message:
                                        'Password must be at least 6 characters!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a role!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a role">
                            <Select.Option value="ADMIN">
                                Administrator
                            </Select.Option>
                            <Select.Option value="AUTHOR">Author</Select.Option>
                            <Select.Option value="VISITOR">
                                Visitor
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default UserModalForm;
