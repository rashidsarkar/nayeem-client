import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import Swal from "sweetalert2";

function useMakeAnnounce() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  const { mutateAsync: makeAccoun, error: deleteError } = useMutation({
    mutationFn: async (announceData) => {
      const res = await axiosSecure.post(`/api/makeAnnounce`, announceData);
      console.log(res.data);
      return res.data;
    },
    onError: () => {
      console.log(deleteError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "success",
        text: "Your Announcement has been Upload.",
        icon: "success",
      });
      queryClient.invalidateQueries(["announceInfo"]);
    },
  });
  return { makeAccoun };
}

export default useMakeAnnounce;
