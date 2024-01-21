import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosInstanceSecure from "../AxiosAPI/useAxiosInstance";

function useAdmin() {
  const axiosSecure = useAxiosInstanceSecure();
  const { user, loading } = useAuth();
  // console.log(!!user);
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    enabled: !loading,
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      return res.data.admin;
    },
  });
  return { isAdmin, adminLoading };
}

export default useAdmin;
