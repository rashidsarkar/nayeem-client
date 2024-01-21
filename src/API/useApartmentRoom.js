import { useQuery } from "@tanstack/react-query";
import axiosInstancePublic from "../AxiosAPI/axiosInstance";

function useApartmentRoom() {
  const {
    data: roomsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosInstancePublic.get(`/api/apartmentRooms`);

      return res.data;
    },
    queryKey: ["singleRoomData"],
  });
  return { roomsData, isLoading, isError, error };
}

export default useApartmentRoom;
