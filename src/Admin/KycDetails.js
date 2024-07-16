import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import { Avatar } from "antd";
import Loader from "../components/Loader";
import axios from "axios";
import PageModal from "../components/PageModal";

const KycDetails = () => {
  const navigate = useNavigate();
  const { kycId } = useParams();
  const [kyc, setKyc] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "KYC Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate('/login');
      return;
    }


    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/kycs/${kycId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.kyc)
          setKyc(response.data.kyc);
          setIsLoading(false);
          // setGlobalState((prevState) => ({
          //   ...prevState,
          //   currencies: response.data.currencies
          // }));
          // console.log(JSON.stringify(response.data))
        } else {
          setKyc({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, [navigate, kycId]);

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  const getFileUrl = (filepath) => {
    if (filepath?.startsWith('uploads')) {
      return `${process.env.REACT_APP_API_URL}/${filepath}`;
    }
    return filepath;
  };

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"kyc"} />
      <AdminHeader />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="body-wrapper">
            <div className="bodywrapper__inner">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <h6 className="page-title">
                  KYC Details - {kyc.firstname} {kyc.surname}
                </h6>
                <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
                  <button
                    onClick={handleBack}
                    className="btn btn-sm btn-outline--primary"
                  >
                    <i className="la la-undo" /> Back
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card mt-30">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        Information of {kyc.firstname} {kyc.surname}
                      </h5>
                    </div>

                    <div className="card-body">
                      <div className="center mb-3">
                        <Avatar
                          size={250}
                          src={<img src={kyc.photograph} alt="avatar" />}
                        />
                      </div>
                      <hr />

                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label>First Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                value={kyc.firstname}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-control-label">
                                Last Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={kyc.surname}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Email </label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-envelope" />
                                </span>
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  className="form-control"
                                  value={kyc.email}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Mobile Number</label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-phone" />
                                </span>
                                <input
                                  type="text"
                                  name="mobile"
                                  value={`+${kyc.contact}`}
                                  disabled
                                  id="mobile"
                                  className="form-control "
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Date of Birth</label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-file" />
                                </span>
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  className="form-control"
                                  value={formatDate(kyc.dateOfBirth)}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Nationality</label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-globe" />
                                </span>
                                <input
                                  type="text"
                                  name="mobile"
                                  value={kyc.nationality}
                                  disabled
                                  id="mobile"
                                  className="form-control "
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label>Residential Address</label>
                              <input
                                className="form-control"
                                type="text"
                                name="address"
                                value={kyc.residentialAddress}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6">
                            <div className="form-group ">
                              <label>Country</label>
                              <input
                                className="form-control"
                                type="text"
                                name="state"
                                value={kyc.country}
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-6">
                            <div className="form-group ">
                              <label>State/Region</label>
                              <input
                                className="form-control"
                                type="text"
                                name="state"
                                value={kyc.region}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="form-group">
                              <label>City/Town</label>
                              <input
                                className="form-control"
                                type="text"
                                name="city"
                                value={kyc.city}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="form-group ">
                              <label>Postal Address</label>
                              <input
                                className="form-control"
                                type="text"
                                name="zip"
                                value={kyc.postalAddress}
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group ">
                              <label>Identity Document Type</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                value={kyc.identityDocumentType}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-control-label">
                                Identity Document Number
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={kyc.identityDocumentNumber}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-control-label">
                                Issuing Authority
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={kyc.issuingAuthority}
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label>Document Issued Date</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                value={formatDate(kyc.issueDate)}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-control-label">
                                Document Expiry Date
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={formatDate(kyc.expiryDate)}
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row mt-4 mb-4">
                          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                            <p className="text-bold center mb-3">
                              ID Card Front
                            </p>
                            <div className="thumb mb-5">
                              <div className="avatar-preview center">
                                <div>
                                
                                  <a href={getFileUrl(kyc.frontImage)} target='_blank' rel="noreferrer" className="caption-text">View ID Card Front</a>
                        
                                  
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                            <p className="bold center mb-3">ID Card Back</p>
                            <div className="thumb mb-2">
                              <div className="avatar-preview center">
                                <div>
                                <a href={getFileUrl(kyc.backImage)} target='_blank' rel="noreferrer" className="caption-text">View ID Card Back</a>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label>Proof of Address Document Uploaded</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                value={kyc.proofDocumentUploaded}
                                disabled
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-control-label">
                                View Proof of Address
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={formatDate(kyc.expiryDate)}
                                disabled
                              />
                            </div>
                          </div> */}
                          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                            <p className="bold center mb-3">Proof of Address</p>
                            <div className="thumb mb-2">
                              <div className="avatar-preview center">
                                <div>
                                <a href={getFileUrl(kyc.proofOfAddress)} target='_blank' rel="noreferrer" className="caption-text">View Proof of Address</a>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        {kyc.status === "pending" ? (
                          <div className="row mt-4">
                            <div className="col-md-12">
                              <div className="d-flex flex-wrap gap-3 mt-4">
                                <div className="flex-fill">
                                  <PageModal
                                    title={"Approve User"}
                                    content={
                                      "This users KYC will be approved. Are you sure you want to approve this KYC?"
                                    }
                                    action={"approve"}
                                    status={"approved"}
                                    updateUrl={`${process.env.REACT_APP_API_URL}/kycs/${kyc._id}`}
                                    className={
                                      "btn btn--success btn--shadow w-100 btn-lg center"
                                    }
                                    icon={"las la-user-check"}
                                    setIsLoading={setIsLoading}
                                    redirectTo={"kycs"}
                                  />
                                </div>

                                <div className="flex-fill">
                                  <PageModal
                                    title={"Reject User"}
                                    content={
                                      "This users KYC will be rejected. Are you sure you want to reject this KYC?"
                                    }
                                    action={"reject"}
                                    status={"rejected"}
                                    updateUrl={`${process.env.REACT_APP_API_URL}/kycs/${kyc._id}`}
                                    className={
                                      "btn btn--warning btn--shadow w-100 btn-lg center"
                                    }
                                    icon={"las la-user-times"}
                                    setIsLoading={setIsLoading}
                                    redirectTo={"kycs"}
                                  />
                                </div>
                                {kyc.status === "rejected" ? (
                                  <div className="flex-fill">
                                    <PageModal
                                      title={"Delete KYC"}
                                      content={
                                        "This users KYC will be deleted. Are you sure you want to delete this KYC?"
                                      }
                                      action={"delete"}
                                      updateUrl={`${process.env.REACT_APP_API_URL}/kycs/${kyc._id}`}
                                      className={
                                        "btn btn--primary btn--shadow w-100 btn-lg center"
                                      }
                                      icon={"las la-user-slash"}
                                      setIsLoading={setIsLoading}
                                      redirectTo={"kycs"}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row center mt-5">
                            <p>
                              This KYC has been{" "}
                              {kyc.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

          
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default KycDetails;
