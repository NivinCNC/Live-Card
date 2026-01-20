# Live Match Card API

A dynamic image generation API that creates beautiful match cards for sports events. Perfect for sharing upcoming matches or live game status on social media, Discord, or any platform that supports image embeds.

**Deployed on Cloudflare Workers for global edge performance.**

![Example Match Card](https://live-card-cncverse.vercel.app/api/match-card?title=UFC%20Fight%20Night&teamA=Fighter%20A&teamB=Fighter%20B&time=10:00%20PM&isLive=true)

## 🚀 Features

- **Dynamic PNG Generation** - Creates match cards on-the-fly
- **Live/Upcoming Status** - Visual indicator for match status
- **Custom Team Images** - Support for team logos/fighter photos
- **Event Branding** - Optional event logo in the center
- **Fast Edge Runtime** - Powered by Cloudflare Workers globally

## 📖 API Usage

### Endpoint

```
GET /api/match-card
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | `"Match"` | Event or match title |
| `teamA` | string | `"Team A"` | Name of team/player A |
| `teamB` | string | `"Team B"` | Name of team/player B |
| `teamAImg` | string | `""` | URL of team A's logo/image |
| `teamBImg` | string | `""` | URL of team B's logo/image |
| `eventLogo` | string | `""` | URL of event logo (centered) |
| `time` | string | `"00:00"` | Match time |
| `isLive` | string | `"false"` | Set to `"true"` for live matches |

### Example URLs

**Basic Match Card:**
```
/api/match-card?title=Premier League&teamA=Arsenal&teamB=Chelsea&time=3:00 PM
```

**Live Match with Images:**
```
/api/match-card?title=UFC 300&teamA=Fighter A&teamB=Fighter B&teamAImg=https://example.com/a.png&teamBImg=https://example.com/b.png&isLive=true
```

**Full Example:**
```
/api/match-card?title=UFC&teamA=Merab Dvalishvili&teamB=Petr Yan&teamAImg=https://img.sofascore.com/api/v1/team/461557/image&teamBImg=https://img.sofascore.com/api/v1/team/461777/image&eventLogo=https://example.com/ufc-logo.png&time=06:30 AM&isLive=false
```

## 🎨 Output

- **Format:** PNG
- **Dimensions:** 480 x 280 pixels
- **Style:** Dark theme with rounded corners

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation) - Image generation
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime for global performance

## 📦 Local Development

```bash
# Install dependencies
npm install

# Run Next.js development server (recommended for local testing)
npm run dev
```

**Note:** `@vercel/og` uses WASM files that have limited support in local Wrangler dev. Use `npm run dev` for local development, which runs Next.js natively.

## 🚢 Deployment to Cloudflare Pages

Your API will work perfectly when deployed to Cloudflare Pages!

### Option 1: Via Wrangler CLI

```bash
# Install dependencies
npm install

# Login to Cloudflare
npx wrangler login

# Build and deploy
npm run deploy
```

### Option 2: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Connect your Git repository
3. Configure build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.open-next/worker`
4. Deploy!

Your API will be available at `https://your-project.pages.dev/api/match-card`

**Note:** The @vercel/og package works when deployed to Cloudflare Pages, but may have issues in local Wrangler dev. Use `npm run dev` for local testing.

## 📄 License

MIT License - feel free to use this for your own projects!

---

Made with ❤️ by [NivinCNC](https://github.com/NivinCNC)
