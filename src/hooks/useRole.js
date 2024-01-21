import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../FireBase/useAuthProvider";
import useAxiosInstanceSecure from "../AxiosAPI/useAxiosInstance";

function useRole() {
  const { user, loading } = useAuthProvider();
  const axiosInstanceSecure = useAxiosInstanceSecure();
  const token = localStorage.getItem("access-token");
  const {
    data: userRole,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(
        `/api/user/userRole/${user?.email}`
      );
      // console.log(res.data)
      return res.data.userRole;
    },
    enabled: !!user?.email && !!token && !loading,
    queryKey: [user?.email, "userRole"],
  });
  return { userRole, isLoading, isError, error };
}

export default useRole;
