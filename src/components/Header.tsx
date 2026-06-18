"use client";

import React from "react";
import { Segmented, Badge } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      label: (
        <Link href="/" style={{ display: "block", width: "100%" }}>
          Home <Badge count={4} offset={[2, -2]} style={{ backgroundColor: '#0d2b03' }} />
        </Link>
      ),
      value: "/",
    },
    {
      label: <Link href="/characters" style={{ display: "block", width: "100%" }}>Characters</Link>,
      value: "/characters",
    },
    {
      label: <Link href="/quiz" style={{ display: "block", width: "100%" }}>Quiz</Link>,
      value: "/quiz",
    },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          background: "transparent",
        }}
      >
        <Segmented
          block
          options={menuItems}
          value={pathname}
          onChange={(value) => router.push(value)}
          size="large"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "100px",
            padding: "6px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.75)", 
            backdropFilter: "blur(20px)", 
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}
        />
      </header>
      <div style={{ height: "95px" }} />
    </>
  );
};