import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useHandleReject() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  const { mutateAsync: handleRejectApi, error: acptError } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.put(`/api/admin/handleAcptreq/${id}`, {
        isBooked: false,
      });

      console.log(res.data);
      return res.data;
    },
    onError: () => {
      console.log(acptError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "You has been Successfully reject user.",
        icon: "success",
      });

      queryClient.invalidateQueries([
        "create-agreement",
        "databaseInfo",
        "membersInfo",
      ]);
    },
  });
  return { handleRejectApi };
}

export default useHandleReject;
