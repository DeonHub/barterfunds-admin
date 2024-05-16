import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from "../withGlobalState";
import Loader from "../components/Loader";
import axios from "axios";


const Kycs = ({ globalState, setGlobalState }) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(true);
  const [kycs, setKycs] = useState([]);

  const API_URL = globalState.api_url;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    document.title = "View KYCs | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate('/login');
      return;
    }


    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${API_URL}/kycs`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setKycs(response.data.kycs);
          setIsLoading(false);
          // if(response.data.currencies === globalState.currencies){
          //   setCurrencies(globalState.currencies )
          // } else{
          //   setCurrencies(response.data.currencies)
          //   setGlobalState((prevState) => ({
          //     ...prevState,
          //     currencies: response.data.currencies
          //   }));
          // }
        } else {
          setKycs([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = kycs.filter((kyc) =>
    kyc.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kyc.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Get the data for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
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

    hours = hours % 12 || 12; // Convert hours from 24-hour to 12-hour format
    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes} ${amPM}`;
  };


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"kyc"} />
      <AdminHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="body-wrapper">
          <div className="bodywrapper__inner">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="page-title">All KYCs</h6>

              <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
                <div className="input-group w-auto flex-fill">
                  <input
                    type="search"
                    name="search"
                    className="form-control bg--white text-white"
                    placeholder="Username / Email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn--primary" type="submit">
                    <i className="la la-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="card b-radius--10 ">
                  <div className="card-body p-0">
                    <div className="table-responsive--md  table-responsive">
                      <table
                        className="table table--light style--two table-responsive"
                        id="users"
                      >
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Email/Phone</th>
                            <th>Country</th>
                            <th>Added At</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData.length === 0 ? (
                            <tr>
                              <td colSpan="3">No data</td>{" "}
                            </tr>
                          ) : (
                            currentPageData.map((kyc) => (
                              <tr key={kyc._id}>
                                <td>
                                  <span className="fw-bold">
                                    {kyc.firstname} {kyc.surname}
                                  </span>
                                  <br />
                                  <span className="small">
                                  {kyc.userId.status === "active" ? (
                                    <span className="badge badge--success">
                                      Active
                                    </span>
                                  ) : kyc.userId.status === "blocked" ? (
                                    <span className="badge badge--warning">
                                      Blocked
                                    </span>
                                  ) : (
                                    <span className="badge badge--danger">
                                      Inactive
                                    </span>
                                  )}
                                  </span>
                                </td>
                                <td>
                                  {kyc.email}
                                  <br />
                                  {kyc.contact}
                                </td>
                                <td>
                                  <span className="fw-bold" title="Somalia">
                                    {kyc.country}
                                  </span>
                                </td>
                                <td>
                                  {formatDate(kyc.createdAt)} <br />
                                  {formatTime(kyc.createdAt)}
                                </td>
                                <td>
                                  {kyc.status === "approved" ? (
                                    <span className="badge badge--success">
                                      Approved
                                    </span>
                                  ) : kyc.status === "pending" ? (
                                    <span className="badge badge--warning">
                                      Pending
                                    </span>
                                  ) : (
                                    <span className="badge badge--danger">
                                      Rejected
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href={`${process.env.REACT_APP_PUBLIC_URL}/admin/kycs/${kyc._id}`}
                                    className="btn btn-sm btn-outline--primary"
                                  >
                                    <i className="las la-desktop" />
                                    Details
                                  </a>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {currentPageData.length === 0 ? (
                    <p></p>
                  ) : (
                    <div className="card-footer py-4">
                      <nav>
                        <ul className="pagination">
                          <li
                            className="page-item"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <button
                              className="page-link"
                              disabled={currentPage === 1}
                            >
                              «
                            </button>
                          </li>
                          {[...Array(totalPages)].map((_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                index + 1 === currentPage ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className="page-item"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <button
                              className="page-link"
                              disabled={currentPage === totalPages}
                            >
                              »
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withGlobalState(Kycs);
