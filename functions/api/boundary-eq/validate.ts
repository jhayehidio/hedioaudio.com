export async function onRequest(context) {
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    if (context.request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            headers,
            status: 405
        });
    }

    try {
        const { license_key, instance_id } = await context.request.json();

        if (!license_key) {
            return new Response(JSON.stringify({ error: 'License key is required' }), {
                headers,
                status: 400
            });
        }

        // Proxy request to Lemon Squeezy
        const body: Record<string, string> = {
            license_key,
        };
        if (instance_id) body.instance_id = instance_id;

        const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(body).toString(),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers,
            status: response.status
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), {
            headers,
            status: 500
        });
    }
}
