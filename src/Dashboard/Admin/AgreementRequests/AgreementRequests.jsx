import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAllargument from "../../../API/AdminAPI/useAllargument";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";
import { FaCheck, FaTimes } from "react-icons/fa";
import useHandleAcpt from "../../../API/AdminAPI/useHandleAcpt";
import useHandleReject from "../../../API/AdminAPI/useHandleReject";
import DashHeading from "../../../Components/DashHeading/DashHeading";
function AgreementRequests() {
  const { allArgumentData, error, isError, isLoading } = useAllargument();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { handleAcptApi } = useHandleAcpt();
  const { handleRejectApi } = useHandleReject();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (isLoading) return <CustomLoading />;
  if (isError) return <ErrorMessage error={error} />;
  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  // console.log(formattedDate);
  const handleAcpt = async (id, email) => {
    const dataforApi = { id, email, agreementAcceptDate: formattedDate };
    // console.log(dataforApi);
    await handleAcptApi(dataforApi);
  };
  const useHandleRejectBtn = async (id) => {
    await handleRejectApi(id);
  };

  return (
    <div>
      <DashHeading>Agreement Requests</DashHeading>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Block Name</th>
              <th>User Info</th>
              <th>Floor Name</th>
              <th className="text-center">Rent</th>
              <th>Agreement Req Date</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {allArgumentData.map((agreement, idx) => {
              return (
                <tr key={agreement._id}>
                  <th>{++idx}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{agreement.blockName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {agreement.agreementReqName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {agreement.agreementReqEmail}
                    </span>
                  </td>
                  <td>{agreement.floorNo}</td>
                  <td className="text-left">$ {agreement.rent}</td>
                  <td>
                    {/* <DatePicker
                      className="bg-red-300 text-center rounded"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                    /> */}
                    {agreement.agreementRequestDate}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleAcpt(agreement._id, agreement.agreementReqEmail)
                      }
                      className="btn btn-ghost btn-xs"
                    >
                      <FaCheck /> Accept
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => useHandleRejectBtn(agreement._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AgreementRequests;
