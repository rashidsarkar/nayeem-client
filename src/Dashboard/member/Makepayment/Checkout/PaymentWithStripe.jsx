import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMANT_KEY);

function PaymentWithStripe({ finalPrice, cartInfo }) {
  return (
    <div className="px-3 md:w-5/12">
      <p>Please Pay </p>
      <div>
        <Elements stripe={stripePromise}>
          <StripeForm cartInfo={cartInfo} finalPrice={finalPrice} />
        </Elements>
      </div>
    </div>
  );
}

export default PaymentWithStripe;
