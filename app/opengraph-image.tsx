import { ImageResponse } from "next/og";
import { BRAND_COLORS, svgDataUri, wordmarkSvg } from "@/lib/brand/svg";
import { wordmarkBounds } from "@/lib/brand/glyphs";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = svgDataUri(wordmarkSvg({ color: BRAND_COLORS.paper, leaf: BRAND_COLORS.lichen }));
const bounds = wordmarkBounds();

export default function OpengraphImage() {
  const w = 940;
  const h = Math.round((w * bounds.height) / bounds.width);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: BRAND_COLORS.ink,
          color: BRAND_COLORS.paper,
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: "#8f8c80" }}>
          INDEPENDENT PRODUCT STUDIO
        </div>
        <img src={logo} width={w} height={h} alt="" />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.tagline}</span>
          <span style={{ color: "#8f8c80" }}>quenori.com</span>
        </div>
      </div>
    ),
    size,
  );
}
