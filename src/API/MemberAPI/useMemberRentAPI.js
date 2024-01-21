import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import useAuth from "../../hooks/useAuth";

function useMemberRentAPI() {
  const axiosSecure = useAxiosInstanceSecure();
  const { user, loading } = useAuth();

  const {
    data: memberRentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/user/getMembersArgument/${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
    queryKey: ["create-agreement"],
    enabled: !loading,
  });
  return { memberRentData, isLoading, isError, error };
}

export default useMemberRentAPI;
// if (isLoading) return <CustomLoading></CustomLoading>;
// if (isError) return <ErrorMessage error={error}></ErrorMessage>;
