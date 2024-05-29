import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from "../withGlobalState";
import { Image, Avatar } from "antd";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import PageModal from "../components/PageModal";
// import OpenModal from "../components/OpenModal";
import Loader from "../components/Loader";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    document.title = "Order Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${API_URL}/orders/${orderId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.user)
          setOrder(response.data.order);
          setIsLoading(false);

        } else {
          setOrder({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, []);

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

  const formatPaymentMethod = (string) => {
    if (string === 'momo'){
      return 'Mobile Money';
    } else if (string === 'bank'){
      return 'Bank Transfer';
    } else if (string === 'credit-card'){
      return 'Credit Card';
    } else if (string === 'wallet'){
      return 'Barter Wallet';
    } else {
      return 'User Wallet'
    }
  }

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'order'}/>
      <AdminHeader />
      <>
      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
        <div className="bodywrapper__inner">
          <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
          <h6 className="page-title">
  {`${order.userId.firstname} ${order.userId.surname} ${order.action === 'deposit' ? 'made a deposit of' : 'requested a withdrawal of'} ${formatCurrency(order.amountGhs)} GHS`}
</h6>

            <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
              <a
                href="javascript: history.go(-1)"
                className="btn btn-sm btn-outline--primary"
              >
                <i className="la la-undo" /> Back
              </a>
              <a
                href="../../admin/exchange/exchange/download/1717"
                className="btn btn-sm btn-primary"
              >
                <i className="la la-download" />
                Download
              </a>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
      
            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Order Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Order ID</span>
                      <span className="d-block fw-bold">{order.orderId}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Order Type</span>
                      <span className="d-block fw-bold">{order.action === 'deposit' ? 'Deposit' : 'Withdrawal'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reference ID</span>
                      <span className="d-block fw-bold">{order.referenceId ? order.referenceId : 'No Reference ID'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">User Details</span>
                      <span>

                      <span className="">{order.userId.firstname} {order.userId.surname}</span><br/>
                            <span>
                              <a
                                className="text--primary"
                                href={`${process.env.REACT_APP_PUBLIC_URL}/admin/users/details/${order.userId._id}`}
                              >
                                <span className="text--primary">@</span>{order.userId.username}
                              </a>
                            </span>
                      </span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Total Amount</span>
                      <div className="text-end">
                      <span className="d-block fw-bold">{formatCurrency(order.amountGhs)} GHS</span>
                            <span className="d-block fw-bold">{formatCurrency(order.amountUsd)} USD</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Balance</span>
                      <div className="text-end">
                      <span className="d-block fw-bold">{formatCurrency(order.balanceGhs)} GHS</span>
                            <span className="d-block fw-bold">{formatCurrency(order.balanceGhs)} USD</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Payment Method</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{formatPaymentMethod(order.paymentMethod)}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Payment Number</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{order.paymentNumber ? order.paymentNumber : 'User Wallet Address'}</span>
                      </div>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reciepient Method</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{order.walletAddress ? 'User Wallet': formatPaymentMethod(order.receipientMethod)}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reciepient Number</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{order.walletAddress ? order.walletAddress : order.receipientNumber}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold"> Status</span>
                      <div className="text-end">
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
                      </div>
                    </li>
                    
                    
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Order Date</span>
                      <div className="text-end">
                        <span className="d-block">{formatDate(order.createdAt)}</span>
                        <span>{formatTime(order.createdAt)}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {order.paymentProof ? (
                <div className="card b-radius--10 overflow-hidden box--shadow1 mt-3">
                <div className="card-header text-center">
                  <h5>Order Proof</h5>
                </div>
                <div className="card-body">
                  <Image src={order.paymentProof} />
                  
                </div>
              </div>
              ) : (
                ''
              )}
              
              {order.status === 'pending' && (
                <div className="d-flex flex-wrap justify-content-end mb-3 gap-2 mt-5">
                
  
  <PageModal
                  title={"Approve Order"}
                  content={
                    "This order will be approved successfully. Are you sure you want to approve order?"
                  }
                  action={order.action}
                  status={"success"}
                  updateUrl={`${API_URL}/orders/${order._id}`}
                  className={
                    "btn btn--success btn-approved flex-grow-1"
                  }
                  icon={"fas fa-check"}
                  setIsLoading={setIsLoading}
                  redirectTo={"orders"}
                
                />
  
  <PageModal
                  title={"Cancel Order"}
                  content={
                    "This order will be cancelled. Are you sure you want to cancel this order?"
                  }
                  action={order.action}
                  status={"cancelled"}
                  updateUrl={`${API_URL}/orders/${order._id}`}
                  className={
                    "btn--danger btn btn-cancel flex-grow-1"
                  }
                  icon={"fas fa-times-circle"}
                  setIsLoading={setIsLoading}
                  redirectTo={"orders"}
                
                />
                      
                      
                     
                    </div>
              )}
              
            </div>
          </div>

        </div>
      </div>
      )}

</>

      
      

    </div>

  );
}




export default OrderDetails;
