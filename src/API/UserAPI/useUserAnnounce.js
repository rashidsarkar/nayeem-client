import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useUserAnnounce() {
  const axiosSecure = useAxiosInstanceSecure();
  const queryClient = useQueryClient();

  const {
    data: announceData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/api/announce");
      return res.data;
    },
    queryKey: ["announceInfo"],
    // mutationKey: ["membersInfo"],
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["databaseInfo"]);
    // },
  });
  return { isLoading, isError, error, announceData };
}

export default useUserAnnounce;
