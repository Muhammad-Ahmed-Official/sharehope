"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// console.log(process.env.NEXT_STRIPE_PUBLIC_KEY)
// if (process.env.NEXT_STRIPE_PUBLIC_KEY === undefined) {
//   throw new Error("NEXT_STRIPE_PUBLIC_KEY is not defined");
// }
// const stripePromise = loadStripe("pk_test_51QiEw1LgwSSYx4xAHVWHK9Aarq765JxeUHD1q04ytwg4nnGYZ6clIgLJN5DdU4rn8Pg4PaU1kUCXbWcXuMlkgNpU00dH5bw8GR");
const stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLIC_KEY!);
export default function StripeStep2({selectedDonation}:any) {
  return (
    <main>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Math.round(selectedDonation*100),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={selectedDonation} />
      </Elements>
    </main>
  );
}