'use client';
import Script from "next/script";
import { useState } from "react";

export default function Home() {
  const createSubscription = async () => {
    const res = await fetch("/api/subscribe", { method: "POST" });
    const data = await res.json();
    if (data.subscriptionId) {
      startCheckout(data.subscriptionId);
    }
  };

  const startCheckout = (subId) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Resume Pro",
      description: "Monthly Subscription",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI Resume Generator MVP</h1>
      <p>Generate professional resumes with AI. 🚀</p>

      <button onClick={createSubscription} style={{marginTop:"20px", padding:"10px", backgroundColor:"#2563eb", color:"white", borderRadius:"8px"}}>
        Upgrade to Pro (Razorpay)
      </button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </main>
  );
}
