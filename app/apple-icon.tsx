import { ImageResponse } from "next/og";
import { markSvg, svgDataUri } from "@/lib/brand/svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = svgDataUri(markSvg({ radius: 0 }));

export default function AppleIcon() {
  return new ImageResponse(
    (
      <img src={mark} width={180} height={180} alt="" />
    ),
    size,
  );
}
