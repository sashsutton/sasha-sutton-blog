import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Shared link-preview card (LinkedIn, X, iMessage…): a title over the portfolio's waveform. */
export const ogSize = { width: 1200, height: 630 };

function wavePath(width: number, height: number, phase: number) {
  const mid = height / 2;
  let d = "";
  for (let x = 0; x <= width; x += 6) {
    const u = x / width;
    const y =
      Math.sin(u * 13 + phase) * 0.55 + Math.sin(u * 29 + phase * 2) * 0.3 + Math.sin(u * 71) * 0.15;
    const swell = 0.2 + 0.6 * Math.exp(-(((u - 0.62) / 0.16) ** 2));
    d += `${x === 0 ? "M" : "L"}${x} ${(mid + y * swell * Math.sin(Math.PI * u) * mid).toFixed(1)} `;
  }
  return d;
}

export function ogCard({ kicker, title }: { kicker: string; title: string }) {
  const fontSize = title.length > 60 ? 64 : title.length > 30 ? 84 : 120;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0e8",
          color: "#161514",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#64615a" }}>{kicker.toUpperCase()}</div>
        <div style={{ display: "flex", fontSize, lineHeight: 1, letterSpacing: -2, fontFamily: "serif" }}>{title}</div>
        <svg width="1056" height="110" viewBox="0 0 1056 110">
          <path d={wavePath(1056, 110, 0)} fill="none" stroke="#161514" strokeWidth="3" />
          <path d={wavePath(1056, 110, 1.9)} fill="none" stroke="#2a55ff" strokeWidth="3" />
        </svg>
      </div>
    ),
    ogSize,
  );
}

export const siteKicker = `${site.name} · Writing`;
