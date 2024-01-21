import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
// import axiosInstancePublic from "../../AxiosAPI/axiosInstance";

function useGetCoupon() {
  const axiosSecure = useAxiosInstanceSecure();
  // const queryClient = useQueryClient();

  //get member info
  const {
    data: getCoupon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/api/coupon");
      return res.data;
    },
    queryKey: ["getCoupon"],
    // mutationKey: ["membersInfo"],
    // onSuccess: () => {
    //   // queryClient.invalidateQueries(["create-agreement"]);
    // },
  });
  return { isLoading, isError, error, getCoupon };
}

export default useGetCoupon;
