import crypto from "crypto";

export async function POST(req) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "subscription.activated") {
    console.log("✅ Subscription activated:", event.payload.subscription.entity.id);
    // TODO: Update user in DB to "pro"
  }

  if (event.event === "subscription.cancelled") {
    console.log("⚠️ Subscription cancelled:", event.payload.subscription.entity.id);
    // TODO: Update user in DB to "free"
  }

  return new Response("ok", { status: 200 });
}
