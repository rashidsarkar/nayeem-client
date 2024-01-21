// import { useQuery } from "@tanstack/react-query";
// import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

// function useSarchHistory() {
//   const axiosSecure = useAxiosInstanceSecure();

//   const {
//     data: sarchHistory,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryFn: async (value) => {
//       // console.log(value);
//       const { email, search_term } = value;
//       console.log(email, search_term);
//       const res = await axiosSecure.get(
//         `/PaymentByMounth/${email}?monthname=${search_term}`
//       );
//       // console.log(res.data);
//       return res.data;
//     },
//     queryKey: ["searchPayment"],
//   });
//   return { sarchHistory, isError, isLoading, error };
// }

// export default useSarchHistory;
