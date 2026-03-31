'use client';

import { App, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

export default function AntdProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConfigProvider
            locale={enUS}
            theme={{
                token: {
                    colorPrimary: '#1677ff',
                    borderRadius: 6,
                },
                components: {
                    Layout: {
                        bodyBg: '#f5f5f5',
                    },
                },
            }}
        >
            <App style={{ height: '100%' }}>{children}</App>
        </ConfigProvider>
    );
}
