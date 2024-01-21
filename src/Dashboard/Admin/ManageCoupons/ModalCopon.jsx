import { useEffect } from "react";
import useManageCouponsAPI from "../../../API/AdminAPI/useManageCouponsAPI";

function ModalCopon({ id }) {
  const { makeCoupon } = useManageCouponsAPI();
  useEffect(() => {
    const dialog = document.getElementById(id);
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
  }, [id]);
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
    await makeCoupon(cuponData);
    // Close the modal after handling the form submission form
    e.target.reset();
    const dialog = document.getElementById(id);
    dialog.close();
  };

  return (
    <>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
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

export default ModalCopon;
