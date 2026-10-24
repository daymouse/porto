import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/dictionary";
import { owner, type Locale } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 } as const;

export async function renderOgImage(lang: Locale) {
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf8",
          color: "#16171a",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{owner.name}</div>
          <div style={{ fontSize: 28, color: "#62656d" }}>{owner.headline}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          <div>{dict.hero.title[0]}</div>
          <div style={{ color: "#62656d" }}>{dict.hero.title[1]}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#1f5c4d" }} />
      </div>
    ),
    { ...ogSize },
  );
}
