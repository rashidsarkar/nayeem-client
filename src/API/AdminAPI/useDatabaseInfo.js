import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useDatabaseInfo() {
  const axiosSecure = useAxiosInstanceSecure();
  const {
    data: databaseInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/admin/dataInfo`);

      return res.data;
    },
    queryKey: ["databaseInfo"],
  });
  return { databaseInfo, isLoading, isError, error };
}

export default useDatabaseInfo;

// if (isLoading) return <CustomLoading></CustomLoading>;
// if (isError) return <ErrorMessage error={error}></ErrorMessage>;
