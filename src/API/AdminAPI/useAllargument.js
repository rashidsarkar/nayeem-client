import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useAllargument() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  //get member info
  const {
    data: allArgumentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/api/argumentRequest");
      return res.data;
    },
    queryKey: ["create-agreement"],
    // mutationKey: ["membersInfo"],
    onSuccess: () => {
      queryClient.invalidateQueries(["create-agreement"]);
    },
  });
  return { isLoading, isError, error, allArgumentData };
}

export default useAllargument;
// if (isLoading) return <CustomLoading></CustomLoading>;
// if (isError) return <ErrorMessage error={error}></ErrorMessage>;
