// import { useQuery } from "@tanstack/react-query";

// import CustomLoading from "../Components/CustomLoading";

// function useTestData() {
//   const {
//     data: testData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryFn: async () => {
//       const res = await axiosInstance.get("/api/test");
//       return res.data;
//     },
//     queryKey: ["testApi"],
//   });
//   if (error) {
//     return error.message;
//   }

//   return { testData, isLoading };
// }

// export default useTestData;
