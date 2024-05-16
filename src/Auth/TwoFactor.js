import React from "react";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { withGlobalState } from "../withGlobalState";


class TwoFactor extends React.Component {
  constructor(props) {
    super(props);
    const currentYear = new Date().getFullYear();

    this.state = {
      inputValues: ["", "", "", "", "", ""],
      currentYear: new Date().getFullYear(),
      imageSrc: null,
      submitButton: false,
    };
    this.inputsRef = React.createRef();
  }

  componentDidMount() {

    document.title = "Two Factor Authentication | BarterFunds";

    const { globalState } = this.props;
    const API_URL = globalState.api_url;
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const body = {};

    axios
      .get(`${API_URL}/auth/two-factor-auth`, { headers: headers })
      .then((response) => {
        if (response.data.success) {

          this.setState({
            imageSrc: response.data.user.twoFactorAuthQrcode,
          });
        }

        this.props.setGlobalState((prevState) => ({
          ...prevState,
          user: response.data.user,
        }));
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if inputValues have changed
    if (prevState.inputValues !== this.state.inputValues) {
      // Perform any actions you want when inputValues change
    }
  }

  handleScan = () => {
    const { globalState } = this.props;
    const API_URL = globalState.api_url;
    const REACT_APP_PUBLIC_URL = globalState.REACT_APP_PUBLIC_URL;
    const token = window.sessionStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      twoFactorAuth: "true",
    });

    axios
      .patch(`${API_URL}/users/${globalState.user._id}`, body, {
        headers: headers,
      })
      .then((response) => {
        this.props.setGlobalState((prevState) => ({
          ...prevState,
          user: response.data.user,
        }));
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  handleInputChange = (index, value) => {
    const { inputValues } = this.state;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    this.setState({ inputValues: newInputValues }, () => {
      // Check if all input fields are filled
      const allFieldsFilled = newInputValues.every((value) => value !== "");
      if (allFieldsFilled) {
        this.setState({ submitButton: true });
      } else {
        this.setState({ submitButton: false });
      }

      // Automatically move to the next input field when a character is entered
      if (value && index < 5) {
        this.focusNextInput(index + 1);
      }
    });
  };

  handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      // Clear the current input field and move back to the previous one on Backspace
      this.handleInputChange(index, "");
      this.focusPrevInput(index - 1);
    }
  };

  handlePaste = (event, index) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      // If pasted data has 6 digits, fill the input fields accordingly
      const newInputValues = [...this.state.inputValues];
      pasteData.split("").forEach((char, i) => {
        newInputValues[index + i] = char;
      });
      this.setState({ inputValues: newInputValues });
    }
  };

  focusNextInput = (index) => {
    const inputs = this.inputsRef.current.querySelectorAll(
      ".input-section input"
    );
    if (index < inputs.length) {
      inputs[index].focus();
    }
  };

  focusPrevInput = (index) => {
    const inputs = this.inputsRef.current.querySelectorAll(
      ".input-section input"
    );
    if (index >= 0) {
      inputs[index].focus();
    }
  };

  handleSubmit = () => {
    const { globalState } = this.props;
    const API_URL = globalState.api_url;

    const { inputValues } = this.state;
    const otp = inputValues.join("");

    let token = window.sessionStorage.getItem("token");

    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }

    
    axios.get(`${API_URL}/auth/verify-otp/${otp}`, { headers: headers })
    .then((response) => {
      if (response.data.success) {
        openNotification('topRight', 'success', 'Success', 'Verification Successful');

        setTimeout(() => {
          this.props.navigate(
            `${process.env.REACT_APP_PUBLIC_URL}/user/dashboard`
          );
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error)
      openNotification('topRight', 'error', 'Invalid OTP', error.response.data.message);

      this.setState({
        inputValues: ["", "", "", "", "", ""],
        submitButton: false
      })
    });
    
  };

  render() {
    const { globalState } = this.props;

    return (
      <div className="nk-app-root">
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
                        <div
                          className="nk-block-des"
                          style={{ marginBottom: "-5%" }}
                        >
                          {globalState.user.twoFactorAuth ? (
                            <p>
                              Enter the 6-digit verification code generated by
                              your authenticator app
                            </p>
                          ) : (
                            <p>
                              Open your authenticator app (e.g., Google
                              Authenticator, Authy) and scan the QR code below.
                              This will add a new account to your authenticator
                              app.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {globalState.user.twoFactorAuth ? (
                      <div>
                        <div>
                          <div
                            className="input-container mb-4"
                            ref={this.inputsRef}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "400px",
                            }}
                          >
                            {this.state.inputValues.map((value, index) => (
                              <div
                                className="input-section"
                                key={index}
                                style={{ flex: 1, marginRight: "10px" }}
                              >
                                <input
                                  type="text"
                                  maxLength="1"
                                  placeholder="x"
                                  value={value}
                                  onChange={(e) =>
                                    this.handleInputChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e) =>
                                    this.handleKeyDown(e, index)
                                  }
                                  onPaste={(e) => this.handlePaste(e, index)}
                                  style={{
                                    width: "calc(100% - 10px)",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    marginTop: "20px",
                                  }}
                                />
                              </div>
                            ))}
                          </div>

                          
                        </div>

                        <button
                          onClick={this.handleSubmit}
                          className="btn btn-lg btn-primary btn-block"
                          disabled={!this.state.submitButton}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div class="card mt-0">
                          <img
                            class="card-image"
                            src={this.state.imageSrc}
                            alt="QR Code"
                          />
                          <p class="card-description nk-block-des">
                            
                            Click on{" "}
                            <span
                              style={{
                                color: "#810020",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                              onClick={this.handleScan}
                            >
                              NEXT
                            </span>{" "}
                            below once you are done scanning.
                          </p>
                        </div>

                        <button
                          onClick={this.handleScan}
                          className="btn btn-lg btn-primary btn-block mt-3"
                        >
                          Next
                        </button>
                      </div>
                    )}

                    <div className="form-group mt-3"></div>
                  </div>
                </div>
              </div>

              <div>
              <p class="card-description nk-block-des mb-5 mt-2"> 
              Need help signing in? 
                            <a href="mailto:barterfunds@gmail.com"
                              style={{
                                color: "#810020",
                                // fontWeight: "bold",
                                cursor: "pointer",
                                marginLeft: "3px"
                              }}
                            >
                              
                            Contact Us
                            </a>
                            
                          </p>
              </div>

              {/* <div className="nk-footer nk-auth-footer-full mt-5">
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
    );
  }
}

export default withGlobalState(TwoFactor);
