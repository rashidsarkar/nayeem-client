import { FaTrashAlt } from "react-icons/fa";
import useManageMembers from "../../../API/AdminAPI/useManageMembers";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";
import Swal from "sweetalert2";
import DashHeading from "../../../Components/DashHeading/DashHeading";

function ManageMembers() {
  const { memberInfo, error, isError, isLoading, deleteMember } =
    useManageMembers();
  // console.log(memberInfo);
  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  const handleRemovedUser = async (id) => {
    // console.log(id);

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
        await deleteMember(id);
      }
    });
  };

  return (
    <div>
      <DashHeading>Manage Members</DashHeading>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Member Name</th>
                <th>Member Email</th>
                <th>Remove Member</th>
              </tr>
            </thead>
            <tbody>
              {memberInfo.map((member, idx) => {
                return (
                  <tr key={member._id}>
                    <td>{++idx}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>
                      <button
                        onClick={() => handleRemovedUser(member._id)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-blue-600"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageMembers;
