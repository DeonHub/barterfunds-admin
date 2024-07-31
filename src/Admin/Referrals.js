import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import axios from "axios";
import Loader from "../components/Loader";


const Referrals = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    document.title = "Referrals | BarterFunds";
    const token = window.sessionStorage.getItem("token");


    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/referrals`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.referrals)
          const sortedTickets = response.data.referrals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setReferrals(sortedTickets);
          // console.log(response.data.tickets);
          setIsLoading(false);
        } else {
          setReferrals([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const filteredData = referrals.filter(
    (referral) =>
      referral.referrer.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || referral.referrer.surname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || referral.referee.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || referral.referee.surname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) 
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const totalPages = 10;

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

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes} ${amPM}`;
  };


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'referral'}/>
      <AdminHeader />
      <>
{isLoading ? <Loader /> : (
<div className="body-wrapper">
  <div className="bodywrapper__inner">

  <div className="d-flex justify-content-between align-items-center">
                <h6 className="page-title">Referrals</h6>

                <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
                <div className="input-group w-auto flex-fill">
                      <input
                        type="search"
                        name="search"
                        className="form-control bg--white text-white"
                        placeholder="Enter search term..."
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
                    <table className="table table--light">
                      <thead>
                        <tr>
                    <th>Referee</th>
                    <th>Referrer</th>
                    {/* <th>Referal Code</th> */}
                    <th>Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.length === 0 ? (
                            <tr>
                              <td colSpan="8">No data</td>{" "}
                            </tr>
                          ) : (
                            currentPageData.map((referral) => (
                      <tr>
                        <td>
                            <span className="d-block">{referral.referee.firstname} {referral.referee.surname}</span>
                            <span>
                              
                              <a
                                className="text--primary"
                                href={`/admin/users/details/${referral.referee._id}`}
                              >
                                <span className="text--primary">@</span>{referral.referee.username}
                              </a>
                            </span>
                          </td>
                          <td>
                            <span className="d-block">{referral.referrer.firstname} {referral.referrer.surname}</span>
                            <span>
                              
                              <a
                                className="text--primary"
                                href={`/admin/users/details/${referral.referrer._id}`}
                              >
                                <span className="text--primary">@</span>{referral.referrer.username}
                              </a>
                            </span>
                          </td>
                        {/* <td className="text-center">
                        {referral.referralCode}
                        </td> */}
                        <td>
                            <span className="d-block">{formatDate(referral.createdAt)}</span>
                            <span>{formatTime(referral.createdAt)}</span>
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
</>

      
      

    </div>

  );
}





export default Referrals;
