import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpConfirm() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/otp/confirm?otp=${otp}&email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.message === "User created successfully!") {
        setMessage("OTP verified successfully! Redirecting...");

        setTimeout(() => navigate("/homeAdmin"), 500);
      } else {
        setMessage("Invalid OTP or email.");
      }
    } catch (error) {
      setMessage("Error confirming OTP. Please try again.");
      console.error("Error confirming OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-confirm-container">
      <h2>Confirm OTP</h2>
      <form onSubmit={handleOtpConfirm}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Confirming..." : "Confirm OTP"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
