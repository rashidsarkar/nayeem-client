import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useHandleAcpt() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  const { mutateAsync: handleAcptApi, error: acptError } = useMutation({
    mutationFn: async (apiInfo) => {
      const { id, email: email2, agreementAcceptDate } = apiInfo || {};
      const email = {
        email: email2,
        agreementAcceptDate: agreementAcceptDate,
        isBooked: true,
      };
      // console.log(apiInfo);
      // console.log(emailw);
      const res = await axiosSecure.put(
        `/api/admin/handleAcptreq/${id}`,
        email
      );
      console.log(res.data);
      return res.data;
    },
    onError: () => {
      console.log(acptError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "Your User has been Update.",
        icon: "success",
      });

      queryClient.invalidateQueries([
        "create-agreement",
        "databaseInfo",
        "membersInfo",
      ]);
    },
  });
  return { handleAcptApi };
}

export default useHandleAcpt;
