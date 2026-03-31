"use client";

import React from "react";
import { PageContainer, ProForm, ProFormText, ProFormTextArea, ProFormSwitch } from "@ant-design/pro-components";
import { Card, message } from "antd";

export default function SettingsPage() {
  return (
    <PageContainer
      header={{
        title: "Settings",
        subTitle: "Global site configuration",
      }}
    >
      <Card style={{ maxWidth: 800, margin: "auto" }}>
        <ProForm
          onFinish={async (values) => {
            console.log(values);
            message.success("Settings saved successfully!");
          }}
        >
          <ProFormText
            name="siteName"
            label="Site Name"
            placeholder="Enter site name"
            initialValue="My Awesome Blog"
          />
          <ProFormTextArea
            name="description"
            label="Meta Description"
            placeholder="Enter SEO description"
          />
          <ProFormSwitch
            name="maintenanceMode"
            label="Maintenance Mode"
          />
          <ProFormText
            name="adminEmail"
            label="Admin Email"
            initialValue="admin@example.com"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
}
