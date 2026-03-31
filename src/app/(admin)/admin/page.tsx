"use client";

import React from "react";
import { PageContainer, StatisticCard } from "@ant-design/pro-components";
import { Row, Col, Card, Typography } from "antd";const { Statistic } = StatisticCard;

export default function AdminDashboard() {
  return (
    <PageContainer
      header={{
        title: "Admin Dashboard",
        ghost: true,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: "Total Revenue",
              value: 45231.89,
              precision: 2,
              prefix: "$",
              description: <Statistic title="Month over Month" value="20.1%" trend="up" />,
            }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: "Subscriptions",
              value: 2350,
              description: <Statistic title="Daily growth" value="180.1%" trend="up" />,
            }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: "Active Users",
              value: 1245,
              description: <Statistic title="User retention" value="12%" trend="down" />,
            }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: "New Posts",
              value: 42,
              description: <Statistic title="Last 7 days" value="5" />,
            }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="System Overview">
            <Typography.Paragraph>
              Welcome to your new blog admin panel. Here you can manage your content, users, and site settings.
              The interface is powered by Ant Design Pro for a seamless enterprise-grade experience.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
