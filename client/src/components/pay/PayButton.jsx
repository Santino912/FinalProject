import axios from "axios";
import style from "./index.module.css";
// import { url } from "../slices/api";

const PayButton = () => {
  const handleCheckout = () => {
    let premium = localStorage.getItem("premium");
    if (premium) localStorage.removeItem("premium");
    localStorage.setItem("premium", true);
    axios
      .post("/create-checkout-session", {
        description: "",
        amount: 1000,
        quantity: "month",
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={style.divButton}>
      <button
        aria-label="Pay Premium"
        className={style.bt}
        onClick={() => handleCheckout()}
      >
        Premium
      </button>
    </div>
  );
};

export default PayButton;
