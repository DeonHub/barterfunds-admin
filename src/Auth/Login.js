import React from "react";
import "./Auth.css";
import TextInput from "../components/TextInput";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import FailedLogin from "./FailedLogin";

class Login extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = new Date().getFullYear();
    // const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    const storedData = JSON.parse(localStorage.getItem("loginData")) || {};
    const deadline = storedData.deadline || Date.now() + 1000 * 60 * 5;

    this.state = {
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false,
      errorMessage: "This is a required field",
      currentYear: currentYear,
      showFailedLogin: storedData.showFailedLogin || false,
      failedLoginAttempts: storedData.failedLoginAttempts || 0,
      deadline: deadline,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Login | BarterFunds";
    
    const { failedLoginAttempts, deadline } = this.state;
    // If failedLoginAttempts is 5 or more, showFailedLogin is already set to true
    // We only need to start the countdown if showFailedLogin is true
    if (failedLoginAttempts >= 5) {
      // Start countdown if showFailedLogin is true
      this.countdownTimer = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime >= deadline) {
          clearInterval(this.countdownTimer);
          // Reset failed login attempts and hide FailedLogin component
          this.setState(
            (prevState) => ({
              failedLoginAttempts: 0,
              showFailedLogin: false,
              deadline: 0, // Reset deadline to 5 minutes from now
            }),
            () => {
              // Clear login data from localStorage
              localStorage.removeItem("loginData");
            }
          );
        }
      }, 1000); // Update every second
    }
  }
  componentWillUnmount() {
    // Clear countdown timer when component unmounts
    clearInterval(this.countdownTimer);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "email") {
      this.setState({
        [name]: value,
        errorEmail: false,
      });
    } else if (name === "password") {
      this.setState({
        [name]: value,
        errorPassword: false,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    window.sessionStorage.clear();
    window.localStorage.clear();

    const { email, password, failedLoginAttempts } = this.state;

    this.setState({
      errorEmail: email.length === 0,
      errorPassword: password.length === 0,
      errorMessage:
        email.length === 0 || password.length === 0
          ? "This is a required field"
          : "",
    });

    if (email.length !== 0 && password.length !== 0) {
      let body = {
        email,
        password,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
        .then((response) => {
          if (response.data.success) {

            if(response.data.user.isAdmin) {
              openNotification(
                "topRight",
                "success",
                "Success",
                "Login Successful"
              );
              
              let token = response.data.token;
              
              window.sessionStorage.setItem("token", token);
              window.sessionStorage.setItem("email", email);
              // window.sessionStorage.setItem("userId", response.data.user._id);
  
  
              setTimeout(() => {
                this.props.navigate(`/admin/dashboard`);
              }, 1000);
            } else{
              openNotification(
                "topRight",
                "error",
                "Could not Login to your account",
                "Invalid email address or password"
              );
            }
            
          }
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Could not Login to your account",
            "Invalid email address or password"
          );
          this.setState({
            email: "",
            password: "",
          });

          // Increment failed login attempts
          const updatedFailedLoginAttempts = failedLoginAttempts + 1;
          this.setState({ failedLoginAttempts: updatedFailedLoginAttempts });

          // Show FailedLogin component after 5 unsuccessful attempts
          if (updatedFailedLoginAttempts >= 5) {
            // Update localStorage with login data
            localStorage.setItem(
              "loginData",
              JSON.stringify({
                failedLoginAttempts: updatedFailedLoginAttempts,
                deadline: this.state.deadline,
                showFailedLogin: true,
              })
            );
            this.setState({ showFailedLogin: true });
            return;
          }

          console.log("error :>> ", error.response.data.message);
        });
    }
  }

  render() {

    return (
      <div class="nk-app-root">
        {this.state.showFailedLogin ? (
          <FailedLogin deadline={this.state.deadline} />
        ) : (
          <div>
            <div className="nk-main ">
              <div className="nk-wrap nk-wrap-nosidebar">
                <div className="nk-content ">
                  <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                    <div className="brand-logo pb-4 text-center">
                      <a
                        href={`/`}
                        className="logo-link"
                      >
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
                              Sign-In
                            </h4>
                            <div className="nk-block-des">
                              <p>
                                Sign in using your email address and password.
                              </p>
                            </div>
                          </div>
                        </div>
                        <form>
                          <TextInput
                            placeholder={"Enter your email address"}
                            label={"Email Address"}
                            inputname={"email"}
                            inputtype={"email"}
                            value={this.state.email}
                            errorState={this.state.errorEmail}
                            errorMessage={this.state.errorMessage}
                            onValueChange={this.handleInputChange}
                            required
                          />

                          <TextInput
                            placeholder={"Enter your password"}
                            label={"Password"}
                            inputname={"password"}
                            inputtype={"password"}
                            value={this.state.password}
                            errorState={this.state.errorPassword}
                            errorMessage={this.state.errorMessage}
                            onValueChange={this.handleInputChange}
                            showForgotPassword
                            showEye
                            required
                          />

                          <div className="form-group">
                            <button
                              onClick={this.handleSubmit}
                              className="btn btn-lg btn-primary btn-block"
                            >
                              Sign in
                            </button>
                          </div>
                        </form>
                        {/* <div className="form-note-s2 text-center pt-4">
                          New on our platform?
                          <a href={`/signup`}>
                            {" "}
                            Create an account
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
