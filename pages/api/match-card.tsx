
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

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

export default async function handler(req: Request) {
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

  // Fetch images in parallel and convert to base64
  const [teamAImgData, teamBImgData, eventLogoData] = await Promise.all([
    fetchImageAsBase64(teamAImg),
    fetchImageAsBase64(teamBImg),
    fetchImageAsBase64(eventLogo),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "900px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111827",
          borderRadius: "32px",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ color: "#E5E7EB", fontSize: "28px" }}>{title}</span>
          <span style={{ color: "#9CA3AF", fontSize: "22px" }}>{time}</span>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: statusColor,
            borderRadius: "16px",
            padding: "8px 24px",
            marginTop: "10px",
            width: "fit-content",
          }}
        >
          <span style={{ color: "#FFF", fontSize: "20px" }}>{statusText}</span>
        </div>

        {/* Event Logo (center top) */}
        {eventLogoData && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              left: "410px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={eventLogoData} width="80" height="80" style={{ objectFit: "cover" }} />
          </div>
        )}

        {/* Teams Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            marginTop: "20px",
          }}
        >
          {/* Team A */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "200px" }}>
            {teamAImgData ? (
              <img src={teamAImgData} width="120" height="120" style={{ borderRadius: "50%" }} />
            ) : (
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#333", display: "flex" }} />
            )}
            <span style={{ color: "#FFF", fontSize: "26px", marginTop: "20px", textAlign: "center" }}>{teamA}</span>
          </div>

          {/* VS */}
          <span style={{ color: "#FACC15", fontSize: "50px" }}>VS</span>

          {/* Team B */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "200px" }}>
            {teamBImgData ? (
              <img src={teamBImgData} width="120" height="120" style={{ borderRadius: "50%" }} />
            ) : (
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#333", display: "flex" }} />
            )}
            <span style={{ color: "#FFF", fontSize: "26px", marginTop: "20px", textAlign: "center" }}>{teamB}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 900,
      height: 400,
    }
  );
}
