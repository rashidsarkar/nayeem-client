import useGetCoupon from "../../../API/Home/useGetCoupon";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";
import { IoMdAdd } from "react-icons/io";
import ModalCopon from "./ModalCopon";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import ModalCoponUpdate from "./ModalCoponUpdate";
import Swal from "sweetalert2";
import useUpdateCoupon from "../../../API/AdminAPI/useUpdateCoupon";
import DashHeading from "../../../Components/DashHeading/DashHeading";

function ManageCoupons() {
  const { error, getCoupon, isError, isLoading } = useGetCoupon();
  const { deleteCopun } = useUpdateCoupon();

  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  console.log(getCoupon);
  const handleDeledCopon = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCopun(id);
      }
    });
  };
  return (
    <div>
      <DashHeading>Manage Coupons</DashHeading>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Coupon Description</th>
              <th>Update Coupon</th>
              <th>Delete Coupon</th>
            </tr>
          </thead>
          <tbody>
            {getCoupon.map((coupon, idx) => {
              return (
                <tr key={coupon._id}>
                  <th>{++idx}</th>
                  <td>{coupon.couponCode}</td>
                  <td>{coupon.discountPercentage} %</td>
                  <td>{coupon.description}</td>
                  <td>
                    <button
                      onClick={() =>
                        document.getElementById(coupon._id).showModal()
                      }
                      className="btn btn-ghostHandl btn-xs"
                    >
                      <MdEditDocument /> Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeledCopon(coupon._id)}
                      className="btn btn-ghostHandl btn-xs"
                    >
                      <RiDeleteBin5Line /> Delete
                    </button>
                    <ModalCoponUpdate
                      midalID={coupon._id}
                      updateData={coupon}
                    ></ModalCoponUpdate>
                    {/* <ModalCoponUpdate />  */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="btn btn-info my-4 mb-14 mx-auto text-center flex justify-center"
      >
        <IoMdAdd className="inline-block w-4 h-4 mr-2" /> Add Coupons
      </button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <ModalCopon id={"my_modal_5"} />
    </div>
  );
}

export default ManageCoupons;
