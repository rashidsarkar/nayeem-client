import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../../AxiosAPI/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";
import UserCard from "../../UserProfile/UserCard/UserCard";
import AgreementData from "../../UserProfile/agreementData/AgreementData";

function MemberProfile() {
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
        `/api/user/getMembersArgument/${user.email}`
      );
      console.log(res.data);
      return res.data;
    },
    queryKey: ["create-agreement"],
    enabled: !loading,
  });
  if (isLoading) return <CustomLoading />;
  if (isError) return <ErrorMessage error={error} />;
  console.log(userbasedArgument);

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
      <div className="divider py-7">Agreement Information</div>
      {/* Agreement Information */}
      <div className="flex-1 border">
        <div className="grid grid-cols-1 gap-5 p-6 bg-white rounded-md shadow-md md:grid-cols-2 ">
          {userbasedArgument.map((argument) => {
            return (
              <AgreementData
                argument={argument}
                key={argument._id}
              ></AgreementData>
            );
          })}

          {/* <p className="text-gray-500">No Agreement Available</p> */}
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
