import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/query-provider";
import StyleRegistry from "@/components/providers/style-registry";
import AntdProvider from "@/components/providers/antd-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next.js Blog with Ant Design",
  description: "A modern blog built with Next.js and Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <StyleRegistry>
          <AntdProvider>
            <NuqsAdapter>
              <QueryProvider>
                <NextTopLoader showSpinner={false} color="#1677ff" />
                {children}
              </QueryProvider>
            </NuqsAdapter>
          </AntdProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}

