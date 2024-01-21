import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import Swal from "sweetalert2";
import { data } from "autoprefixer";

function useManageMembers() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();

  //get member info
  const {
    data: memberInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/memberInfo");
      return res.data;
    },
    queryKey: ["membersInfo"],
    // mutationKey: ["membersInfo"],
    onSuccess: () => {
      queryClient.invalidateQueries(["databaseInfo"]);
    },
  });

  //removed member

  const { mutateAsync: deleteMember, error: deleteError } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/api/admin/deleteMember/${id}`);
      // console.log(data);
      return res.data;
    },
    onError: () => {
      console.log(deleteError);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your Member has been deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries([
        "membersInfo",
        "databaseInfo",
        "create-agreement",
      ]);
    },
  });

  return { isLoading, isError, error, memberInfo, deleteMember };
}

export default useManageMembers;

// if (isLoading) return <CustomLoading></CustomLoading>;
// if (isError) return <ErrorMessage error={error}></ErrorMessage>;
