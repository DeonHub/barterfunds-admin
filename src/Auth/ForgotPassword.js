import React, { useState, useEffect, useCallback } from "react";
import TextInput from "../components/TextInput";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import Success from "./Success";

const ForgotPassword = () => {
  
  const [email, setEmail] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password | BarterFunds";
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(value);

    if (name === "email") {
      setEmail(value);
      setSubmitButton(isEmailValid);
    }
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    let body = { email };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, body)
      .then((response) => {
        if (response.data) {
          openNotification(
            "topRight",
            "success",
            "Reset Link sent",
            "Please check your email for reset instructions."
          );

          setSubmitButton(false);
          setEmail("");
          setSuccess(true);
        }
      });
  }, [email]);

  return (
    <div className="nk-app-root">
      <div>
        <div className="nk-main">
          <div className="nk-wrap nk-wrap-nosidebar">
            <div className="nk-content">
              <div className="nk-block nk-block-middle nk-auth-body wide-xs">
                <div className="brand-logo pb-4 text-center">
                  <a
                    href={`${process.env.REACT_APP_PUBLIC_URL}/`}
                    className="logo-link"
                  >
                    <img
                      className="logo-dark logo-img logo-img-lg"
                      src="/assets/images/barterfunds-logo.png"
                      alt="logo"
                    />
                  </a>
                </div>

                {success ? (
                  <Success
                    title={"Password Reset Link"}
                    subtitle={""}
                    body={
                      "If there's an account associated with this email address, we'll send the password reset instructions."
                    }
                  />
                ) : (
                  <div className="card card-bordered">
                    <div className="card-inner card-inner-lg">
                      <div className="nk-block-head">
                        <div className="nk-block-head-content">
                          <div className="nk-block-des">
                            <p className="text-uppercase">
                              Request Password Reset
                            </p>
                          </div>
                        </div>
                      </div>

                      <form>
                        <TextInput
                          placeholder={"Enter your email address"}
                          inputname={"email"}
                          inputtype={"email"}
                          value={email}
                          onValueChange={handleInputChange}
                        />
                        <div className="form-group">
                          <button
                            className="btn btn-lg btn-primary btn-block"
                            disabled={!submitButton}
                            onClick={handleSubmit}
                          >
                            Send Reset Link
                          </button>
                        </div>
                      </form>

                      <div className="form-note-s2 text-center pt-4">
                        <a href={`${process.env.REACT_APP_PUBLIC_URL}/login`}>
                          <strong>Return to Login</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
