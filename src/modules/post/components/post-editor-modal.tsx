'use client';

import useModalStore from '@/common/hooks/use-modal';
import { ImageUpload } from '@/modules/upload/components/image-upload';
import { UPLOAD_FOLDER } from '@/modules/upload/enums';
import { useUpload } from '@/modules/upload/hooks/use-upload';
import { CloseOutlined, TagOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Skeleton,
    Space,
    Tag,
    Typography,
    message,
} from 'antd';
import React, { useEffect } from 'react';
import { PostModalType } from '../enums';
import { useCreatePost } from '../hooks/use-create-post';
import { usePost } from '../hooks/use-post';
import { useUpdatePost } from '../hooks/use-update-post';
import {
    CreatePostPayload,
    PostData,
    POST_STATUS_OPTIONS,
    PostStatus,
} from '../types/post-types';

interface PostEditorModalProps {
    open: boolean;
    onCancel: () => void;
    categories: Array<{ label: string; value: string }>;
    tags: Array<{ label: string; value: string }>;
}

interface PostFormValues {
    title: string;
    summary?: string;
    content: string;
    thumbnailUrl?: any;
    categoryId?: string;
    tagIds?: string[];
    status?: PostStatus;
}

const getStatusColor = (status?: PostStatus) => {
    if (status === PostStatus.PUBLISHED) return 'green';
    if (status === PostStatus.ARCHIVED) return 'default';
    return 'gold';
};

const buildPayload = async (
    values: PostFormValues,
    uploadFile: ReturnType<typeof useUpload>['mutateAsync'],
    isEdit: boolean
): Promise<CreatePostPayload> => {
    const payload: CreatePostPayload = {
        title: values.title.trim(),
        summary: values.summary?.trim() || undefined,
        content: values.content.trim(),
        categoryId: values.categoryId || undefined,
        tagIds: values.tagIds?.length ? values.tagIds : undefined,
        status: values.status,
    };

    if (Array.isArray(values.thumbnailUrl)) {
        if (values.thumbnailUrl.length > 0) {
            const file = values.thumbnailUrl[0]?.originFileObj;
            if (file) {
                const { publicUrl } = await uploadFile({
                    file,
                    folder: UPLOAD_FOLDER.AVATAR,
                });

                if (!publicUrl) {
                    throw new Error('Failed to upload thumbnail');
                }

                payload.thumbnailUrl = publicUrl;
            }
        } else if (isEdit) {
            payload.thumbnailUrl = '';
        }
    }

    if (typeof values.thumbnailUrl === 'string') {
        payload.thumbnailUrl = values.thumbnailUrl;
    }

    return payload;
};

const shellCardStyle = {
    borderRadius: 28,
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.07)',
} as const;

const PostEditorModal: React.FC<PostEditorModalProps> = ({
    open,
    onCancel,
    categories,
    tags,
}) => {
    const [form] = Form.useForm<PostFormValues>();
    const { createPost, isPending: isCreating } = useCreatePost();
    const { updatePost, isPending: isUpdating } = useUpdatePost();
    const { mutateAsync: uploadFile, isPending: isUploading } = useUpload();

    const typeModal = useModalStore((s) => s.typeModal);
    const dataEdit = useModalStore((s) => s.dataEdit as PostData | null);
    const isEdit = typeModal === PostModalType.POST_UPDATE;
    const currentStatus = Form.useWatch('status', form) || PostStatus.DRAFT;
    const currentTitle = Form.useWatch('title', form) || '';
    const currentSummary = Form.useWatch('summary', form) || '';
    const currentTagIds = Form.useWatch('tagIds', form) || [];

    const { post, isLoading: isFetching } = usePost(dataEdit?.id);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            return;
        }

        if (isEdit && post) {
            form.setFieldsValue({
                title: post.title,
                summary: post.summary || undefined,
                content: post.content,
                thumbnailUrl: post.thumbnailUrl || undefined,
                categoryId: post.categoryId || undefined,
                tagIds: post.tags?.map((tag) => String(tag.id)) || [],
                status: post.status,
            });
            return;
        }

        form.setFieldsValue({
            status: PostStatus.DRAFT,
            tagIds: [],
        });
    }, [form, isEdit, open, post]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = await buildPayload(values, uploadFile, isEdit);

            const successCallback = {
                onSuccess: () => {
                    form.resetFields();
                    onCancel();
                },
            };

            return dataEdit?.id
                ? updatePost(dataEdit.id, payload, successCallback)
                : createPost(payload, successCallback);
        } catch (error: any) {
            if (error?.message === 'Failed to upload thumbnail') {
                message.error(error.message);
                return;
            }

            console.error('Validate Failed:', error);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            title={null}
            closeIcon={null}
            destroyOnHidden
            width="100%"
            style={{
                top: 0,
                paddingBottom: 0,
                maxWidth: '100%',
                margin: 0,
            }}
            styles={{
                body: {
                    minHeight: '100vh',
                    padding: 0,
                    overflowX: 'hidden',
                },
                content: {
                    minHeight: '100vh',
                    padding: 0,
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: 'none',
                },
            }}
        >
            <div style={{ overflowX: 'hidden' }}>
                <div className="sticky top-0 z-20 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur">
                    <div
                        style={{
                            padding: '12px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space size={12} align="center" wrap>
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                {isEdit ? 'Edit Post' : 'Create New Post'}
                            </Typography.Title>
                            <Tag color={getStatusColor(currentStatus)}>
                                {currentStatus}
                            </Tag>
                        </Space>

                        <Space wrap size={12}>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={onCancel}
                                size="large"
                                style={{
                                    height: 44,
                                    borderRadius: 14,
                                    paddingInline: 18,
                                    fontWeight: 600,
                                    borderColor: '#cbd5e1',
                                    color: '#334155',
                                    background: '#ffffff',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleSubmit}
                                loading={
                                    isCreating || isUpdating || isUploading
                                }
                                style={{
                                    height: 44,
                                    borderRadius: 14,
                                    paddingInline: 22,
                                    fontWeight: 600,
                                    boxShadow:
                                        '0 12px 24px rgba(37, 99, 235, 0.22)',
                                }}
                            >
                                {isEdit ? 'Update Post' : 'Create Post'}
                            </Button>
                        </Space>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-[1480px] px-6 py-6 xl:px-8">
                    {isFetching ? (
                        <Card bordered={false} style={shellCardStyle}>
                            <Skeleton active paragraph={{ rows: 10 }} />
                        </Card>
                    ) : (
                        <Form<PostFormValues>
                            form={form}
                            layout="vertical"
                            disabled={
                                isFetching ||
                                isCreating ||
                                isUpdating ||
                                isUploading
                            }
                        >
                            <Row gutter={[24, 24]} align="top">
                                <Col xs={24} xl={16}>
                                    <Card
                                        bordered={false}
                                        style={shellCardStyle}
                                    >
                                        <Form.Item
                                            name="title"
                                            label="Title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter the post title',
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Enter post title"
                                                style={{ borderRadius: 14 }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="summary"
                                            label="Summary"
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                maxLength={300}
                                                showCount
                                                placeholder="Short summary for the post"
                                                style={{ borderRadius: 14 }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="content"
                                            label="Content"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter the post content',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                rows={20}
                                                placeholder="Write the post content here"
                                                style={{ borderRadius: 18 }}
                                            />
                                        </Form.Item>
                                    </Card>
                                </Col>

                                <Col xs={24} xl={8}>
                                    <div className="xl:sticky xl:top-[96px]">
                                        <Space
                                            direction="vertical"
                                            size={24}
                                            style={{ width: '100%' }}
                                        >
                                            <Card
                                                bordered={false}
                                                style={shellCardStyle}
                                            >
                                                <Typography.Title
                                                    level={5}
                                                    style={{ marginTop: 0 }}
                                                >
                                                    Publish
                                                </Typography.Title>

                                                <Form.Item
                                                    name="status"
                                                    label="Status"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please select a status',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        options={POST_STATUS_OPTIONS}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Form.Item>

                                                <div className="rounded-2xl bg-slate-50 p-4">
                                                    <Typography.Text strong>
                                                        Current state
                                                    </Typography.Text>
                                                    <div
                                                        style={{
                                                            marginTop: 10,
                                                        }}
                                                    >
                                                        <Tag
                                                            color={getStatusColor(
                                                                currentStatus
                                                            )}
                                                        >
                                                            {currentStatus}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </Card>

                                            <Card
                                                bordered={false}
                                                style={shellCardStyle}
                                            >
                                                <Typography.Title
                                                    level={5}
                                                    style={{ marginTop: 0 }}
                                                >
                                                    Preview
                                                </Typography.Title>

                                                <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-5">
                                                    <Typography.Text type="secondary">
                                                        Draft snippet
                                                    </Typography.Text>
                                                    <Typography.Title
                                                        level={5}
                                                        style={{
                                                            margin: '8px 0 6px',
                                                        }}
                                                    >
                                                        {currentTitle ||
                                                            'Untitled post'}
                                                    </Typography.Title>
                                                    <Typography.Paragraph
                                                        type="secondary"
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        ellipsis={{ rows: 4 }}
                                                    >
                                                        {currentSummary ||
                                                            'Add a short summary to improve the listing card and preview.'}
                                                    </Typography.Paragraph>
                                                </div>
                                            </Card>

                                            <Card
                                                bordered={false}
                                                style={shellCardStyle}
                                            >
                                                <Typography.Title
                                                    level={5}
                                                    style={{ marginTop: 0 }}
                                                >
                                                    Media & taxonomy
                                                </Typography.Title>

                                                <Form.Item
                                                    name="thumbnailUrl"
                                                    label="Thumbnail"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please upload a thumbnail',
                                                        },
                                                    ]}
                                                >
                                                    <ImageUpload />
                                                </Form.Item>

                                                <Form.Item
                                                    name="categoryId"
                                                    label="Category"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please select a category',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        allowClear
                                                        placeholder="Select category"
                                                        options={categories}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name="tagIds"
                                                    label="Tags"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please select at least one tag',
                                                        },
                                                        {
                                                            validator: async (
                                                                _,
                                                                value
                                                            ) => {
                                                                if (
                                                                    !Array.isArray(
                                                                        value
                                                                    ) ||
                                                                    value.length ===
                                                                        0
                                                                ) {
                                                                    throw new Error(
                                                                        'Please select at least one tag'
                                                                    );
                                                                }
                                                            },
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="Select tags"
                                                        options={tags}
                                                    />
                                                </Form.Item>

                                                <div className="rounded-2xl bg-slate-50 p-4">
                                                    <Space size={10} wrap>
                                                        <TagOutlined />
                                                        <Typography.Text type="secondary">
                                                            {
                                                                currentTagIds.length
                                                            }{' '}
                                                            tag(s) selected
                                                        </Typography.Text>
                                                    </Space>
                                                </div>
                                            </Card>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PostEditorModal;
