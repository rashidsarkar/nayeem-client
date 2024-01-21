import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useGetCoupon from "../../../../API/Home/useGetCoupon";
import CustomLoading from "../../../../Components/CustomLoading";
import ErrorMessage from "../../../../Components/ErrorMessage/ErrorMessage";
import { loadStripe } from "@stripe/stripe-js";
import PaymentHistory from "../../PaymentHistory/PaymentHistory";
import PaymentFrom from "./PaymentFrom";
import PaymentWithStripe from "./PaymentWithStripe";
import Swal from "sweetalert2";

const stripePromise = loadStripe("");

const Checkout = () => {
  const location = useLocation();
  const paymentData = location.state?.paymentDatas;
  const { blockName, email, floor, image, rent, selectedMonth } =
    paymentData || {};
  const { error, getCoupon, isError, isLoading } = useGetCoupon();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const calculateDiscount = (percentage, amount) => {
    return (percentage / 100) * amount;
  };

  const calculateFullPrice = () => {
    const fullPrice = rent;
    const discountAmount = calculateDiscount(discount, fullPrice);
    const discountedPrice = fullPrice - discountAmount;

    return {
      fullPrice,
      discountAmount,
      discountedPrice,
    };
  };

  const handleApplyCoupon = () => {
    const coupon = getCoupon.find((coupon) => coupon.couponCode === couponCode);

    if (coupon) {
      setDiscount(coupon.discountPercentage);
    } else {
      // Handle case when coupon code is not valid
      // You can show an error message to the user
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Your Coupon Was Not Valid",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;

  const { fullPrice, discountAmount, discountedPrice } = calculateFullPrice();

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 py-5">
      <div className="px-5">
        <div className="mb-2"></div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Checkout
          </h1>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-7/12 lg:pr-10">
              <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                <div className="w-full flex items-center">
                  <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                    <img src={image} alt="" />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-semibold uppercase text-gray-600">
                      {blockName}
                    </h6>
                    <p className="text-gray-400">x 1</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600 text-xl">
                      ${rent}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="-mx-2 flex items-end justify-end">
                  <div className="flex-grow px-2 lg:max-w-xs">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Coupon code
                    </label>
                    <div>
                      <input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="XXXXXX"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="px-2">
                    <button
                      onClick={handleApplyCoupon}
                      className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div className="w-full flex mb-3 items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Subtotal</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">${fullPrice}</span>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Discount</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">${discountAmount}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Total</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">${discountedPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <PaymentFrom email={email} finalPrice={discountedPrice} /> */}
            <PaymentWithStripe
              cartInfo={paymentData}
              finalPrice={discountedPrice}
            />
          </div>
        </div>
      </div>
      <div className="p-5"></div>
    </div>
  );
};

export default Checkout;
