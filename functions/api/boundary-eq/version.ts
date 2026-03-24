export async function onRequest(context) {
  // Version data - you can update this when releasing new versions
  const versionData = {
    version: "1.0.0",
    download_url: "https://app.lemonsqueezy.com/my-orders",
    "release_notes": "Initial release of BoundaryEQ Pro\n- Professional EQ with ARA support\n- FabFilter-level UI smoothness\n- Advanced spectral analysis\n- Integrated licensing system"
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
