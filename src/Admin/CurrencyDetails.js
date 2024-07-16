import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import axios from "axios";
import OpenModal from "../components/OpenModal";
import Loader from "../components/Loader";

const CurrencyDetails = () => {
  const navigate = useNavigate();
  const { currencyId } = useParams();
  const [currency, setCurrency] = useState({});
  // const API_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    document.title = "Currency Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/currencies/${currencyId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.user)
          setCurrency(response.data.currency);
          setIsLoading(false);
          // setGlobalState((prevState) => ({
          //   ...prevState,
          //   currencies: response.data.currencies
          // }));
          // console.log(JSON.stringify(response.data))
        } else {
          setCurrency({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, [navigate, currencyId]);

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

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'currency'}/>
      <AdminHeader />
      <>
      {isLoading ? <Loader /> : (
        <div className="body-wrapper">
        <div className="bodywrapper__inner">
          <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
            <h6 className="page-title">Currency #1234567890</h6>
            <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
              <button
                onClick={handleBack}
                className="btn btn-sm btn-outline--primary"
              >
                <i className="la la-undo" /> Back
              </button>
              
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
      
            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Currency Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Currency Name</span>
                      <span className="d-block fw-bold">{currency.currencyName}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Currency Logo</span>
                      <span className="d-block fw-bold">
                        <img style={{ width: '30%', float: 'right'}} src={currency.currencyLogo} alt="logo" />
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Currency Code</span>
                      <span className="d-block fw-bold">{currency.currencyCode}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Currency Wallet Address</span>
                      <span className="d-block fw-bold">{currency.walletAddress}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Exchange Rate</span>
                      <span className="d-block">1.00 USD = {formatCurrency(currency.exchangeRate)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Reserve Amount</span>
                      <span className="d-block">{formatCurrency(currency.reserveAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Rate Show</span>
                      <span className="d-block">{currency.rateShow ? 'Yes' : 'No'}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Instructions</span>
                      <span className="d-block">{currency.instructions}</span>
                    </li>

                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Date Added</span>
                      <div className="text-end">
                        <span className="d-block">{formatDate(currency.createdAt)}</span>
                        <span>{formatTime(currency.createdAt)}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>

            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Buy Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Available for Buy</span>
                      <span className="d-block fw-bold">{currency.availableForBuy ? 'Yes' : 'No'}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Buy At</span>
                      <span className="d-block">{formatCurrency(currency.buyAt)} GHS</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Minimum Buy Amount</span>
                      <span className="d-block">{formatCurrency(currency.minimumBuyAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Maximum Buy Amount</span>
                      <span className="d-block">{formatCurrency(currency.maximumBuyAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Fixed Charge</span>
                      <span className="d-block">{formatCurrency(currency.buyFixedCharge)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Percent Charge</span>
                      <span className="d-block">{currency.buyPercentCharge}%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Sell Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Available for Sell</span>
                      <span className="d-block fw-bold">{currency.availableForSell ? 'Yes' : 'No'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Sell At</span>
                      <span className="d-block">{formatCurrency(currency.sellAt)} GHS</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Minimum Sell Amount</span>
                      <span className="d-block">{formatCurrency(currency.minimumSellAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Maximum Sell Amount</span>
                      <span className="d-block">{formatCurrency(currency.maximumSellAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Fixed Charge</span>
                      <span className="d-block">{formatCurrency(currency.sellFixedCharge)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Percent Charge</span>
                      <span className="d-block">{currency.sellPercentCharge}%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Send Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Available for Send</span>
                      <span className="d-block fw-bold">{currency.availableForSend ? 'Yes' : 'No'}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Send At</span>
                      <span className="d-block">{formatCurrency(currency.sendAt)} GHS</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Minimum Send Amount</span>
                      <span className="d-block">{formatCurrency(currency.minimumSendAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Maximum Send Amount</span>
                      <span className="d-block">{formatCurrency(currency.maximumSendAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Fixed Charge</span>
                      <span className="d-block">{formatCurrency(currency.sendFixedCharge)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Percent Charge</span>
                      <span className="d-block">{currency.sendPercentCharge}%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <h5 className="card-title">Receive Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Available for Receive</span>
                      <span className="d-block fw-bold">{currency.availableForReceive ? 'Yes' : 'No'}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Receive At</span>
                      <span className="d-block">{formatCurrency(currency.receiveAt)} GHS</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Minimum Receive Amount</span>
                      <span className="d-block">{formatCurrency(currency.minimumReceiveAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Maximum Receive Amount</span>
                      <span className="d-block">{formatCurrency(currency.maximumReceiveAmount)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Fixed Charge</span>
                      <span className="d-block">{formatCurrency(currency.receiveFixedCharge)} GHS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-wrap">
                      <span className="fw-bold">Percent Charge</span>
                      <span className="d-block">{currency.receivePercentCharge}%</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              
      
              <div className="d-flex flex-wrap justify-content-end mb-3 gap-2 mt-5">
                  <a
                                      href={`/admin/currencies/edit-currency/${currency._id}`}
                                      className="btn-refund flex-grow-1"
                                    >
                   <button
                      type="button"
                      className="btn btn--warning btn-sm"
                    >
                      <i className="fas fa-edit" />
                      Edit Currency
                    </button>
                    </a>

                    {currency.status === "active" ? (
                                      <OpenModal
                                        title={`Disable ${currency.currencyName}`}
                                        content={`Are you sure you want to disable ${currency.currencyName}`}
                                        updateUrl={`${process.env.REACT_APP_API_URL}/currencies/${currency._id}`}
                                        status={"inactive"}
                                        action={"Disable Currency"}
                                        setIsLoading={setIsLoading}
                                        extraClass={'btn-block'}
                                      />
                                    ) : (
                                      <OpenModal
                                        title={`Activate ${currency.currencyName}`}
                                        content={`Are you sure you want to activate ${currency.currencyName}`}
                                        updateUrl={`${process.env.REACT_APP_API_URL}/currencies/${currency._id}`}
                                        status={"active"}
                                        action={"Activate Currency"}
                                        setIsLoading={setIsLoading}
                                        extraClass={'btn-block'}
                                      />
                                    )}

                    {/* <button
                      type="button"
                      className="btn--danger btn btn-cancel flex-grow-1"
                    >
                      <i className="fas fa-times-circle" />
                      Cancel Exchange
                    </button> */}
                    
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




export default CurrencyDetails;
