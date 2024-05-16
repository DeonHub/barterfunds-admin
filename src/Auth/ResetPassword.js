import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { withGlobalState } from "../withGlobalState";
import TextInput from "../components/TextInput";
import openNotification from "../components/OpenNotification";
import axios from "axios";

const ResetPassword = ({ globalState }) => {
  const currentYear = new Date().getFullYear();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
      document.title = "Reset Password | BarterFunds";
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event) => {
    const API_URL = globalState.api_url;

    event.preventDefault();
    let body = {
      resetToken,
      password,
    };

    axios
      .post(`${API_URL}/auth/reset-password`, body)
      .then((response) => {
        if (response.data.success) {
          // setMessage('Login Successfully')
          openNotification(
            "topRight",
            "success",
            "Password Reset Successful",
            "Password Reset Successful. Please Login to continue."
          );
          console.log("response.data :>> ", response.data);
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            navigate(`${process.env.REACT_APP_PUBLIC_URL}/login`);
          }, 2000);
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );

        navigate(`${process.env.REACT_APP_PUBLIC_URL}/forgot-password`);

        console.log("error :>> ", error.response.data.message);
      });
  };

  // Check if passwords match
  const passwordsMatch = password === confirmPassword && password.length >= 8;

  return (
    <div className="nk-app-root">
      <div>
        <div className="nk-main ">
          <div className="nk-wrap nk-wrap-nosidebar">
            <div className="nk-content ">
              <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                  <a href={`${process.env.REACT_APP_PUBLIC_URL}/`} className="logo-link">
                    <img
                      className="logo-dark logo-img logo-img-lg"
                      src="/assets/images/barterfunds-logo.png"
                      alt="logo"
                    />
                  </a>
                </div>

                <div className="card card-bordered">
                  <div className="card-inner card-inner-lg">
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h4 className="nk-block-title nk-block-des">
                          Reset Password
                        </h4>
                        <div className="nk-block-des">
                          <p>Enter your new password to reset</p>
                        </div>
                      </div>
                    </div>
                    <form>
                      <TextInput
                        placeholder={"Enter your password"}
                        label={"Password"}
                        inputname={"password"}
                        inputtype={"text"}
                        value={password}
                        onValueChange={handleInputChange}
                        showTooltip
                        toolTipMessage={"Password must be 8 characters minimum"}
                      />

                      <TextInput
                        placeholder={"Confirm your password"}
                        label={"Confirm Password"}
                        inputname={"confirm-password"}
                        inputtype={"text"}
                        value={confirmPassword}
                        onValueChange={handleInputChange}
                        // showTooltip
                        // toolTipMessage={"Password must match"}
                      />

                      <div className="form-group">
                        <button
                          className="btn btn-lg btn-primary btn-block"
                          onClick={handleSubmit}
                          disabled={!passwordsMatch}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                    <div className="form-note-s2 text-center pt-4">
                      Remember your password?
                      <a href={`${process.env.REACT_APP_PUBLIC_URL}/login`}> Login</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="nk-footer nk-auth-footer-full">
                <div className="container wide-lg">
                  <div className="row g-3">
                    <div className="col-lg-6 order-lg-last">
                      <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Terms & Condition
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Privacy Policy
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Help
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <div className="nk-block-content text-center text-lg-left">
                        <p className="text-soft">
                          &copy; {currentYear} Barter Funds. All Rights
                          Reserved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withGlobalState(ResetPassword);
