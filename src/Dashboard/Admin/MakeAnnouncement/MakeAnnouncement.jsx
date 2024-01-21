import { useState } from "react";
import useMakeAnnounce from "../../../API/AdminAPI/useMakeAccoun";
import DashHeading from "../../../Components/DashHeading/DashHeading";

function MakeAnnouncement() {
  const { makeAccoun } = useMakeAnnounce();
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to send the announcement to the server
    console.log("Announcement submitted:", announcement);
    await makeAccoun(announcement);

    // Clear the form after submission
    setAnnouncement({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <DashHeading>Post Announcement</DashHeading>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.ibb.co/Hg5Q2jt/make-announcement-message-business-people-260nw-796874509.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            {/* <h1 className="text-5xl font-bold text-center ">Box Office News!</h1> */}
            <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Post Announcement</h2>
              <form className="lg:min-w-[350px]" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={announcement.description}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <button type="submit" className="btn btn-primary">
                    Post Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeAnnouncement;
