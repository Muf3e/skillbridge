const https = require('https');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const amountUsd = Number(body.amountUsd) || 50;
    const amountCents = Math.round(amountUsd * 100);
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

    if (!stripeSecretKey || (!stripeSecretKey.startsWith('sk_') && !stripeSecretKey.startsWith('rk_'))) {
      return res.status(200).json({
        success: false,
        mode: 'AWAITING_SECRET_KEY',
        message: 'Stripe Secret Key (sk_live_...) is pending configuration. Set STRIPE_SECRET_KEY in environment or provide sk_live_... key to activate live payments.',
        orderId: `sb_sim_${Date.now()}`,
        amountUsd
      });
    }

    // Call Stripe Checkout Sessions API
    const postDataObj = {
      mode: 'payment',
      success_url: 'https://skillbridge-gateway.vercel.app/?payment=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://skillbridge-gateway.vercel.app/?payment=cancelled',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': amountCents.toString(),
      'line_items[0][price_data][product_data][name]': `SkillBridge MicroVM Enclave Escrow Pool ($${amountUsd.toFixed(2)} USD)`
    };

    if (body.customerEmail) {
      postDataObj.customer_email = body.customerEmail;
    }

    const postData = new URLSearchParams(postDataObj).toString();

    const session = await new Promise((resolve, reject) => {
      const stripeReq = https.request('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (stripeRes) => {
        let respBody = '';
        stripeRes.on('data', chunk => respBody += chunk);
        stripeRes.on('end', () => {
          try {
            const parsed = JSON.parse(respBody);
            if (stripeRes.statusCode >= 200 && stripeRes.statusCode < 300 && parsed.url) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.error?.message || `Stripe HTTP ${stripeRes.statusCode}`));
            }
          } catch (e) {
            reject(new Error(`JSON Parse Error: ${e.message}`));
          }
        });
      });

      stripeReq.on('error', reject);
      stripeReq.write(postData);
      stripeReq.end();
    });

    return res.status(200).json({
      success: true,
      orderId: session.id,
      checkoutUrl: session.url,
      amountUsd,
      gateway: 'stripe',
      mode: 'LIVE_CHECKOUT'
    });
  } catch (error) {
    console.error('[Vercel Billing Handler Error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error'
    });
  }
};
