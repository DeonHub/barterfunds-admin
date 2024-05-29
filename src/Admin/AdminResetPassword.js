import React, {useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import TextInput from "../components/TextInput";
import Loader from "../components/Loader";
import axios from "axios";
import openNotification from "../components/OpenNotification";

const AdminResetPassword = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    document.title = "Admin Reset Password | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(false);
   
  }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event) => {
    setIsLoading(true)

    event.preventDefault();
    let body = {
      password
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, body)
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

  const passwordsMatch = password === confirmPassword && password.length >= 8;

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'dashboard'}/>
      <AdminHeader />
      <>
      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
        <div className="bodywrapper__inner">
          <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
            <h6 className="page-title">Reset Password</h6>
            <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
              <a
                href="javascript: history.go(-1)"
                className="btn btn-sm btn-outline--primary"
              >
                <i className="la la-undo" /> Back
              </a>
            </div>
          </div>
          <form
            encType="multipart/form-data"
          >
           
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row justify-content-center">
      
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-9">
                        <div className="row">
                          
                          <div className="col-xxl-4 col-sm-6">
                            <div className="form-group">
                            
      
                            <TextInput
                              placeholder={"Enter your password"}
                              label={"Password"}
                              inputname={"password"}
                              inputtype={"password"}
                              value={password}
                              onValueChange={handleInputChange}
                              showTooltip
                              toolTipMessage={"Password must be 8 characters minimum"}
                              showEye
                            />
                            </div>
                          </div>
                          <div className="col-xxl-4 col-sm-6">
                            <div className="form-group">
                            <TextInput
                              placeholder={"Confirm your password"}
                              label={"Confirm Password"}
                              inputname={"confirm-password"}
                              inputtype={"password"}
                              value={confirmPassword}
                              onValueChange={handleInputChange}
                              // showEye
                              // showTooltip
                              // toolTipMessage={"Password must match"}
                            />
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
      
            <div className="col-12 mt-5">
              <button 
              type="button" 
              className="btn btn--primary w-100 h-45 center" 
              onClick={handleSubmit}
              disabled={!passwordsMatch}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      
      
      </div>
      )}


</>

      
      

    </div>

  );
}


export default AdminResetPassword;
