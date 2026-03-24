export async function onRequest(context) {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hedioaudio-api'
  };

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  return new Response(JSON.stringify(healthData), {
    headers,
    status: 200
  });
}
