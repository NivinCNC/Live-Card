
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

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

  return new ImageResponse(
    (
      <div
        style={{
          width: "480px",
          height: "280px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111827",
          borderRadius: "20px",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          <span style={{ color: "#E5E7EB", fontSize: "18px" }}>{title}</span>
          <span style={{ color: "#9CA3AF", fontSize: "14px" }}>{time}</span>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: statusColor,
            borderRadius: "10px",
            padding: "4px 12px",
            marginTop: "6px",
          }}
        >
          <span style={{ color: "#FFF", fontSize: "13px" }}>{statusText}</span>
        </div>

        {/* Event Logo (center top) */}
        {eventLogo && (
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "205px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={eventLogo} width={50} height={50} style={{ objectFit: "cover" }} />
          </div>
        )}

        {/* Teams Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            marginTop: "12px",
            width: "100%",
          }}
        >
          {/* Team A */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "120px" }}>
            {teamAImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={teamAImg} width={70} height={70} style={{ borderRadius: "50%" }} />
            ) : (
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#333", display: "flex" }} />
            )}
            <span style={{ color: "#FFF", fontSize: "16px", marginTop: "10px", textAlign: "center" }}>{teamA}</span>
          </div>

          {/* VS */}
          <span style={{ color: "#FACC15", fontSize: "32px" }}>VS</span>

          {/* Team B */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "120px" }}>
            {teamBImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={teamBImg} width={70} height={70} style={{ borderRadius: "50%" }} />
            ) : (
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#333", display: "flex" }} />
            )}
            <span style={{ color: "#FFF", fontSize: "16px", marginTop: "10px", textAlign: "center" }}>{teamB}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 480,
      height: 280,
    }
  );
}
