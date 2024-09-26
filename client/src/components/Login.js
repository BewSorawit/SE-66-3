import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./img/login-image.png";

function Login({ setUser }) {
  const [values, setValues] = useState({
    email: "",
    passwordUser: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigateToCorrectPage = useCallback(
    (userData) => {
      const roleID = userData.roleID;
      switch (roleID) {
        case "1":
          navigate("/homeAdmin");
          break;
        case "2":
          navigate("/homeManager");
          break;
        case "3":
          navigate("/homeEmployee");
          break;
        case "4":
          navigate("/homeFc");
          break;
        default:
          alert("No record existed");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigateToCorrectPage(JSON.parse(loggedInUser));
    }
  }, [navigateToCorrectPage]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    console.log("Current Input Values:", { ...values, [name]: value }); // Log current state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, values)
        .then((res) => {
          const userData = res.data.user;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          navigateToCorrectPage(userData);
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Login failed.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-25">
        <div className="justify-content-md-between d-flex">
          <h3 className="align-items-center d-flex">Sign in</h3>
          <img
            className="d-flex rounded"
            src={logo}
            alt="Logo"
            width={75}
            height={75}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="inputEmail"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="inputPassword"
              placeholder="Enter Password"
              name="passwordUser"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.passwordUser && (
              <span className="text-danger">{errors.passwordUser}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.email.trim()) {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email format is incorrect";
  }

  if (!values.passwordUser.trim()) {
    error.passwordUser = "Password should not be empty";
  } else if (!password_pattern.test(values.passwordUser)) {
    error.passwordUser =
      "Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter.";
  }

  return error;
}

export default Login;
