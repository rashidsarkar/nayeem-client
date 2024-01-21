import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../../AxiosAPI/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";

function PaymentHistory() {
  const axiosSecure = useAxiosInstanceSecure();

  const { user, loading } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [myData, setMyData] = useState([]);

  const {
    data: paymentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const response = await axiosSecure.get(`/getPaymentsData/${user.email}`);
      setMyData(response.data);
      return response.data;
    },
    queryKey: ["paymentData"],
    enabled: !loading,
  });
  // console.log(paymentData);
  const handleSearchClick = async (value) => {
    console.log(value);
    const res = await axiosSecure.get(
      `/PaymentByMounth/${user.email}?monthname=${value}`
    );
    setMyData(res.data);
  };

  if (isLoading) return <CustomLoading />;
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <div className="assignment-nav-wrap">
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="text-left nav-link active">
              Payment History
            </button>
          </li>

          <li className="flex items-center flex-wrap justify-end">
            <p className="nav-link active">Search by month</p>
            <div className="relative lg:ml-4">
              <input
                type="text"
                placeholder="Enter month..."
                className="border w-[178px] border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <BiSearch
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 lg:h-8 w-6 lg:w-8 cursor-pointer"
                onClick={() => handleSearchClick(searchValue)} // Pass the searchValue to the handleSearchClick function
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name & Email</th>
              <th>Block Name & Floor</th>
              <th>Pay For Month</th>
              <th>Amount & Transaction ID</th>
              <th>Agreement Accept Date</th>
              <th>Apartment No</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={payment.userImage} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{payment.userName}</div>
                      <div className="text-sm opacity-50">
                        {payment.userEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {payment.blockName}
                  <br />
                  <span className="badge badge-ghost badge-sm text-center">
                    Floor No {payment.floor}
                  </span>
                </td>
                <td>{payment.payForMunth}</td>
                <td className="">
                  Total Bill: $ {payment.billPrice}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {payment.transactionId}
                  </span>
                </td>
                <td>{payment.agreementAcceptDate}</td>
                <td>Apartment No: {payment.apartmentNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
