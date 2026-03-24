# HedioAudio.com API Server

This document explains the API server setup for BoundaryEQ plugin update checking.

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the new dependencies:
- `cors` - CORS middleware for Express
- `@types/cors` - TypeScript types for cors

### 2. Run the Server Locally

```bash
npm run server
```

The server will start on `http://localhost:3001`

### 3. Build and Run for Production

```bash
npm run start
```

This will:
1. Build the React frontend (`npm run build`)
2. Start the Express server (`npm run server`)

## API Endpoints

### GET /api/boundary-eq/version

Returns the latest version information for BoundaryEQ plugin.

**Response:**
```json
{
  "version": "1.0.0",
  "download_url": "https://hedioaudio.com/downloads/boundary-eq",
  "release_notes": "Initial release of BoundaryEQ Pro\n- Professional EQ with ARA support\n- FabFilter-level UI smoothness\n- Advanced spectral analysis"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-24T02:24:00.000Z"
}
```

## Updating Version Information

To release a new version of BoundaryEQ:

1. Edit `version-data.json`
2. Update the version number, download URL, and release notes
3. Restart the server

**Example `version-data.json`:**
```json
{
  "boundary-eq": {
    "version": "1.1.0",
    "download_url": "https://hedioaudio.com/downloads/boundary-eq-1.1.0",
    "release_notes": "Version 1.1.0\n- Fixed sample rate conversion glitches\n- Improved UI performance\n- Added licensing system"
  }
}
```

## Deployment

### Option 1: Deploy to Vercel/Netlify

1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add serverless function for the API endpoint

### Option 2: Deploy to VPS (Recommended for API)

1. SSH into your server
2. Clone the repository
3. Run `npm install`
4. Run `npm run start`
5. Use PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.ts --name hedioaudio-api
   pm2 save
   pm2 startup
   ```

### Option 3: Use Nginx as Reverse Proxy

If you're already running a web server, configure Nginx to proxy API requests:

```nginx
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Testing the API

### Local Testing

```bash
# Start the server
npm run server

# Test the endpoint
curl http://localhost:3001/api/boundary-eq/version
```

### Production Testing

```bash
curl https://hedioaudio.com/api/boundary-eq/version
```

## Security Considerations

- The API is read-only (GET requests only)
- CORS is enabled for all origins (safe for public API)
- No authentication required (public version information)
- Rate limiting can be added if needed

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, change the PORT in `server.ts` or set an environment variable:

```bash
PORT=3002 npm run server
```

### CORS Errors

If you see CORS errors, ensure the `cors` middleware is properly configured in `server.ts`.

### Version Data Not Loading

Check that `version-data.json` exists and is valid JSON. The server will log errors if it fails to load.

## Future Enhancements

- Add rate limiting to prevent abuse
- Add analytics to track update checks
- Add webhook support for automatic updates
- Add version history endpoint
