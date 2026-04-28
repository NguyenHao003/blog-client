'use client';

import { Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const items = [
    {
        title: 'Travel mood',
        description:
            'Phong cách trình bày thiên về blog du lịch, nhiều ảnh lớn và cảm giác biên tập như tạp chí cá nhân.',
    },
    {
        title: 'Editorial grid',
        description:
            'Bố cục ưu tiên bài nổi bật ở trên, danh sách bài mới dạng lưới bên dưới để dễ duyệt nội dung.',
    },
    {
        title: 'Personal brand',
        description:
            'Footer và header giữ cảm giác của một blog cá nhân thay vì landing page công nghệ chung chung.',
    },
];

export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 rounded-[8px] bg-[#f5f7fa] px-6 py-8">
                <Title level={1} style={{ margin: 0 }}>
                    Giới thiệu
                </Title>
                <Paragraph style={{ color: '#64748b', marginTop: 12, marginBottom: 0 }}>
                    Giao diện client được làm theo hướng magazine/travel blog, tập
                    trung vào ảnh lớn, nhịp đọc thoáng và cảm giác cá nhân hơn.
                </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
                {items.map((item) => (
                    <Col xs={24} md={8} key={item.title}>
                        <Card bordered={false} style={{ borderRadius: 16 }}>
                            <Title level={4}>{item.title}</Title>
                            <Paragraph style={{ color: '#475569', marginBottom: 0 }}>
                                {item.description}
                            </Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
