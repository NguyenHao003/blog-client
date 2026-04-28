import {
    ProFormSelect,
    ProFormText,
    QueryFilter,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

export interface UserFilterProps {
    params: {
        keyword?: string | null;
        role?: string | null;
    };
    onFilter: (values: any) => void;
}

const UserFilter = ({ params, onFilter }: UserFilterProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: params.keyword,
            role: params.role,
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
                name="username"
                label="Name"
                placeholder="Search username or email"
            />
            <ProFormSelect
                name="role"
                label="Role"
                placeholder="Select role"
                valueEnum={{
                    ADMIN: 'Administrator',
                    AUTHOR: 'Author',
                    VISITOR: 'Visitor',
                }}
            />
        </QueryFilter>
    );
};

export default UserFilter;
