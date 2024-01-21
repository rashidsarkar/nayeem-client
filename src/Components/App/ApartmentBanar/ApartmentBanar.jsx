import React from "react"; // Import React if not already imported
import { Link } from "react-router-dom";

function ApartmentBanar({ image, title, decpt }) {
  return (
    <div className="relative">
      {/* Image */}
      <img src={image} alt={title} className="w-full md:h-[750px]" />

      {/* Overlay on the Image */}
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl">{decpt}</p>

          {/* Call to Action Button */}
          <Link
            // Replace with the actual URL you want to link to
            className="mt-4 inline-block px-4 py-2 bg-[#503CA1] text-white text-lg font-semibold rounded hover:bg-[#48378a] transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApartmentBanar;
