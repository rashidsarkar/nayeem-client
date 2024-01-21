import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import BannerDecpt from "../../TextEffectComponents/BannerDecpti/BannerDecpt";

const Footer = () => {
  return (
    <>
      <footer className="p-10 footer bg-base-200 text-base-content">
        <aside>
          <img
            className="w-[150px]"
            src="https://i.ibb.co/qnfmDWY/logo.png"
            alt=""
          />

          <p className="text-gray-700 mb-7 lg:w-[380px] text-body-color mt-7 dark:text-dark-6">
            Elevate your living experience with Luxw. Discover a new standard of
            luxury and comfort at the heart of Dhanmondi. Manage your dream home
            in our prestigious buildings.
          </p>
        </aside>

        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <header className="footer-title">Resources</header>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Blog</a>
        </nav>
        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter className="text-3xl cursor-pointer" />
            </a>
            <a>
              <FaYoutube className="text-3xl cursor-pointer" />
            </a>
            <a>
              <FaFacebook className="text-3xl cursor-pointer" />
            </a>
          </div>
        </nav>
      </footer>

      {/* <LinkGroup header="">
        <NavLink label="" />
        <NavLink label="" />
      </LinkGroup>
      <LinkGroup header="">
        <NavLink label="About Us" />
        <NavLink label="Contact Us" />
        <NavLink label="Careers" />
      </LinkGroup>
      <LinkGroup header="Quick Links">
        <NavLink label="Property Listings" />
        <NavLink label="Testimonials" />
        <NavLink label="FAQ" />
      </LinkGroup> */}
    </>
  );
};

export default Footer;
