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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = new Date().getFullYear();

    this.state = {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      contact: "",
      errorFirstname: false,
      errorSurname: false,
      errorEmail: false,
      errorPassword: false,
      errorContact: false,
      errorMessage: "This is a required field",
      currentYear: currentYear,
      success: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    document.title = "Signup | BarterFunds";
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
    } else if (name === "firstname") {
      this.setState({
        [name]: value,
        errorFirstname: false,
      });
    } else if (name === "surname") {
      this.setState({
        [name]: value,
        errorSurname: false,
      });
    } else if (name === "contact") {
      this.setState({
        [name]: value,
        errorContact: false,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    window.sessionStorage.clear();
    window.localStorage.clear();

    const { globalState } = this.props;
    const API_URL = globalState.api_url;
    const REACT_APP_PUBLIC_URL = globalState.REACT_APP_PUBLIC_URL;

    const { firstname, surname, contact, email, password } = this.state;

    this.setState({
      errorFirstname: firstname.length === 0,
      errorSurname: surname.length === 0,
      errorContact: contact.length === 0,
      errorEmail: email.length === 0,
      errorPassword: password.length === 0,
      errorMessage:
        this.state.errorFirstname ||
        this.state.errorSurname ||
        this.state.errorEmail ||
        this.state.errorPassword ||
        this.state.errorContact
          ? "This is a required field"
          : "This is a required field",
    });

    if (
      !this.state.errorFirstname &&
      !this.state.errorSurname &&
      !this.state.errorEmail &&
      !this.state.errorPassword &&
      !this.state.errorContact
    ) {
      let body = {
        firstname,
        surname,
        contact,
        email,
        password,
      };




      axios
        .post(`${API_URL}/auth/signup`, body)
        .then((response) => {
          if (response.data.success) {
            // setMessage('Login Successfully')
            console.log("response.data :>> ", response.data);
            openNotification('topRight', "success", "Success", "Registration successful");
            setTimeout(() => {
              this.setState({
                success: true,
                firstname: "",
                surname: "",
                email: "",
                password: "",
                contact: "",
              });
            }, 2000);
      
           
            // let token = response.data.token;
            // window.sessionStorage.setItem("token", token);

            // this.props.setGlobalState((prevState) => ({
            //   ...prevState,
            //   user: response.data.user,
            //   isAuthenticated: true,
            //   token: token,
            // }));

            // setTimeout(() => {
            //   this.props.navigate(`${process.env.REACT_APP_PUBLIC_URL}/login/mfa`);
            // }, 3000);
          }
        })
        .catch((error) => {
          // openNotification("error", "Error", error.response.data.message);
          openNotification('topRight', 'error', 'Error', error.response.data.message);
          this.setState({
            firstname: "",
            surname: "",
            email: "",
            password: "",
            contact: "",
          });
          // setTimeout(()=>{
          //     this.props.navigate(`${process.env.REACT_APP_PUBLIC_URL}/login`)
          // },2000)
          console.log("error :>> ", error.response.data.message);
        });
    }
  }

  render() {
    const { globalState } = this.props;

    return (
      <div class="nk-app-root">
        <div class="nk-main ">
          <div class="nk-wrap nk-wrap-nosidebar">
            <div class="nk-content ">
              <div class="nk-block nk-block-middle nk-auth-body wide-xs">
                <div class="brand-logo pb-4 text-center">
                  <a href={`${process.env.REACT_APP_PUBLIC_URL}/`} className="logo-link">
                    <img
                      className="logo-dark logo-img logo-img-lg"
                      src="/assets/images/barterfunds-logo.png"
                      alt="logo"
                    />
                  </a>
                </div>

                { this.state.success ? (
                  <Success
                    title={"🎉 Congratulations! 🎉"}
                    subtitle={"You’re now part of Barter Funds community."}
                    body={"Please check your email and verify your account to unlock all the exciting features awaiting you."}
                  />
                ) : (
                  <div class="card card-bordered">
                    <div class="card-inner card-inner-lg">
                      <div class="nk-block-head">
                        <div class="nk-block-head-content">
                          <h4 class="nk-block-title nk-block-des">Register</h4>
                          <div class="nk-block-des">
                            <p>Create A New Account With Us</p>
                          </div>
                        </div>
                      </div>
                      <form>
                        <TextInput
                          placeholder={"Enter your firstname"}
                          label={"Firstname"}
                          inputname={"firstname"}
                          inputtype={"text"}
                          value={this.state.firstname}
                          errorState={this.state.errorFirstname}
                          errorMessage={this.state.errorMessage}
                          onValueChange={this.handleInputChange}
                          required
                        />

                        <TextInput
                          placeholder={"Enter your surname"}
                          label={"Surname"}
                          inputname={"surname"}
                          inputtype={"text"}
                          value={this.state.surname}
                          errorState={this.state.errorSurname}
                          errorMessage={this.state.errorMessage}
                          onValueChange={this.handleInputChange}
                          required
                        />

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
                          showEye
                          required
                        />

                        <TextInput
                          placeholder={"Enter your contact"}
                          label={"Contact"}
                          inputname={"contact"}
                          inputtype={"tel"}
                          value={this.state.contact}
                          errorState={this.state.errorContact}
                          errorMessage={this.state.errorMessage}
                          onValueChange={this.handleInputChange}
                          required
                        />

                        <div class="form-note-s2 text-center my-4">
                          <p class="" for="">
                            By creating an account, you agree to Barter Funds
                            <a href="#"> Privacy Policy</a> &amp;{" "}
                            <a href="#"> Terms of Use.</a>
                          </p>
                        </div>

                        <div className="form-group">
                          <button
                            onClick={this.handleSubmit}
                            className="btn btn-lg btn-primary btn-block"
                          >
                            Register
                          </button>
                        </div>
                      </form>

                      <div class="form-note-s2 text-center pt-4">
                        Already have an account?
                        <a href={`${process.env.REACT_APP_PUBLIC_URL}/login`}>
                          <strong> Sign in instead</strong>
                        </a>
                      </div>
                      {/* <div class="text-center pt-4 pb-3">
                        <h6 class="overline-title overline-title-sap">
                          <span>OR</span>
                        </h6>
                      </div>
                      <ul class="nav justify-center gx-8">
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                            Facebook
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                            Google
                          </a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                )}
              </div>

              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withGlobalState(Signup);
