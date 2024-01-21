import useAuth from "../../../hooks/useAuth";
import UserCard from "../../UserProfile/UserCard/UserCard";
import DatabaseInfo from "./DatabaseInfo";

function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center ">
        <UserCard
          imageUrl={user.photoURL}
          title={user.displayName}
          description={user.email}
        ></UserCard>
      </div>

      <div className="divider">Database Info</div>
      <DatabaseInfo />
    </div>
  );
}

export default AdminProfile;
