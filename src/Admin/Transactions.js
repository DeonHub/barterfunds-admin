import React, { useEffect, useState } from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { withGlobalState } from "../withGlobalState";
import Loader from "../components/Loader";
import axios from "axios";


const Transactions = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');


  useEffect(() => {
    document.title = "Transactions | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/transactions${userId ? `/x/user/${userId}` : ''}`;

    
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(url, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          const sortedTransactions = response.data.transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(sortedTransactions);
          setCount(response.data.count);
          setIsLoading(false);
        } else {
          setTransactions([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.search]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const filteredData = transactions.filter(
    (transaction) =>
      transaction.transactionType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || transaction.transactionId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || transaction.userId.username
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

  const formatCurrency = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Invalid number";
    }

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'info'; 
      case 'success':
        return 'success'; 
      case 'cancelled':
        return 'warning'; 
      case 'failed':
        return 'danger'; 
      default:
        return '';
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'transaction'}/>
      <AdminHeader />

      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
        <div className="bodywrapper__inner">
      
        <div className="d-flex justify-content-between align-items-center">
                <h6 className="page-title">Transactions</h6>
                
      
                <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
                <div className="input-group w-auto flex-fill">
                      <input
                        type="search"
                        name="search"
                        className="form-control bg--white text-white"
                        placeholder="Transaction ID or Username"
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
                    <table className="table table--light style--two">
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>User</th>
                          <th>Action</th>
                          <th>Amount Paid</th>
                          
                          <th>Transaction Date</th>
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
                            currentPageData.map((transaction) => (
                              <tr>
                          <td>
                          <div className="user">
                                      <div className="thumb">
                                        <img src='/assets/images/currency/btc.png' />
                                      </div>
                                      <span className="name fw-bold">
                                        {transaction.currency ? transaction.currency.currencyName : 'Bitcoin (BTC)' }<br/>
                                        <small className="text-muted fw-bold">
                              {/* {formatDate(transaction.createdAt)} {formatTime(transaction.createdAt)} */}
                              {transaction.transactionId}
                            </small>
                                      </span>
                                      
                                    </div>
                            
                           
                          </td>
                          <td>
                            <span className="d-block">{transaction.userId.firstname} {transaction.userId.surname}</span>
                            <span>
                              
                              <a
                                className="text--primary"
                                href={`${process.env.REACT_APP_PUBLIC_URL}/admin/users/details/${transaction.userId._id}`}
                              >
                                <span className="text--primary">@</span>{transaction.userId.username}
                              </a>
                            </span>
                          </td>
                          <td>
                            <span className="d-block">{capitalizeFirstLetter(transaction.transactionType)}</span>
                            <span className="text--primary">{transaction.currencyId ? transaction.currencyId.currencyName : 'Bitcoin (BTC)'}</span>
                          </td>
                          <td>
                            <span className="d-block">{formatCurrency(transaction.amountGhs)} GHS</span>
                            <span>{formatCurrency(transaction.amountUsd)} USD</span>
                          </td>

                          <td>
                            <span className="d-block">{formatDate(transaction.createdAt)}</span>
                            <span>{formatTime(transaction.createdAt)}</span>
                          </td>
                          
                          <td>
                                  {transaction.status === "success" ? (
                                    <span className="badge badge--success">
                                      Success
                                    </span>
                                  ) : transaction.status === "pending" ? (
                                    <span className="badge badge--primary">
                                      Pending
                                    </span>
                                  ) : transaction.status === "cancelled" ? (
                                    <span className="badge badge--warning">
                                      Cancelled
                                    </span>
                                  ) : (
                                    <span className="badge badge--danger">
                                      Failed
                                    </span>
                                  )}
                                </td>
                          <td>
                            <a
                              href={`${process.env.REACT_APP_PUBLIC_URL}/admin/transactions/details/${transaction._id}`}
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
        {/* bodywrapper__inner end */}
      </div>
      )}
      <>

{/* body-wrapper end */}
</>

      
      

    </div>

  );
}



export default Transactions;
