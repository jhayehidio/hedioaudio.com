# Cloudflare Pages Deployment Guide

This guide explains how to deploy the API endpoints to Cloudflare Pages using serverless functions.

## API Endpoints

The API endpoints are now implemented as Cloudflare Pages Functions:

- **`/api/boundary-eq/version`** - Returns BoundaryEQ version information
- **`/api/health`** - Health check endpoint

## File Structure

```
hedioaudio.com/
├── functions/
│   └── api/
│       ├── boundary-eq/
│       │   └── version.ts
│       └── health.ts
├── src/ (your React app)
├── package.json
└── ...
```

## How It Works

Cloudflare Pages automatically deploys any files in the `functions/` directory as serverless functions. The URL structure matches the file structure:

- `functions/api/boundary-eq/version.ts` → `https://hedioaudio.com/api/boundary-eq/version`
- `functions/api/health.ts` → `https://hedioaudio.com/api/health`

## Testing Locally

### Using Wrangler (Cloudflare CLI)

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Run locally:
   ```bash
   wrangler pages dev --compatibility-date=2023-12-01
   ```

4. Test endpoints:
   ```bash
   curl http://localhost:8787/api/boundary-eq/version
   curl http://localhost:8787/api/health
   ```

### Using Node.js (Alternative)

If you want to test without Wrangler, you can use the Express server:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the Express server:
   ```bash
   npm run server
   ```

3. Test endpoints:
   ```bash
   curl http://localhost:3001/api/boundary-eq/version
   curl http://localhost:3001/api/health
   ```

## Deployment to Cloudflare Pages

### Automatic Deployment

If you're using Git integration with Cloudflare Pages:

1. Commit your changes:
   ```bash
   git add functions/
   git commit -m "Add API endpoints for BoundaryEQ"
   git push
   ```

2. Cloudflare Pages will automatically deploy the functions

### Manual Deployment

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Click "Upload assets"
4. Upload your entire project folder including the `functions/` directory

## Updating Version Information

To release a new version of BoundaryEQ:

1. Edit `functions/api/boundary-eq/version.ts`
2. Update the version data:
   ```typescript
   const versionData = {
     version: "1.1.0",
     download_url: "https://hedioaudio.com/downloads/boundary-eq-1.1.0",
     release_notes: "Version 1.1.0\n- Bug fixes\n- New features"
   };
   ```
3. Commit and deploy the changes

## Testing the Live API

After deployment, test the live endpoints:

```bash
# Test version endpoint
curl https://hedioaudio.com/api/boundary-eq/version

# Test health endpoint
curl https://hedioaudio.com/api/health
```

Expected response for version endpoint:
```json
{
  "version": "1.0.0",
  "download_url": "https://hedioaudio.com/downloads/boundary-eq",
  "release_notes": "Initial release of BoundaryEQ Pro\n- Professional EQ with ARA support\n- FabFilter-level UI smoothness\n- Advanced spectral analysis"
}
```

## CORS Configuration

The functions include CORS headers to allow requests from any origin. This is safe since the API is read-only and only provides public version information.

## Troubleshooting

### 404 Errors

If you get 404 errors:
1. Ensure the `functions/` directory is at the root of your project
2. Check that the file structure matches the URL structure
3. Verify Cloudflare Pages is using the latest deployment

### Function Not Working

If the functions don't work:
1. Check the Cloudflare Pages Functions logs
2. Ensure the TypeScript files are valid
3. Verify the compatibility date is set correctly

### CORS Errors

If you see CORS errors:
1. Check that the CORS headers are included in the response
2. Verify the `Access-Control-Allow-Origin` header is set to `*`
3. Ensure preflight requests (`OPTIONS`) are handled

## Monitoring

Cloudflare Pages provides built-in analytics and logs for your functions. You can view:
- Request counts
- Error rates
- Response times
- Function logs

## Security Notes

- The API is read-only (GET requests only)
- No authentication required (public version information)
- Rate limiting can be added at the Cloudflare level if needed
- Consider adding Cloudflare Bot Fight Mode to prevent abuse

## Alternative: External API Service

If you prefer not to use Cloudflare Functions, you can:
1. Deploy the Express server to a VPS
2. Use a serverless platform like Vercel or Netlify Functions
3. Use a service like AWS Lambda or Google Cloud Functions

The plugin's UpdateChecker can be configured to use any of these endpoints by updating the `UPDATE_CHECK_URL` constant.
