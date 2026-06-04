"use client";

import { Button, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const getButtonType = (path: string) => {
    return pathname === path ? "primary" : "text";
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
        borderBottom: "1px solid #f0f0f0",
        marginBottom: "30px",
        background: "#fff",
      }}
    >
      <Space size="middle">
        <Link href="/" passHref>
          <Button type={getButtonType("/")} size="large">
            Home
          </Button>
        </Link>
        <Link href="/characters" passHref>
          <Button type={getButtonType("/characters")} size="large">
            Characters
          </Button>
        </Link>
        <Link href="/quiz" passHref>
          <Button type={getButtonType("/quiz")} size="large">
            Quiz
          </Button>
        </Link>
      </Space>
    </header>
  );
};
