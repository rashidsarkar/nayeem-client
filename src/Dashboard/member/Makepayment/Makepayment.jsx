import DashHeading from "../../../Components/DashHeading/DashHeading";
import Checkout from "./Checkout/Checkout";
import RentPaymentPage from "./RentPaymentPage/RentPaymentPage";

function Makepayment() {
  return (
    <div>
      <DashHeading>Make Payment</DashHeading>
      <RentPaymentPage />
      {/* <Checkout /> */}
    </div>
  );
}

export default Makepayment;
