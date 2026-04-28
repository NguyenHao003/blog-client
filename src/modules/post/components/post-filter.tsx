'use client';

import { ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';
import { POST_STATUS_OPTIONS, PostStatus } from '../types/post-types';

export interface PostFilterProps {
    params: {
        keyword?: string | null;
        status?: PostStatus | null;
    };
    onFilter: (values: any) => void;
}

const PostFilter = ({ params, onFilter }: PostFilterProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            keyword: params.keyword,
            status: params.status,
        });
    }, [form, params]);

    return (
        <QueryFilter
            form={form}
            layout="vertical"
            onFinish={async (values) => onFilter(values)}
            onReset={() => onFilter({})}
            onValuesChange={(_, allValues) => onFilter(allValues)}
            style={{
                marginBottom: 16,
                background: '#fff',
            }}
        >
            <ProFormText
                name="keyword"
                label="Post Title"
                placeholder="Search by title or slug"
            />
            <ProFormSelect
                name="status"
                label="Status"
                allowClear
                options={POST_STATUS_OPTIONS}
                placeholder="Filter by status"
            />
        </QueryFilter>
    );
};

export default PostFilter;
