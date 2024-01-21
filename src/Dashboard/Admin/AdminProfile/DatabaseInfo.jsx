import {
  FaBookmark,
  FaRestroom,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import useDatabaseInfo from "../../../API/AdminAPI/useDatabaseInfo";
import CustomLoading from "../../../Components/CustomLoading";
import ErrorMessage from "../../../Components/ErrorMessage/ErrorMessage";
import { MdBedroomParent } from "react-icons/md";

function DatabaseInfo() {
  const { databaseInfo, error, isError, isLoading } = useDatabaseInfo();
  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  // console.log(databaseInfo);

  const {
    bookedRooms,
    percentBooked,
    percentavailable,
    totalMember,
    totalRooms,
    totalUsers,
  } = databaseInfo;
  return (
    <div>
      <div className="stats shadow w-full stats-vertical lg:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <MdBedroomParent className="text-4xl" />
          </div>
          <div className="stat-title">Total Rooms</div>
          <div className="stat-value">{totalRooms}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaRestroom className="text-4xl" />
          </div>
          <div className="stat-title">Available Rooms</div>
          <div className="stat-value">{percentavailable?.toFixed(2)} %</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBookmark className="text-4xl" />
          </div>
          <div className="stat-title">Booked Rooms</div>
          <div className="stat-value">{percentBooked} %</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUserTie className="text-4xl" />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value">{totalUsers}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUserShield className="text-4xl" />
          </div>
          <div className="stat-title">Total Members</div>
          <div className="stat-value">{totalMember}</div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseInfo;
