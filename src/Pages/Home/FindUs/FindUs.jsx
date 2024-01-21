import React from "react";
import { FaMapMarkerAlt, FaPhone, FaClock, FaPlane } from "react-icons/fa";
import BannerDecpt from "../../../TextEffectComponents/BannerDecpti/BannerDecpt";

function FindUs() {
  return (
    <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
      <div className="text-center lg:text-left">
        <BannerDecpt>
          <h2 className="mb-4 text-4xl font-bold">
            Discover Our Location in Dhanmondi
          </h2>
          <div className="mb-4">
            <p className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-g1" />
              123 Main Street, Dhanmondi, Dhaka, Bangladesh
            </p>
            <p className="flex items-center text-gray-600">
              <FaPhone className="mr-2 text-g1" />
              +880 2 1234 5678
            </p>
            <p className="flex items-center text-gray-600">
              <FaClock className="mr-2 text-g1" />
              Opening Hours: Mon - Fri, 9:00 AM - 6:00 PM
            </p>
          </div>
          <p className="text-gray-700">
            Explore our prime location in the heart of Dhanmondi, providing easy
            access to vibrant shopping centers, diverse restaurants, and
            enriching cultural attractions. Feel free to visit us during our
            welcoming opening hours or reach out for inquiries or directions.
          </p>
          <div className="mt-4">
            <h3 className="mb-2 text-2xl font-semibold">
              How to Get Here from the Airport
            </h3>
            <p className="flex items-center text-gray-700">
              <FaPlane className="mr-2 text-5xl text-g1" />
              Take a taxi or use a rideshare service from the airport. Our
              location is approximately 15 kilometers away, and the journey
              takes around 30-40 minutes, depending on traffic conditions.
            </p>
          </div>
        </BannerDecpt>
      </div>
      <div className="lg:h-[415px] lg:w-[556px] relative">
        <img
          src="https://image-tc.galaxy.tf/wipng-60rw0pf8vomuydt2jlf3i5idu/screen-shot-2019-08-22-at-12.png?width=1920"
          alt=""
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-black rounded-lg opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">Visit Us Today!</h3>
        </div>
      </div>
    </div>
  );
}

export default FindUs;
