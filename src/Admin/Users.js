import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import axios from "axios";
import Loader from "../components/Loader";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Users | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users);
          setIsLoading(false);

          // if(response.data.currencies === globalState.currencies){
          //   setUsers(response.data.users)
          // } else{
          //   setUsers(response.data.currencies)
          //   setGlobalState((prevState) => ({
          //     ...prevState,
          //     currencies: response.data.currencies
          //   }));
          // }
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);


  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase())
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
      <AdminSidebar active={"users"} />
      <AdminHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="body-wrapper">
          <div className="bodywrapper__inner">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="page-title">All Users</h6>

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
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Joined At</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData.length === 0 ? (
                            <tr>
                              <td colSpan="8">No data</td>{" "}
                            </tr>
                          ) : (
                            currentPageData.map((user) => (
                              <tr key={user._id}>
                                <td>
                                  <span className="fw-bold">
                                    {user.firstname} {user.surname}
                                  </span>
                                  <br />
                                  <span className="small">
                                    <a href={`users/${user._id}`}>
                                      <span>@</span>
                                      {user.username}
                                    </a>
                                  </span>
                                </td>
                                <td>{user.email}</td>

                                <td>{user.contact}</td>
                                <td>
                                  {formatDate(user.createdAt)} <br />
                                  {formatTime(user.createdAt)}
                                </td>
                                <td>
                                  {user.status === "active" ? (
                                    <span className="badge badge--success">
                                      Active
                                    </span>
                                  ) : user.status === "blocked" ? (
                                    <span className="badge badge--warning">
                                      Blocked
                                    </span>
                                  ) : (
                                    <span className="badge badge--danger">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href={`${process.env.REACT_APP_PUBLIC_URL}/admin/users/details/${user._id}`}
                                    className="btn btn-sm btn-outline--primary"
                                  >
                                    <i className="las la-desktop" />
                                    Details{" "}
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

export default Users;
