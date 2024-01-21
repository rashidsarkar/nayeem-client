import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import Swal from "sweetalert2";

function useUpdateCoupon() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  const { mutateAsync: updateCoupon, error: deleteError } = useMutation({
    mutationFn: async (upDatedData) => {
      const { cuponData, updatedID } = upDatedData;
      const res = await axiosSecure.put(
        `/api/updateCopun/${updatedID}`,
        cuponData
      );
      console.log(res.data);
      return res.data;
    },
    onError: () => {
      console.log(deleteError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "Your Coupon  has been Update.",
        icon: "success",
      });
      queryClient.invalidateQueries(["getCoupon"]);
    },
  });
  const { mutateAsync: deleteCopun } = useMutation({
    mutationFn: async (deledID) => {
      const res = await axiosSecure.delete(`/api/admin/deleteCopun/${deledID}`);
      console.log(res.data);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "Your Coupon  has been Deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries(["getCoupon"]);
    },
  });

  return { updateCoupon, deleteCopun };
}

export default useUpdateCoupon;
