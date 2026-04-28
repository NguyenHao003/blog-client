'use client';

import useModalStore from '@/common/hooks/use-modal';
import { Form, Input, Modal, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { TagModalType } from '../enums';
import { useCreateTag } from '../hooks/use-create-tag';
import { useTag } from '../hooks/use-tag';
import { useUpdateTag } from '../hooks/use-update-tag';

interface TagModalFormProps {
    open: boolean;
    onCancel: () => void;
}

const TagModalForm: React.FC<TagModalFormProps> = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const { createTag, isPending: isCreating } = useCreateTag();
    const { updateTag, isPending: isUpdating } = useUpdateTag();

    const typeModal = useModalStore((s) => s.typeModal);
    const dataEdit = useModalStore((s) => s.dataEdit);

    const isEdit = typeModal === TagModalType.TAG_UPDATE;
    const { tag, isLoading: isFetching } = useTag(dataEdit?.id);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                name: values.name.trim(),
            };

            const successCallback = {
                onSuccess: () => {
                    form.resetFields();
                    onCancel();
                },
            };

            return dataEdit?.id
                ? updateTag(dataEdit.id, payload, successCallback)
                : createTag(payload, successCallback);
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

    useEffect(() => {
        if (open) {
            if (isEdit && tag) {
                form.setFieldsValue({
                    name: tag.name,
                });
            }
        } else {
            form.resetFields();
        }
    }, [open, isEdit, tag, form]);

    return (
        <Modal
            title={isEdit ? 'Update Tag' : 'Create New Tag'}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={isCreating || isUpdating}
            okText={isEdit ? 'Update' : 'Create'}
            cancelText="Cancel"
            destroyOnHidden
            style={{
                top: 24,
            }}
        >
            {isFetching ? (
                <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="tag_form"
                    disabled={isFetching || isUpdating || isCreating}
                >
                    <Form.Item
                        name="name"
                        label="Tag Name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên thẻ (tag) không được để trống',
                            },
                            {
                                max: 100,
                                message:
                                    'Tên thẻ (tag) không được vượt quá 100 ký tự',
                            },
                            {
                                validator: async (_, value) => {
                                    if (
                                        typeof value === 'string' &&
                                        value.trim().length === 0
                                    ) {
                                        throw new Error(
                                            'Tên thẻ (tag) không được để trống'
                                        );
                                    }
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên thẻ" maxLength={100} />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default TagModalForm;
