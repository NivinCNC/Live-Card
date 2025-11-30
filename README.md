# Live Match Card API

A dynamic image generation API that creates beautiful match cards for sports events. Perfect for sharing upcoming matches or live game status on social media, Discord, or any platform that supports image embeds.

![Example Match Card](https://live-card-cncverse.vercel.app/api/match-card?title=UFC%20Fight%20Night&teamA=Fighter%20A&teamB=Fighter%20B&time=10:00%20PM&isLive=true)

## 🚀 Features

- **Dynamic PNG Generation** - Creates match cards on-the-fly
- **Live/Upcoming Status** - Visual indicator for match status
- **Custom Team Images** - Support for team logos/fighter photos
- **Event Branding** - Optional event logo in the center
- **Fast Edge Runtime** - Powered by Vercel Edge Functions

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
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions) - Fast serverless execution

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/NivinCNC/Live-Card.git

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🚢 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NivinCNC/Live-Card)

## 📄 License

MIT License - feel free to use this for your own projects!

---

Made with ❤️ by [NivinCNC](https://github.com/NivinCNC)
