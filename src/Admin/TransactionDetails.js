import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { Image } from "antd";
import axios from "axios";
import PageModal from "../components/PageModal";
import Loader from "../components/Loader";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    document.title = "Transaction Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.user)
          setTransaction(response.data.transaction);
          setIsLoading(false);
          // setGlobalState((prevState) => ({
          //   ...prevState,
          //   currencies: response.data.currencies
          // }));
          // console.log(JSON.stringify(response.data))
        } else {
          setTransaction({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, [navigate, transactionId]);

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

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'transaction'}/>
      <AdminHeader />
      <>
      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
        <div className="bodywrapper__inner">
          <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
            <h6 className="page-title">Transaction #{transaction.transactionId}</h6>
            <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
              <button
                onClick={handleBack}
                className="btn btn-sm btn-outline--primary"
              >
                <i className="la la-undo" /> Back
              </button>
              <button
                onClick={handleBack}
                className="btn btn-sm btn-primary"
              >
                <i className="la la-download" />
                Download
              </button>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
      
            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Transaction Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Transaction ID</span>
                      <span className="d-block fw-bold">{transaction.transactionId}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reference ID</span>
                      <span className="d-block fw-bold">{transaction.referenceId ? transaction.referenceId : 'No Reference ID'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">User Details</span>
                      <span>

                      <span className="">{transaction.userId.firstname} {transaction.userId.surname}</span><br/>
                            <span>
                              <a
                                className="text--primary"
                                href={`/admin/users/details/${transaction.userId._id}`}
                              >
                                <span className="text--primary">@</span>{transaction.userId.username}
                              </a>
                            </span>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Transaction Type</span>
                      <div className="text-end">
                      <span className="d-block">{capitalizeFirstLetter(transaction.transactionType)}</span>
                      <span>
                              <a
                                className="text--primary"
                                href={`/admin/currencies/details/${transaction.userId._id}`}
                              >
                                <span className="text--primary"></span>{transaction.currencyId ? transaction.currencyId.currencyName : 'Bitcoin (BTC)'}
                              </a>
                            </span>
                            
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Total Amount</span>
                      <div className="text-end">
                      <span className="d-block fw-bold">{formatCurrency(transaction.amountGhs)} GHS</span>
                            <span className="d-block fw-bold">{formatCurrency(transaction.amountUsd)} USD</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Payment Method</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{formatPaymentMethod(transaction.paymentMethod)}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Payment Number</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{transaction.paymentNumber ? transaction.paymentNumber : 'User Wallet Address'}</span>
                      </div>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reciepient Method</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{transaction.walletAddress ? 'User Wallet': formatPaymentMethod(transaction.receipientMethod)}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reciepient Number</span>
                      <div className="text-end">
                            <span className="d-block fw-bold">{transaction.walletAddress ? transaction.walletAddress : transaction.receipientNumber}</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold"> Status</span>
                      <div className="text-end">
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
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Action</span>
                      <div className="text-end">
                      <span className="">{transaction.action}</span>
                      </div>
                    </li>
                    
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Transaction Date</span>
                      <div className="text-end">
                        <span className="d-block">{formatDate(transaction.createdAt)}</span>
                        <span>{formatTime(transaction.createdAt)}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {transaction.paymentProof ? (
                <div className="card b-radius--10 overflow-hidden box--shadow1 mt-3">
                <div className="card-header text-center">
                  <h5>Transaction Proof</h5>
                </div>
                <div className="card-body">
                  <Image src={transaction.paymentProof} />
                  
                </div>
              </div>
              ) : (
                ''
              )}
              
              {transaction.status === 'pending' && (
                <div className="d-flex flex-wrap justify-content-end mb-3 gap-2 mt-5">
                <PageModal
                  title={"Confirm Payment"}
                  content={
                    "This transaction's payment will be confirmed. Are you sure you want to confirm payment?"
                  }
                  action={"Transaction's payment confirmed."}
                  status={"pending"}
                  updateUrl={`${process.env.REACT_APP_API_URL}/transactions/${transaction._id}`}
                  className={
                    "btn btn--warning btn-refund flex-grow-1"
                  }
                  icon={"fas fa-check-circle"}
                  setIsLoading={setIsLoading}
                  redirectTo={"transactions"}
                
                />
  
  <PageModal
                  title={"Approve Transaction"}
                  content={
                    "This transaction will be approved successfully. Are you sure you want to approve transaction?"
                  }
                  action={"Transaction succefully approved."}
                  status={"success"}
                  updateUrl={`${process.env.REACT_APP_API_URL}/transactions/${transaction._id}`}
                  className={
                    "btn btn--success btn-approved flex-grow-1"
                  }
                  icon={"fas fa-check"}
                  setIsLoading={setIsLoading}
                  redirectTo={"transactions"}
                
                />
  
  <PageModal
                  title={"Cancel Transaction"}
                  content={
                    "This transaction will be cancelled. Are you sure you want to cancel this transaction?"
                  }
                  action={"Transaction has been cancelled."}
                  status={"cancelled"}
                  updateUrl={`${process.env.REACT_APP_API_URL}/transactions/${transaction._id}`}
                  className={
                    "btn--danger btn btn-cancel flex-grow-1"
                  }
                  icon={"fas fa-times-circle"}
                  setIsLoading={setIsLoading}
                  redirectTo={"transactions"}
                
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




export default TransactionDetails;
