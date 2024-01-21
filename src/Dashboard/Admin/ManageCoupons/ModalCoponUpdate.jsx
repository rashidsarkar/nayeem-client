/* eslint-disable react/prop-types */
import { useEffect } from "react";

import useUpdateCoupon from "../../../API/AdminAPI/useUpdateCoupon";

function ModalCoponUpdate({ midalID, updateData }) {
  const { couponCode, description, discountPercentage, _id } = updateData || {};
  const { updateCoupon } = useUpdateCoupon();
  useEffect(() => {
    const dialog = document.getElementById(midalID);
    const closeButton = dialog.querySelector(".close-button");

    const handleClickOutside = (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };

    const handleCloseButtonClick = () => {
      dialog.close();
    };

    dialog.addEventListener("click", handleClickOutside);
    closeButton.addEventListener("click", handleCloseButtonClick);

    return () => {
      dialog.removeEventListener("click", handleClickOutside);
      closeButton.removeEventListener("click", handleCloseButtonClick);
    };
  }, [midalID]);
  const handleSubCopon = async (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value;
    const discountPercentage = e.target.elements.discountPercentage.value;
    const couponDescription = e.target.elements.couponDescription.value;
    const cuponData = {
      couponCode: couponCode,
      discountPercentage: discountPercentage,
      description: couponDescription,
    };
    const updatedID = _id;
    const updatedData = {
      cuponData,
      updatedID,
    };

    await updateCoupon(updatedData);
    // Close the modal after handling the form submission form
    e.target.reset();
    const dialog = document.getElementById(midalID);
    dialog.close();
  };

  return (
    <>
      <dialog id={midalID} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Coupon Information</h3>
          <div className="py-4">
            <form onSubmit={handleSubCopon} method="dialog">
              <div className="mb-4">
                <label
                  htmlFor="couponCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  defaultValue={couponCode}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  defaultValue={discountPercentage}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="couponDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Description
                </label>
                <textarea
                  id="couponDescription"
                  name="couponDescription"
                  defaultValue={description}
                  rows="3"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn close-button">Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalCoponUpdate;
