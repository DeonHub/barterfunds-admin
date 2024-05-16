import React from "react";
import TextInput from "../components/TextInput";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { withGlobalState } from "../withGlobalState";
import Success from "./Success";

// {
//   "email": "hedeb97411@seosnaps.com",
//   "password": "qwertyuiop"
// }

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = new Date().getFullYear();

    this.state = {
      email: "",
      currentYear: currentYear,
      submitButton: false,
      success: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    document.title = "Forgot Password | BarterFunds";
  }

  
  handleInputChange(event) {
    const { name, value } = event.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(value);

    if (name === "email") {
      this.setState({
        [name]: value,
        submitButton: isEmailValid,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email } = this.state;

    let body = {
      email,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, body)
    .then((response) => {
    if (response.data) {
      openNotification(
        "topRight",
        "success",
        "Reset Link sent",
        "Please check your email for reset instructions."
      );

      this.setState({
        submitButton: false,
        email: "",
        success: true,
      });
     }
    });
    // .catch((error) => {
    //   openNotification(
    //     "topRight",
    //     "error",
    //     "Invalid Email address",
    //     "User with email does not exist"
    //   );

    //   console.log("error :>> ", error.response.data.message);
    // });

    
  }

  render() {
    const { globalState } = this.props;

    return (
      <div class="nk-app-root">
        <div>
          <div className="nk-main ">
            <div className="nk-wrap nk-wrap-nosidebar">
              <div className="nk-content ">
                <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
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

                  {this.state.success ? (
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
                            // label={'Email Address'}
                            inputname={"email"}
                            inputtype={"email"}
                            value={this.state.email}
                            errorState={this.state.errorEmail}
                            errorMessage={this.state.errorMessage}
                            onValueChange={this.handleInputChange}
                            // required
                          />
                          <div className="form-group">
                            <button
                              className="btn btn-lg btn-primary btn-block"
                              disabled={!this.state.submitButton}
                              onClick={this.handleSubmit}
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
                        {/* <div>
                          <p class="card-description nk-block-des mb-5 mt-2">
                            Need help signing in?
                            <a
                              href="mailto:barterfunds@gmail.com"
                              style={{
                                color: "#810020",
                                cursor: "pointer",
                                marginLeft: "3px",
                              }}
                            >
                              {""}Contact Us
                            </a>
                          </p>
                        </div> */}
                      </div>
                    </div>
                  )}
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
                            &copy; {this.state.currentYear} Barter Funds. All
                            Rights Reserved.
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
  }
}

export default withGlobalState(ForgotPassword);
