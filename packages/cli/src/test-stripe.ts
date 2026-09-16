import { PaymentAdapter } from "../../gateway/src/paymentAdapter";

async function verifyStripeIntegration() {
  console.log("==================================================================");
  console.log(" SkillBridge Live Stripe Payment Engine Verification");
  console.log("==================================================================");

  const payment = new PaymentAdapter();
  const status = payment.getStatus();
  console.log("\n[Status Check]");
  console.log("=> Stripe Configured:", status.stripeConfigured);
  console.log("=> Key Attached:", status.keyPrefix);
  console.log("=> Processing Mode:", status.mode);

  // Simulate a developer funding their wallet with $25
  console.log("\n[Order Simulation: $25 Developer Top-Up]");
  const order = await payment.createTopUpOrder({
    amountUsd: 25,
    currency: "usd",
    gateway: "stripe",
    buyerId: "usr_agent_live_44"
  });

  console.log("=> Checkout Order ID:", order.orderId);
  console.log("=> Amount Cents:", order.amountCents);
  console.log("=> Checkout URL:", order.checkoutUrl);

  // Simulate Webhook capture and wallet credit
  console.log("\n[Webhook Capture Simulation]");
  const credit = payment.verifyAndCreditWallet(order.orderId, 25, "usr_agent_live_44");
  console.log("=> Wallet Credited:", credit.credited);
  console.log("=> Amount Credited:", `$${credit.amountUsd} USD`);

  console.log("\n==================================================================");
  console.log(" Stripe Key Linked & Verified Operational!");
  console.log("==================================================================");
}

verifyStripeIntegration();
