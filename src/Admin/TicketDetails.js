import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from "../withGlobalState";
import axios from "axios";
import Loader from "../components/Loader";
import PageModal from "../components/PageModal";
import OpenModal from "../components/OpenModal";
import { Image, Avatar } from "antd";


const TicketDetails = ({ globalState, setGlobalState }) => {
  const navigate = useNavigate();
  // const history = useHistory();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const API_URL = globalState.api_url;
  const [isLoading, setIsLoading] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [comments, setComments] = useState("");

  useEffect(() => {
    document.title = "Ticket Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${API_URL}/tickets/${ticketId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setTicket(response.data.ticket);
          setIsLoading(false);

          ticket.status === "open" || ticket.status === "resolved"
            ? setSubmitButton(true)
            : setSubmitButton(false);
        } else {
          setTicket({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, []);

  const handleChange = (e) => {
    setComments(e.target.value);
    setSubmitButton(e.target.value.trim().length > 0);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPM = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes} ${amPM}`;
  };

  return (
    <div classNameName="page-wrapper default-version">
      <AdminSidebar active={"tickets"} />
      <AdminHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="body-wrapper">
          <div className="bodywrapper__inner">
            <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
              <h6 className="page-title">Support Ticket</h6>
              <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
                <a
                  href="javascript: history.go(-1)"
                  className="btn btn-sm btn-outline--primary"
                >
                  <i className="la la-undo"></i> Back
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card mt-30">
                  <div className="card-header d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
                    <h5 className="card-title mb-0">
                      Ticket #{ticket.ticketId}
                    </h5>
                    <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
                      {ticket.status === "open" ? (
                        <span className="badge badge--primary">Open</span>
                      ) : ticket.status === "resolved" ? (
                        <span className="badge badge--success">Resolved</span>
                      ) : ticket.status === "pending" ? (
                        <span className="badge badge--warning">Pending</span>
                      ) : (
                        <span className="badge badge--danger">Closed</span>
                      )}
                    </div>
                  </div>

                  {/* <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group ">
                            <label>User Issue</label>

                            <textarea
                              className="form-control"
                              rows="5"
                              value={ticket.message}
                              disabled
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {ticket.files.length > 0 ? (
                        <div>
                          <hr />
                          Supporting Document(s)
                          <div class="row mt-4 mb-4">
                            {ticket.files.map((file, index) => (
                              <div
                                className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3"
                                key={index}
                              >
                                <p className="text-bold center mb-3">
                                  {file.description}
                                </p>
                                {file.extension}

                                {file.path.split(".").pop().toLowerCase() ===
                                  "jpg" ||
                                file.path.split(".").pop().toLowerCase() ===
                                  "png" ||
                                file.path.split(".").pop().toLowerCase() ===
                                  "jpeg" ? (
                                  <div className="thumb mb-5">
                                    <div className="avatar-preview center">
                                      <div>
                                        <Image
                                          className="imagePreview"
                                          // width={500}
                                          src={file.path}
                                          style={{
                                            objectFit: "fill",
                                          }}
                                          alt={file.originalName}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <a href={file.path} download>
                                    Download {file.originalName}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>

                    <div className="row bticket bticket--primary bticket-radius-3 my-5 mx-2 center">
                      <div className="col-md-6 bticket-end text-md-end text-start mb-3 mt-3">
                        <p className="my-3">
                          <span>Submitted By:</span>{" "}
                          <span className="text-muted fw-bold">
                            {ticket.userId.firstname} {ticket.userId.surname}
                          </span>
                        </p>

                        <p>
                          <a href={`/admin/users/${ticket.userId._id}`}>
                            <span>@{ticket.userId.username}</span>
                          </a>
                        </p>
                      </div>

                      <div className="col-md-6">
                        <p className="text-muted fw-bold my-3">
                          Submitted on {formatDate(ticket.createdAt)} @{" "}
                          {formatTime(ticket.createdAt)}
                        </p>
                        <p>{ticket.subject}</p>
                      </div>
                    </div>
                  </div> */}

                  <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Ticket ID</span>
                      <span className="d-block fw-bold">{ticket.ticketId}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">User Details</span>
                      <span>

                      <span className="">{ticket.userId.firstname} {ticket.userId.surname}</span><br/>
                            <span>
                              <a
                                className="text--primary"
                                href={`${process.env.REACT_APP_PUBLIC_URL}/admin/users/details/${ticket.userId._id}`}
                              >
                                <span className="text--primary">@</span>{ticket.userId.username}
                              </a>
                            </span>
                      </span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Category</span>
                      <span className="d-block fw-bold">{ticket.category}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Subject</span>
                      <span className="d-block fw-bold">{ticket.subject}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Description</span>
                      <span className="d-block ">{ticket.message}</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Submitted On</span>
                      <div className="text-end">
                        <span className="d-block">{formatDate(ticket.createdAt)}</span>
                        <span>{formatTime(ticket.createdAt)}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                </div>
              </div>
            </div>

            {ticket.files.length > 0 ? (
             
                        <div className="mt-5">
                          
                          <div className="text-bold" style={{ color: '#5b6e88'}}>Supporting Document(s)</div>
                          <div class="row mb-4">
                          
                            {ticket.files.map((file, index) => (
                              <div
                                className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3"
                                key={index}
                              >
                                <p className="text-bold center mb-3">
                                  {file.description}
                                </p>
                                {file.extension}

                                {file.path.split(".").pop().toLowerCase() ===
                                  "jpg" ||
                                file.path.split(".").pop().toLowerCase() ===
                                  "png" ||
                                file.path.split(".").pop().toLowerCase() ===
                                  "jpeg" ? (
                                  <div className="thumb mb-5">
                                    <div className="avatar-preview center">
                                      <div>
                                        <Image
                                          className="imagePreview"
                                          // width={500}
                                          src={file.path}
                                          style={{
                                            objectFit: "fill",
                                          }}
                                          alt={file.originalName}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <a href={file.path} download>
                                    Download {file.originalName}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}


            <hr />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body ">
                    <h6 className="card-title">
                      <div className="row">
                        <div className="col-sm-8 col-md-6">
                          Enter response/comments here
                        </div>
                      </div>
                    </h6>

                    <hr />
                    <form>
                      <div className="row ">
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              name="comments"
                              rows="5"
                              required
                              id="comments"
                              placeholder="Enter your response here..."
                              onChange={handleChange}
                              value={
                                ticket.comments ? ticket.comments : comments
                              }
                              disabled={ticket.status !== "open"}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>

                    {ticket.feedback ? (
                      <div className="row mt-5">
                        <div className="col-md-12">
                          <div className="form-group ">
                            <label>User feedback</label>

                            <textarea
                              className="form-control"
                              rows="5"
                              value={
                                ticket.feedback
                                  ? ticket.feedback
                                  : "No feedback provided"
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="form-group ">
                            <label>User rating</label>
                            <p>{ticket.rating ? ticket.rating : "No rating provided"}</p>
                            </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="d-flex flex-wrap gap-3 mt-4">
                          {ticket.status !== "resolved" && ticket.status !== "closed"  ?  (
                            <div className="flex-fill">
                              <PageModal
                                title={"Resolve Ticket"}
                                content={
                                  "This ticket will be reolved. Are you sure you want to resolve this ticket?"
                                }
                                action={"resolve"}
                                status={"resolved"}
                                updateUrl={`${API_URL}/tickets/${ticket._id}`}
                                className={
                                  "btn btn--success btn--shadow w-100 btn-lg center"
                                }
                                icon={"las la-user-check"}
                                setIsLoading={setIsLoading}
                                redirectTo={"tickets"}
                                disabled={!submitButton}
                                comments={comments}
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          {ticket.status === "resolved" ? (
                            <div className="flex-fill">
                              <PageModal
                                title={"Close Ticket"}
                                content={
                                  "This ticket will be closed. Are you sure you want to close this ticket?"
                                }
                                action={"close"}
                                status={"closed"}
                                updateUrl={`${API_URL}/tickets/${ticket._id}`}
                                className={
                                  "btn btn--primary btn--shadow w-100 btn-lg center"
                                }
                                icon={"las la-user-times"}
                                setIsLoading={setIsLoading}
                                redirectTo={"tickets"}
                             
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
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
};

export default withGlobalState(TicketDetails);
