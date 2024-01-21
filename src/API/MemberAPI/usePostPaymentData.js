import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../../AxiosAPI/useAxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function usePostPaymentData() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInstanceSecure();
  const navigate = useNavigate();

  const { mutateAsync: postPayment, error: deleteError } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(`/payments`, paymentInfo);
      console.log(res.data);

      return res.data;
    },
    onError: () => {
      console.log(deleteError);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentData"]);
      Swal.fire({
        title: "Payment Success",
        text: "Thank you for your payment. Your transaction has been successfully processed.",
        icon: "success",
      });
      navigate("/dashboard/PaymentHistory");
    },
  });
  return { postPayment };
}

export default usePostPaymentData;
