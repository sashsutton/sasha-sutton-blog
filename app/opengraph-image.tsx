import { ogCard, ogSize } from "./og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({ kicker: "Writing", title: site.name });
}
