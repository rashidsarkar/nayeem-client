import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";

function useCreateAgreement() {
  const axiosSecure = useAxiosInstanceSecure();
  const queryClient = useQueryClient();

  const { mutateAsync: createAgreement } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosSecure.post(
        `/api/user/createAgreement`,
        postData
      );
      console.log(result.data);

      return result.data;
    },
    mutationKey: ["create-agreement"],
    onSuccess: () => {
      queryClient.invalidateQueries(["create-agreement"]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Agreement has been successfully done.",
      });
    },
    onError: (error) => {
      if (error.response && error.response.status === 406) {
        // Handle the case where the agreement already exists
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Agreement already exists for this email.",
        });
      } else {
        // Handle other errors
        console.error("Error creating agreement:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while creating the agreement.",
        });
      }
    },
  });

  return { createAgreement };
}

export default useCreateAgreement;
