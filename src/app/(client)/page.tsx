'use client';

import { Button, Card, Col, Row, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mx-auto mb-16 max-w-4xl text-center">
                <Title>Welcome to My Modern Blog</Title>
                <Paragraph className="text-lg text-gray-500">
                    Built with Next.js 14 and Ant Design for a premium look and
                    feel.
                </Paragraph>
                <Button type="primary" size="large">
                    Explore Posts
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                {[1, 2, 3].map((i) => (
                    <Col xs={24} md={8} key={i}>
                        <Card hoverable>
                            <Card.Meta
                                title={`Blog Post Title ${i}`}
                                description="This is a short summary of the blog post content..."
                            />
                            <div className="mt-4">
                                <Link href={`/post/${i}`}>Read More</Link>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
