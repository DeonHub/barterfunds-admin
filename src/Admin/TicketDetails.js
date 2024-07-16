import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import axios from "axios";
import Loader from "../components/Loader";
// import PageModal from "../components/PageModal";
// import { Image } from "antd";
import openNotification from "../components/OpenNotification";


const TicketDetails = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  // const [comments, setComments] = useState("");
  const [fileInputs, setFileInputs] = useState([{ description: '', file: null }]);
  const [message, setMessage] = useState('');

  // const [submitButton, setSubmitButton] = useState(false);

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
      .get(`${process.env.REACT_APP_API_URL}/tickets/${ticketId}`, { headers: headers })
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
  }, [navigate, ticketId, ticket]);

  // const handleChange = (e) => {
  //   setComments(e.target.value);
  //   setSubmitButton(e.target.value.trim().length > 0);
  // };

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

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  const getFileUrl = (filepath) => {
    if (filepath?.startsWith('uploads')) {
      return `${process.env.REACT_APP_API_URL}/${filepath}`;
    }
    return filepath;
  };

  const handleFileInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const newFileInputs = [...fileInputs];
    if (name === 'description') {
      newFileInputs[index].description = value;
    } else if (name === 'file') {
      newFileInputs[index].file = files[0];
    }
    setFileInputs(newFileInputs);
  };

  const addFileInput = () => {
    if (fileInputs.length < 5) {
      setFileInputs([...fileInputs, { description: '', file: null }]);
    } else {
      openNotification(
        "topRight",
        "warning",
        "Maximum file upload",
        "You can only upload up to 5 files."
      );
    }
  }

  const removeFileInput = (index) => {
    const newFileInputs = [...fileInputs];
    newFileInputs.splice(index, 1);
    setFileInputs(newFileInputs);
  };


  const handleOk = () => {
    setIsLoading(true);
    const token = window.sessionStorage.getItem("token");

    if(!message){
      openNotification(
        "topRight",
        "error",
        "Error",
        "Message field cannot be empty."
      );
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('message', message);
    formData.append('role', 'admin');
  
    // Filter out file inputs that have no file selected
    const filesWithDescriptions = fileInputs.filter(input => input.file);
    
    // Check if every file has a corresponding description
    const hasAllDescriptions = filesWithDescriptions.every(input => input.description.trim() !== '');
  
    if (!hasAllDescriptions) {
      openNotification(
        "topRight",
        "error",
        "Error",
        "You need to provide a description for all files."
      );
      setIsLoading(false);
      return;
    }
  
    // Append files and descriptions to the formData
    filesWithDescriptions.forEach((input) => {
      formData.append('files', input.file);
      formData.append('descriptions', input.description);
    });
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
  
    axios.patch(`${process.env.REACT_APP_API_URL}/tickets/x/${ticketId}`, formData, { headers })
      .then((response) => {
        if (response.data.success) {
          openNotification(
            "topRight",
            "success",
            "Ticket reply sent successfully",
            "Your ticket reply has been sent successfully."
          );
          setIsLoading(false);
          setTimeout(() => {
            window.location.href = `/admin/tickets/details/${ticketId}`;
          }, 1000);
        } else {
          openNotification(
            "topRight",
            "error",
            "Error",
            "Failed to reply ticket"
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          "An error occurred while replying the ticket."
        );
        setIsLoading(false);
        console.error(error);
      })

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setMessage(value);
    }
    setSubmitButton(!!message);
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
                <button
                  onClick={handleBack}
                  className="btn btn-sm btn-outline--primary"
                >
                  <i className="la la-undo"></i> Back
                </button>
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
                                href={`/admin/users/details/${ticket.userId._id}`}
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

                    {/* <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Supporting Dcouments</span>
                      <span className="d-block ">{ticket.message}</span>
                    </li> */}

                    { ticket.files.length > 0 ? 
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                        <span className="fw-bold">Supporting Documents</span>
                        <span className=" d-block">
                          {ticket.files.map((file, index) => {
                              return(
                                <span className="">
                                  <a href={getFileUrl(file.path)} target='_blank' key={index} rel="noreferrer">View {file.description}</a>
                                  <br/>
                                  </span>
                              )
                          }) }
                          
                        </span>
                    </li>
                    : '' }
                    
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


            {ticket?.replies?.length > 0 ? (

              <>
               <hr />
                <div className="nk-modal-head mb-1">
                  <h5 className="title">Ticket Replies</h5>
                </div>
                {ticket.replies.map((reply, index) => {
                  return (
                    <div key={index} className={`col-lg-12 mb-1 ${reply.role === 'user' ? "" : "text-end"}`}>
                      <span className="sub-text" style={{ fontWeight: "bold", color: "black" }} >{reply.role === 'user' ? `${ticket.userId.username}` : "BarterFunds"}</span>
                      <span className="caption-text">{reply.message}</span>

                      {reply.files.length > 0 && (
                        <div className="col-lg-12">
                          <span className="sub-text">Supporting Documents</span>
                          <div className="col-lg-12">
                            {reply.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="col-lg-12">
                                <a href={getFileUrl(file.path)} className="text-end" target='_blank' key={index} rel="noreferrer">View {file.description}</a>
                                <br />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : ('')}

                <hr/>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body ">
                    <h6 className="card-title">
                      <div className="row">
                        <div className="col-sm-8 col-md-6">
                          Reply ticket here
                        </div>
                      </div>
                    </h6>

                    <hr />
                    <form>
                      <div className="row ">
                        <div className="col-md-12">
                          <div className="form-group">
                          <textarea
                              className="form-control form-control-lg"
                              placeholder="Enter message here..."
                              name="message"
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>

                    <div className="col-md-12">
                                <div className="form-group">
                                  <div className="form-label-group">
                                    <label className="form-label">
                                      Upload any supporting documents you may have, eg, Payment Screenshot, etc
                                    </label>
                                  </div>
    
                                  {fileInputs.map((input, index) => (
                                    <div key={index} className="form-group">
                                      <div className="form-control-group">
                                        <input
                                          type="text"
                                          name="description"
                                          className="col-md-6 mr-2 form-control-sm"
                                          placeholder='Example: Payment Screenshot...'
                                          value={input.description}
                                          onChange={(e) => handleFileInputChange(index, e)}
                                        />
                                        <input
                                          type="file"
                                          name="file"
                                          className='ml-1 form-control-sm'
                                          onChange={(e) => handleFileInputChange(index, e)}
                                        />
                                        <span
                                          
                                          title="Add file"
                                          className="btn btn--success btn-sm mx-1 text-white"
                                          onClick={addFileInput}
                                        >
                                          <span className="icon material-symbols-outlined">
                                            add
                                          </span>
                                        </span>
                                        {index > 0 && (
                                          <span
                                           
                                            title="Remove file"
                                            className="btn btn--danger btn-sm text-white"
                                            onClick={() => removeFileInput(index)}
                                          >
                                            <span className="icon material-symbols-outlined">
                                              cancel
                                            </span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                    {/* {ticket.feedback ? (
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
                    )} */}

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="d-flex flex-wrap gap-3 mt-4">
                       
                          {/* {ticket.status !== "resolved" && ticket.status !== "closed"  ?  ( */}
                            <div className="flex-fill">
                               <button
                                  type="button"
                                  className="btn btn--success btn--shadow btn-lg center col-12"
                                  onClick={handleOk}
                                  disabled={!submitButton}
                              >
                                  <i className="las la-user-check" />
                                  Reply Ticket
                              </button>

                              {/* <PageModal
                                title={"Resolve Ticket"}
                                content={
                                  "This ticket will be reolved. Are you sure you want to resolve this ticket?"
                                }
                                action={"resolve"}
                                status={"resolved"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/tickets/${ticket._id}`}
                                className={
                                  "btn btn--success btn--shadow btn-lg col-6 center"
                                }
                                icon={"las la-user-check"}
                                setIsLoading={setIsLoading}
                                redirectTo={"tickets"}
                                disabled={!submitButton}
                                // comments={comments}
                              /> */}
                            </div>
                          {/* // ) : (
                          //   ""
                          // )} */}

                          {/* {ticket.status === "resolved" ? (
                            <div className="flex-fill">
                              <PageModal
                                title={"Close Ticket"}
                                content={
                                  "This ticket will be closed. Are you sure you want to close this ticket?"
                                }
                                action={"close"}
                                status={"closed"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/tickets/${ticket._id}`}
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
                          )} */}
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

export default TicketDetails;
