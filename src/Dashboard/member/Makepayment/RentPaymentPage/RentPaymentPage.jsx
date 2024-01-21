import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMemberRentAPI from "../../../../API/MemberAPI/useMemberRentAPI";
import CustomLoading from "../../../../Components/CustomLoading";
import ErrorMessage from "../../../../Components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const RentPaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const { memberRentData, error, isError, isLoading } = useMemberRentAPI();
  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  const rentData = memberRentData[0];

  // console.log(rentData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentDatas = {
      email: rentData.agreementReqEmail,
      floor: rentData.floorNo,
      blockName: rentData.blockName,
      image: rentData.image,
      apartmentNo: rentData.apartmentNo,
      rent: rentData.rent,
      selectedMonth: selectedMonth?.toLocaleDateString("en-US", {
        month: "long",
      }),
      agreementAcceptDate: rentData.agreementAcceptDate,
      agreementRequestDate: rentData.agreementRequestDate,
    };
    // console.log(paymentDatas);

    navigate("/dashboard/checkOutpayment", {
      state: { paymentDatas },
    });

    // Handle payment logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Rent Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Member Information (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Member Email
            </label>
            <input
              type="text"
              value={rentData.agreementReqEmail}
              readOnly
              className="form-input rounded-md w-full bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Floor (Read-only) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Floor
              </label>
              <input
                type="text"
                value={rentData.floorNo}
                readOnly
                className="form-input rounded-md w-full bg-gray-100"
              />
            </div>

            {/* Block Name (Read-only) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Apartment No
              </label>
              <input
                type="text"
                value={rentData.apartmentNo}
                readOnly
                className="form-input rounded-md w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Apartment No (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Block Name
            </label>
            <input
              type="text"
              value={rentData.blockName}
              readOnly
              className="form-input rounded-md w-full bg-gray-100"
            />
          </div>

          {/* Rent (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Rent $
            </label>
            <input
              type="text"
              value={rentData.rent}
              readOnly
              className="form-input rounded-md w-full bg-gray-100"
            />
          </div>

          {/* Month Selection using react-datepicker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Select Month
            </label>
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MMMM"
              showMonthYearPicker
              className="form-input rounded-md w-full bg-gray-100"
              required
            />
          </div>

          {/* Submit/Pay Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentPaymentPage;
