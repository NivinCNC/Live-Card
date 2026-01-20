export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const title = searchParams.get("title") || "Match";
  const teamA = searchParams.get("teamA") || "Team A";
  const teamB = searchParams.get("teamB") || "Team B";
  const teamAImg = searchParams.get("teamAImg") || "";
  const teamBImg = searchParams.get("teamBImg") || "";
  const eventLogo = searchParams.get("eventLogo") || "";
  const time = searchParams.get("time") || "00:00";
  const isLive = searchParams.get("isLive") === "true";

  const statusText = isLive ? "LIVE" : "UPCOMING";
  const statusColor = isLive ? "#EF4444" : "#6B7280";

  // Generate SVG directly
  const svg = `
    <svg width="480" height="280" viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="480" height="280" rx="20" fill="#111827"/>
      
      <!-- Header -->
      <text x="20" y="35" fill="#E5E7EB" font-size="18" font-family="Arial, sans-serif">${escapeXml(title)}</text>
      <text x="460" y="35" fill="#9CA3AF" font-size="14" font-family="Arial, sans-serif" text-anchor="end">${escapeXml(time)}</text>
      
      <!-- Status Badge -->
      <rect x="20" y="45" width="80" height="21" rx="10" fill="${statusColor}"/>
      <text x="60" y="60" fill="#FFF" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">${statusText}</text>
      
      ${eventLogo ? `
      <!-- Event Logo -->
      <circle cx="230" cy="55" r="25" fill="#0f172a"/>
      <image href="${escapeXml(eventLogo)}" x="205" y="30" width="50" height="50" clip-path="circle(25px at 25px 25px)"/>
      ` : ''}
      
      <!-- Team A -->
      <g transform="translate(60, 120)">
        ${teamAImg ? 
          `<image href="${escapeXml(teamAImg)}" x="-35" y="-35" width="70" height="70" clip-path="circle(35px at 35px 35px)"/>` :
          `<circle cx="0" cy="0" r="35" fill="#333"/>`
        }
        <text y="60" fill="#FFF" font-size="16" font-family="Arial, sans-serif" text-anchor="middle">${escapeXml(teamA)}</text>
      </g>
      
      <!-- VS -->
      <text x="240" y="160" fill="#FACC15" font-size="32" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle">VS</text>
      
      <!-- Team B -->
      <g transform="translate(420, 120)">
        ${teamBImg ? 
          `<image href="${escapeXml(teamBImg)}" x="-35" y="-35" width="70" height="70" clip-path="circle(35px at 35px 35px)"/>` :
          `<circle cx="0" cy="0" r="35" fill="#333"/>`
        }
        <text y="60" fill="#FFF" font-size="16" font-family="Arial, sans-serif" text-anchor="middle">${escapeXml(teamB)}</text>
      </g>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
