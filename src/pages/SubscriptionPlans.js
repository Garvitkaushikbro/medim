import style from "./SubscriptionPlans.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function SubscriptionPlans() {
  const { userCredentials, setUserCredentials } = useAuth();
  const navigate = useNavigate();
  // const queryParams = new URLSearchParams(window.location.search);
  // const paymentSuccess = queryParams.get("paymentSuccess");

  async function handleClick(e, option) {
    fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: option, quantity: 1 }],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }

  return (
    <div className={style.subscriptionPlans}>
      <div className={style.subscriptionPlan}>
        <h2>Premium</h2>
        <p>Get Unlimited Access:</p>
        <p className={style.subscriptionDetails}>3 posts per day - $3</p>
        <button
          className={style.subscribeButton}
          onClick={(e) => handleClick(e, 1)}
        >
          Subscribe Now
        </button>
      </div>

      <div className={style.subscriptionPlan}>
        <h2>Super Premium</h2>
        <p>Get Unlimited Access:</p>
        <p className={style.subscriptionDetails}>5 posts per day - $5</p>
        <button
          className={style.subscribeButton}
          onClick={(e) => handleClick(e, 2)}
        >
          Subscribe Now
        </button>
      </div>

      <div className={style.subscriptionPlan}>
        <h2>Super Super Premium</h2>
        <p>Get Unlimited Access:</p>
        <p className={style.subscriptionDetails}>10 posts per day - $10</p>
        <button
          className={style.subscribeButton}
          onClick={(e) => handleClick(e, 3)}
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}

export default SubscriptionPlans;
