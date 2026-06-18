"use client";

import { CharacterAPI } from "@/types";
import { Card } from "antd";

interface CharacterCardProps extends Omit<CharacterAPI, "id"> {
  name: string;
  bio: string;
  image: string;
}

export const CharacterCard = ({ name, bio, image }: CharacterCardProps) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          draggable={false}
          alt={name}
          src={image}
          referrerPolicy="no-referrer"
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
          }}
        />
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "#1f1f1f",
            fontFamily: "sans-serif",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 400,
            color: "#8c8c8c",
            fontFamily: "sans-serif",
            lineHeight: "1.4",
          }}
        >
          {bio}
        </p>
      </div>
    </Card>
  );
};
