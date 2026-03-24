export async function onRequest(context) {
  // Version data - you can update this when releasing new versions
  const versionData = {
    version: "1.0.2",
    download_url: "https://app.lemonsqueezy.com/my-orders",
    "release_notes": "BoundaryEQ v1.0.2 - Bug Fixes\n- Fixed licensing activation issues\n- Improved update notification UI\n- Minor performance improvements"
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
