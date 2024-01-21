import useUserAnnounce from "../../API/UserAPI/useUserAnnounce";
import CustomLoading from "../../Components/CustomLoading";
import DashHeading from "../../Components/DashHeading/DashHeading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import AnnouncementCard from "./announcementCard/AnnouncementCard";

function UserAnnouncements() {
  const { announceData, error, isError, isLoading } = useUserAnnounce();

  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  console.log(announceData);
  return (
    <div>
      <DashHeading>Owner Announcements</DashHeading>

      <div className="grid grid-cols-1 gap-2 p-6 md:grid-cols-2 lg:grid-cols-3">
        {announceData.map((announce) => {
          return (
            <AnnouncementCard
              title={announce.title}
              description={announce.description}
              key={announce._id}
            ></AnnouncementCard>
          );
        })}
      </div>
    </div>
  );
}

export default UserAnnouncements;
