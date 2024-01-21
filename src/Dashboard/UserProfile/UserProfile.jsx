import React from "react";
import UserCard from "./UserCard/UserCard";
import AgreementData from "./agreementData/AgreementData";
import useAuth from "../../hooks/useAuth";
import useApartmentRoom from "../../API/useApartmentRoom";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import CustomLoading from "../../Components/CustomLoading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

function UserProfile() {
  const axiosSecure = useAxiosInstanceSecure();

  const { user, loading } = useAuth();
  console.log(loading);
  const {
    data: userbasedArgument,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/user/getUserBasedArgument/${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
    queryKey: ["create-agreement"],
    enabled: !loading,
  });
  if (isLoading) return <CustomLoading />;
  if (isError) return <ErrorMessage error={error} />;
  // console.log(userbasedArgument[0]);

  return (
    <div className="flex flex-col py-20 space-y-4 lg:space-y-0 ">
      {/* User Information */}

      <div className="flex items-center justify-center ">
        <UserCard
          imageUrl={user.photoURL}
          title={user.displayName}
          description={user.email}
        ></UserCard>
      </div>
      <div className="divider py-7">User Agreement Information</div>

      {/* Agreement Information */}
      <div className="flex-1 border">
        <div className="grid grid-cols-1 gap-5 p-6 bg-white rounded-md shadow-md md:grid-cols-2 ">
          <div className="flex flex-wrap lg:p-6 lg:space-y-4 lg:flex-col items-center mb-4 space-x-4 border gap-x-3">
            <div className="rounded-md md:max-w-sm  lg:w-[300px]">
              <img src="" alt="none" />
            </div>

            <div className="lg:text-center">
              <p className="text-gray-500">Floor No: none</p>
              <p className="text-gray-500">Block: none</p>
              <p className="text-gray-500">Apartment No: none</p>
              <p className="text-gray-500">Rent: none</p>
              <p className="text-gray-500">Req. Date: none</p>
              <p className="text-gray-500">Agreement Accept Date: none</p>
            </div>
          </div>

          {/* <p className="text-gray-500">No Agreement Available</p> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
