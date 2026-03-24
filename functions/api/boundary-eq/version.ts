export async function onRequest(context) {
  // Version data - you can update this when releasing new versions
  const versionData = {
    version: "1.1.0",
    download_url: "https://hedioaudio.com/downloads/boundary-eq",
    "release_notes": "BoundaryEQ v1.1.0 - New Features\n- Improved licensing system\n- Enhanced UI performance\n- Bug fixes and stability improvements"
  };

  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Return version data
  return new Response(JSON.stringify(versionData), {
    headers,
    status: 200
  });
}
