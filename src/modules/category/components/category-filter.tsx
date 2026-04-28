'use client';

import { ProFormText, QueryFilter } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

export interface CategoryFilterProps {
    params: {
        keyword?: string | null;
    };
    onFilter: (values: any) => void;
}

const CategoryFilter = ({ params, onFilter }: CategoryFilterProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            keyword: params.keyword,
        });
    }, [params, form]);

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
                label="Category Name"
                placeholder="Search by category name"
            />
        </QueryFilter>
    );
};

export default CategoryFilter;
