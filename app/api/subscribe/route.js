import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12
    });

    return new Response(JSON.stringify({ subscriptionId: subscription.id }), { status: 200 });
  } catch (error) {
    console.error("Razorpay subscription error:", error);
    return new Response(JSON.stringify({ error: "Failed to create subscription" }), { status: 500 });
  }
}
