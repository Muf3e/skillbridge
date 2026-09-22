module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';
  const isLive = !!stripeSecretKey && (stripeSecretKey.startsWith('sk_') || stripeSecretKey.startsWith('rk_'));

  return res.status(200).json({
    platform: 'SkillBridge Vercel Serverless Gateway',
    timestamp: Date.now(),
    billing: {
      stripeConfigured: !!stripeSecretKey,
      publishableKeyConfigured: !!publishableKey,
      keyPrefix: stripeSecretKey ? stripeSecretKey.substring(0, 7) + '...' : 'NONE',
      mode: isLive ? 'LIVE_ENABLED' : 'AWAITING_SECRET_KEY'
    },
    tiers: [
      { amountUsd: 25, label: '$25 Developer Tier' },
      { amountUsd: 50, label: '$50 Standard Escrow' },
      { amountUsd: 100, label: '$100 Team Pool' },
      { amountUsd: 250, label: '$250 Production Sovereign' }
    ]
  });
};
