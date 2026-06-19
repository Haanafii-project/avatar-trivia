"use client";

import { Card, Typography, Button } from "antd";
import Link from "next/link";
import { SIZING, SPACING } from "@/lib/constants";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Card
      style={{
        maxWidth: SIZING.HOME_CARD_MAX_WIDTH,
        margin: `${SPACING.LARGE} auto`,
        textAlign: "center",
      }}
    >
      <Title level={2}>Selamat Datang di Avatar Trivia!</Title>
      <Paragraph>
        Uji pengetahuanmu seputar dunia pengendali elemen di sini.
      </Paragraph>
      <Link href="/quiz" passHref>
        <Button type="primary" size="large">
          Mulai Main Quiz
        </Button>
      </Link>
    </Card>
  );
}
