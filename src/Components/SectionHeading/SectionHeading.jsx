import { Zoom } from "react-reveal";
import "./SectionHeading.css";

function SectionHeading({ children }) {
  return (
    <h2
      className={`text-center my-12 relative mb-10 text-4xl font-normal leading-10 uppercase before:bg-[#503CA1] before:bottom-[-10px] before:h-[4px] before:rounded-lg before:left-[50%] 
      before:absolute before:translate-x-[-50%] before:w-[70%]`}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
