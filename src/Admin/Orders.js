import React, { useEffect, useState } from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";


const Orders = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(20);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const [data, setData] = useState({})
  const userId = searchParams.get('userId');


  useEffect(() => {
    document.title = "Orders | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/orders${userId ? `/x/user/${userId}` : ''}`;

    
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
          // console.log(response.data)
          const sortedOrders = response.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
          setCount(response.data.count);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setOrders([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.search, navigate, userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const filteredData = orders.filter(
    (order) =>
      order.action
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || order.orderId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || order.userId.username
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'order'}/>
      <AdminHeader />
      <>
      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
          <div className="bodywrapper__inner">

          <div className="d-flex justify-content-between align-items-center">
                  <h6 className="page-title">Orders Log</h6>
                  <input type="hidden" value={count} />
                  <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
                  <div className="input-group w-auto flex-fill">
                        <input
                          type="search"
                          name="search"
                          className="form-control bg--white text-white"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <button className="btn btn--primary" type="submit">
                          <i className="la la-search" />
                        </button>
                      </div>
                  </div>
                </div>


            <div className="row justify-content-center mt-3">
              <div className="col-xl-4 col-sm-6 mb-30">
                <div className="widget-two box--shadow2 has-link b-radius--5 bg--success">
                  {/* <a href="../../admin/withdraw/approved" className="item-link" /> */}
                  <div className="widget-two__content">
                    <h2 className="text-white">GHS {formatCurrency(data?.totalApprovedOrders || 0)}</h2>
                    <p className="text-white">Approved Withdrawals</p>
                  </div>
                </div>
                {/* widget-two end */}
              </div>
              <div className="col-xl-4 col-sm-6 mb-30">
                <div className="widget-two box--shadow2 has-link b-radius--5 bg--6">
                  {/* <a href="../../admin/withdraw/pending" className="item-link" /> */}
                  <div className="widget-two__content">
                    <h2 className="text-white">GHS {formatCurrency(data?.totalPendingOrders || 0)}</h2>
                    <p className="text-white">Pending Withdrawals</p>
                  </div>
                </div>
                {/* widget-two end */}
              </div>
              <div className="col-xl-4 col-sm-6 mb-30">
                <div className="widget-two box--shadow2 b-radius--5 has-link bg--pink">
                  {/* <a href="../../admin/withdraw/rejected" className="item-link" /> */}
                  <div className="widget-two__content">
                    <h2 className="text-white">GHS {formatCurrency(data?.totalFailedOrders || 0)}</h2>
                    <p className="text-white">Rejected Withdrawals</p>
                  </div>
                </div>
                {/* widget-two end */}
              </div>
              <div className="col-lg-12">
                <div className="card b-radius--10 ">
                  <div className="card-body p-0">
                    <div className="table-responsive--sm table-responsive">
                      <table className="table table--light style--two">
                        <thead>
                          <tr>
                          <th>Order ID</th>
                          <th>User Details</th>
                          <th>Amount</th>
                          <th>Balance</th>
                          <th>Order Date</th>
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
                            currentPageData.map((order) => (
                              <tr>
                          <td>
                          <div className="user">
                                      <span className="name fw-bold">
                                        {order.orderId}<br/>
                                        <small className="text--primary">
                              {capitalizeFirstLetter(order.action)}
                            </small>
                                      </span>
                                      
                                    </div>
                            
                           
                          </td>
                          <td>
                            <span className="d-block">{order.userId.firstname} {order.userId.surname}</span>
                            <span>
                              
                              <a
                                className="text--primary"
                                href={`/admin/users/details/${order.userId._id}`}
                              >
                                <span className="text--primary">@</span>{order.userId.username}
                              </a>
                            </span>
                          </td>
                          
                          <td>
                            <span className="d-block">{formatCurrency(order.amountGhs)} GHS</span>
                            {/* <span>{formatCurrency(order.amountUsd)} USD</span> */}
                          </td>

                          <td>
                            <span className="d-block">{formatCurrency(order.balanceGhs)} GHS</span>
                            {/* <span>{formatCurrency(order.balanceUsd)} USD</span> */}
                          </td>

                          <td>
                            <span className="d-block">{formatDate(order.createdAt)}</span>
                            <span>{formatTime(order.createdAt)}</span>
                          </td>
                          
                          <td>
                                  {order.status === "success" ? (
                                    <span className="badge badge--success">
                                      Success
                                    </span>
                                  ) : order.status === "pending" ? (
                                    <span className="badge badge--primary">
                                      Pending
                                    </span>
                                  ) : order.status === "cancelled" ? (
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
                              href={`/admin/orders/details/${order._id}`}
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

</>

      
      

    </div>

  );
}




export default Orders;
