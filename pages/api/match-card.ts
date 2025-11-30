
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

function esc(t) {
  if (!t) return "";
  return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

async function fetchImageAsBase64(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "image/png";
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    return `data:${contentType};base64,${base64}`;
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  const {
    title = "Match",
    teamA = "Team A",
    teamB = "Team B",
    teamAImg = "",
    teamBImg = "",
    eventLogo = "",
    time = "00:00",
    isLive = "false"
  } = req.query;

  const live = isLive === "true";
  const statusText = live ? "LIVE" : "UPCOMING";
  const statusColor = live ? "#EF4444" : "#6B7280";

  // Fetch images in parallel and convert to base64
  const [teamAImgData, teamBImgData, eventLogoData] = await Promise.all([
    fetchImageAsBase64(teamAImg as string),
    fetchImageAsBase64(teamBImg as string),
    fetchImageAsBase64(eventLogo as string),
  ]);

  const svg = `
<svg width="900" height="400" viewBox="0 0 900 400"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="900" height="400" rx="32" fill="#111827"/>
  <text x="40" y="60" fill="#E5E7EB" font-size="28" font-family="Arial">${esc(title)}</text>
  <text x="860" y="60" text-anchor="end" fill="#9CA3AF" font-size="22" font-family="Arial">${esc(time)}</text>
  <rect x="40" y="80" width="130" height="40" rx="16" fill="${statusColor}" opacity="0.9"/>
  <text x="105" y="107" text-anchor="middle" fill="#FFF" font-size="20" font-family="Arial">${statusText}</text>

  <!-- Event Logo (center top) -->
  ${eventLogoData
    ? `
  <g transform="translate(450, 95)">
    <circle cx="0" cy="0" r="40" fill="#0f172a"/>
    <image href="${eventLogoData}"
           x="-40" y="-40" width="80" height="80"
           preserveAspectRatio="xMidYMid slice"
           clip-path="url(#teamCircle)" />
  </g>
    `
    : ""}

  ${teamAImgData ? `<image href="${teamAImgData}" x="160" y="130" width="120" height="120" />`
              : `<circle cx="220" cy="190" r="60" fill="#333"/>`}

  ${teamBImgData ? `<image href="${teamBImgData}" x="620" y="130" width="120" height="120" />`
              : `<circle cx="680" cy="190" r="60" fill="#333"/>`}

  <text x="450" y="205" text-anchor="middle" fill="#FACC15" font-size="50" font-family="Arial">VS</text>

  <text x="220" y="300" text-anchor="middle" fill="#FFF" font-size="26" font-family="Arial">${esc(teamA)}</text>
  <text x="680" y="300" text-anchor="middle" fill="#FFF" font-size="26" font-family="Arial">${esc(teamB)}</text>
</svg>
  `.trim();

  // Convert SVG to PNG using sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.status(200).send(pngBuffer);
}
