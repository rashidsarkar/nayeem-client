import { TypeAnimation } from "react-type-animation";
function TypAni() {
  return (
    <div>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          "Box Office News!",
          1000,
          "Box Office Update!",
          1000,
          "Box Office Dinner!",
          1000,
          "Box Office Hottet!",
          1000,
        ]}
        speed={50}
        style={{ fontSize: "3rem", fontWeight: "700" }}
        repeat={Infinity}
      />
    </div>
  );
}

export default TypAni;
