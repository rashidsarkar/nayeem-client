// import { useQuery } from "@tanstack/react-query";
// import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
// import useAuth from "../../hooks/useAuth";

// function usegetUserbasedArgument() {
//   const axiosSecure = useAxiosInstanceSecure();

//   const { user, loading } = useAuth();
//   console.log(loading);
//   const {
//     data: userbasedArgument,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/api/user/getUserBasedArgument/${user.email}`
//       );
//       console.log(res.data);
//       return res.data;
//     },
//     queryKey: ["create-agreement"],
//     enabled: !loading,
//   });
// }

// export default usegetUserbasedArgument;
