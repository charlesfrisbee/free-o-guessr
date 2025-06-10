# Free-O-Guessr

A Next.js-based GeoGuessr-style game deployed on Cloudflare Workers with D1 database.

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (recommended) or npm
- [Cloudflare account](https://cloudflare.com) (for production deployment)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed globally

## Development Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd free-o-guessr
   pnpm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory:

   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   **Getting a Google Maps API Key:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Maps JavaScript API and Street View Static API
   - Create credentials (API Key)
   - Restrict the API key to your domain(s) for security

3. **Set up database:**

   ```bash
   # Create D1 database
   wrangler d1 create free-o-guessr
   ```

   Update `wrangler.jsonc` with your new database ID (replace the existing `database_id`).

   ```bash
   # Generate migration files (if needed)
   pnpm migration:generate

   # Apply migrations to database
   pnpm migration:apply
   ```

4. **Start development server:**

   ```bash
   pnpm dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the test suites:

```bash
# Unit tests
pnpm test:unit

# D1 database tests
pnpm test:d1

# UI component tests
pnpm test:ui
```

## Production Deployment

### Cloudflare Setup

1. **Apply database migrations to production:**

   ```bash
   # Apply migrations to the remote database
   pnpm migration:apply-remote
   ```

2. **Deploy to Cloudflare:**

   ```bash
   # Build and deploy
   pnpm deploy

   # Or preview before deploying
   pnpm preview
   ```

### Environment Configuration

The application uses Cloudflare Workers with:

- **D1 Database**: SQLite-compatible database for storing panorama data
- **OpenNext**: Adapter for running Next.js on Cloudflare Workers
- **Wrangler**: CLI tool for managing Cloudflare Workers

### Database Schema

The application uses Drizzle ORM with the following key tables:

- Panorama locations with Google Street View integration
- Game results and scoring

## Development Commands

| Command                       | Description                             |
| ----------------------------- | --------------------------------------- |
| `pnpm dev`                    | Start development server with Turbopack |
| `pnpm build`                  | Build application for production        |
| `pnpm start`                  | Start production server locally         |
| `pnpm lint`                   | Run ESLint                              |
| `pnpm deploy`                 | Build and deploy to Cloudflare          |
| `pnpm preview`                | Build and preview on Cloudflare         |
| `pnpm cf-typegen`             | Generate Cloudflare types               |
| `pnpm migration:generate`     | Generate new database migrations        |
| `pnpm migration:apply`        | Apply migrations to local database      |
| `pnpm migration:apply-remote` | Apply migrations to remote database     |

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API via @vis.gl/react-google-maps
- **State Management**: Zustand
- **Testing**: Vitest + Playwright

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/actions/` - Server actions
- `src/db/` - Database schema and configuration
- `src/lib/` - Utility functions
- `drizzle/migrations/` - Database migration files
- `tests/` - Test files (unit, integration, e2e)
