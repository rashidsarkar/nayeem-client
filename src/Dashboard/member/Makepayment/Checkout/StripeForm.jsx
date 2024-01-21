/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosInstanceSecure from "../../../../AxiosAPI/useAxiosInstance";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import usePostPaymentData from "../../../../API/MemberAPI/usePostPaymentData";

function StripeForm({ finalPrice, cartInfo }) {
  const { postPayment } = usePostPaymentData();
  const { user } = useAuth();

  const { displayName, photoURL } = user;
  // console.log(displayName, photoURL);
  // console.log(user);
  // console.log(finalPrice, cartInfo);
  const {
    email,
    floor,
    blockName,
    image,
    apartmentNo,
    rent,
    selectedMonth,
    agreementAcceptDate,
    agreementRequestDate,
  } = cartInfo;

  const billInfo = {
    userName: displayName,
    userEmail: email,
    userImage: photoURL,
    agreementAcceptDate: agreementAcceptDate,
    agreementRequestDate: agreementRequestDate,
    floor: floor,
    blockName: blockName,
    apartmentNo: apartmentNo,
    payForMunth: selectedMonth,
    billPrice: finalPrice,
  };
  // console.log(billInfo);
  const [error, setError] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosInstanceSecure();
  useEffect(() => {
    if (finalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: finalPrice })
        .then((res) => {
          // console.log("api response", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, finalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log(`payment method`, paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: billInfo.userEmail || "anonymous",
            name: billInfo.userName || "anonymous",
          },
        },
        // payment_method: paymentMethod.id,
        // billing_details: { email: "kaka@" },
      });
    if (confirmError) {
      console.log("conferm error", confirmError);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transactionID", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        // now save payment db
        const payment = {
          userName: displayName,
          userEmail: email,
          userImage: photoURL,
          agreementAcceptDate: agreementAcceptDate,
          agreementRequestDate: agreementRequestDate,
          floor: floor,
          blockName: blockName,
          apartmentNo: apartmentNo,
          payForMunth: selectedMonth,
          billPrice: finalPrice,
          transactionId: paymentIntent.id,
        };
        await postPayment(payment);
        // const res = await axiosSecure.post("/payments", payment);
        // if (res.data.insertedId) {
        //   Swal.fire({
        //     title: "Payment Success",
        //     text: "Thank you for your payment. Your transaction has been successfully processed.",
        //     icon: "success",
        //   });
        // }
        // console.log("payment saved", res);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="my-4 btn btn-sm btn-primary"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            Your Transaction id : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
}

export default StripeForm;
