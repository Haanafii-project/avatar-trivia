import type { Metadata } from "next";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js dengan Ant Design",
  description: "Setup Antd di Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <AntdRegistry>
          <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <Header />
            <main style={{ padding: "20px 0" }}>{children}</main>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
