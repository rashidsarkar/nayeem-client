import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import Swal from "sweetalert2";

function useManageCouponsAPI() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  const { mutateAsync: makeCoupon, error: deleteError } = useMutation({
    mutationFn: async (cuponData) => {
      const res = await axiosSecure.post(`/api/admin/makeCopun`, cuponData);
      console.log(res.data);
      return res.data;
    },
    onError: () => {
      console.log(deleteError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "Your Coupon  has been Upload.",
        icon: "success",
      });
      queryClient.invalidateQueries(["getCoupon"]);
    },
  });
  return { makeCoupon };
}

export default useManageCouponsAPI;
// getCoupon
// if (isLoading) return <CustomLoading></CustomLoading>;
// if (isError) return <ErrorMessage error={error}></ErrorMessage>;
