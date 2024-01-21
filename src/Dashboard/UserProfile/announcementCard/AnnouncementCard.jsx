/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdMegaphone } from "react-icons/io";
import { MdReadMore } from "react-icons/md";

function AnnouncementCard({ title, description }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayedDescription = showFullDescription
    ? description
    : description.slice(0, 50) + (description.length > 50 ? "..." : "");

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <IoMdMegaphone className="mb-3 text-gray-500 text-7xl dark:text-gray-400" />

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {displayedDescription}
      </p>

      {description.length > 50 && (
        <button
          onClick={handleReadMore}
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          {showFullDescription ? "Read less" : "Read more"}
          <MdReadMore className="text-4xl" />
        </button>
      )}
    </div>
  );
}

export default AnnouncementCard;
