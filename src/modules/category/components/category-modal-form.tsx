'use client';

import useModalStore from '@/common/hooks/use-modal';
import { Form, Input, Modal, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { CategoryModalType } from '../enums';
import { useCategory } from '../hooks/use-category';
import { useCreateCategory } from '../hooks/use-create-category';
import { useUpdateCategory } from '../hooks/use-update-category';

interface CategoryModalFormProps {
    open: boolean;
    onCancel: () => void;
}

const CategoryModalForm: React.FC<CategoryModalFormProps> = ({
    open,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const { createCategory, isPending: isCreating } = useCreateCategory();
    const { updateCategory, isPending: isUpdating } = useUpdateCategory();

    const typeModal = useModalStore((s) => s.typeModal);
    const dataEdit = useModalStore((s) => s.dataEdit);

    const isEdit = typeModal === CategoryModalType.CATEGORY_UPDATE;
    const { category, isLoading: isFetching } = useCategory(dataEdit?.id);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                name: values.name.trim(),
                description: values.description?.trim() || undefined,
            };

            const successCallback = {
                onSuccess: () => {
                    form.resetFields();
                    onCancel();
                },
            };

            return dataEdit?.id
                ? updateCategory(dataEdit.id, payload, successCallback)
                : createCategory(payload, successCallback);
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

    useEffect(() => {
        if (open) {
            if (isEdit && category) {
                form.setFieldsValue({
                    name: category.name,
                    description: category.description,
                });
            }
        } else {
            form.resetFields();
        }
    }, [open, isEdit, category, form]);

    return (
        <Modal
            title={isEdit ? 'Update Category' : 'Create New Category'}
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
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="category_form"
                    disabled={isFetching || isUpdating || isCreating}
                >
                    <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên danh mục không được để trống',
                            },
                            {
                                validator: async (_, value) => {
                                    if (
                                        typeof value === 'string' &&
                                        value.trim().length === 0
                                    ) {
                                        throw new Error(
                                            'Tên danh mục không được để trống'
                                        );
                                    }
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên danh mục" maxLength={255} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                max: 1000,
                                message:
                                    'Mô tả danh mục không được vượt quá 1000 ký tự',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Nhập mô tả danh mục"
                            rows={4}
                            maxLength={1000}
                            showCount
                        />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default CategoryModalForm;
