import { useQuery } from "@tanstack/react-query";
import useApartmentRoom from "../../API/useApartmentRoom";
import axiosInstancePublic from "../../AxiosAPI/axiosInstance";
import ApartmentBanar from "../../Components/App/ApartmentBanar/ApartmentBanar";
import CustomLoading from "../../Components/CustomLoading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import SectionTitle from "../../TextEffectComponents/BannerDecpt/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import FeatureSection from "../Home/Feature/FeatureSection";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function Apartment() {
  const { user } = useAuth();
  // const { roomsData, isLoading, isError, error } = useApartmentRoom();
  // console.log(singleRoomData);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const myData = await axiosInstancePublic.get(
      `/api/apartmentRooms?limit=${limit}&page=${page}`
    );
    return myData.data;
  };

  const {
    data: roomsData,
    isLoading,
    error,
    refetch,
    isError, // Get the refetch function
  } = useQuery({
    queryFn: getData, // Call the function
    // queryKey: ["all-assignments", selectedDifficulty, limit, page],
    queryKey: ["singleRoomData", page], // Include selectedDifficulty in the query key
  });
  let totalPage = Math.ceil(roomsData?.count / limit);
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  if (isLoading) return <CustomLoading></CustomLoading>;
  if (isError) return <ErrorMessage error={error}></ErrorMessage>;
  // console.log(roomsData);

  return (
    <div>
      <Helmet>
        <title>Luxe | Apartment</title>
      </Helmet>
      <ApartmentBanar
        image="https://i.ibb.co/HCDxqkm/pexels-vecislavas-popa-813692.jpg"
        title="Luxurious Apartments"
        decpt="Discover a new level of luxury living in our exquisite apartments. Unmatched comfort and style await you."
      />
      <div className="">
        <SectionHeading>Explore Our Rooms</SectionHeading>
        {/* //TODO -  room databse teke ante hobe */}
        {/* //TODO -  pagination koira dekate hobe */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 py-9">
          {/* {roomsData.map((room) => {
            return <FeatureSection key={room._id} room={room}></FeatureSection>;
          })} */}

          {roomsData.result.map((room) => (
            <FeatureSection key={room._id} room={room} />
          ))}
        </div>
        <div className="flex justify-center ">
          <div className="join join-vertical lg:join-horizontal">
            <div className="border-2 rounded-none join border-primary">
              <button
                onClick={handlePrevious}
                className="btn join-item btn-ghost"
              >
                {"<<"}
              </button>
              {Array(totalPage)
                .fill(0)
                .map((item, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(pageNum)}
                      className={`${
                        pageNum === page
                          ? "btn join-item btn-primary"
                          : "btn join-item btn-ghost"
                      } `}
                    >
                      {` ${pageNum} `}
                    </button>
                  );
                })}

              <button onClick={handleNext} className="btn join-item btn-ghost">
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apartment;
