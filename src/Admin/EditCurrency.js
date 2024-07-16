import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import axios from "axios";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import TextInput from "../components/TextInput";
import openNotification from "../components/OpenNotification";
import Loader from "../components/Loader";

const EditCurrency = () => {
  const navigate = useNavigate();
  const { currencyId } = useParams();
  const [currency, setCurrency] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [formData, setFormData] = useState({
  //   currencyName: "",
  //   currencyLogo: "",
  //   currencyCode: "",
  //   paymentGateway: "",
  //   buyAt: "",
  //   sellAt: "",
  //   sendAt: "",
  //   receiveAt: "",
  //   exchangeRate: "",
  //   reserveAmount: "",
  //   availableForSell: false,
  //   availableForBuy: false,
  //   rateShow: false,
  //   availableForSend: false,
  //   availableForReceive: false,
  //   minimumBuyAmount: "",
  //   maximumBuyAmount: "",
  //   buyFixedCharge: "",
  //   buyPercentCharge: "",
  //   minimumSellAmount: "",
  //   maximumSellAmount: "",
  //   sellFixedCharge: "",
  //   sellPercentCharge: "",
  //   minimumSendAmount: "",
  //   maximumSendAmount: "",
  //   sendFixedCharge: "",
  //   sendPercentCharge: "",
  //   minimumReceiveAmount: "",
  //   maximumReceiveAmount: "",
  //   receiveFixedCharge: "",
  //   receivePercentCharge: "",
  //   instructions: "",
  // });

  useEffect(() => {
    document.title = "Edit Currency | BarterFunds";
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
          setCurrency(response.data.currency);
          setIsLoading(false)
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Check if the event target is a checkbox or select element
    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value;

    // Update currency state based on the name of the input field
    setCurrency((prevCurrency) => ({
      ...prevCurrency,
      [name]: newValue,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    const token = window.sessionStorage.getItem("token");

    const body = new FormData();
    for (const key in currency) {
      body.append(key, currency[key]);
    }
    // Example: Send formDataToSend to server using fetch or axios
    console.log(body);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // console.log(body)

    axios
      .patch(`${process.env.REACT_APP_API_URL}/currencies/${currencyId}`, body, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // setMessage('Login Successfully')
          openNotification(
            "topRight",
            "success",
            "Currency Edit Successful",
            "Currency has been successfully updated. Redirecting to currency list page."
          );

          setTimeout(() => {
            window.location.href = `/admin/currencies`;
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );

        console.log("error :>> ", error.response.data.message);
      });
  };


  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"currency"} />
      <AdminHeader />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="body-wrapper">
            <div className="bodywrapper__inner">
              <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
                <h6 className="page-title">Edit Currency</h6>
                <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
                  <button
                    onClick={handleBack}
                    className="btn btn-sm btn-outline--primary"
                  >
                    <i className="la la-undo" /> Back
                  </button>
                </div>
              </div>
              <form encType="multipart/form-data">
                <div className="row gy-4">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row justify-content-center">
                          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                            <div className="thumb mb-2">
                              <div className="avatar-preview">
                                <div
                                  className="profilePicPreview"
                                  style={{
                                    backgroundImage: `url('${currency.currencyLogo}')`,
                                  }}
                                ></div>
                              </div>
                              <div className="avatar-edit">
                                <input
                                  type="file"
                                  name="currencyLogo"
                                  className="profilePicUpload"
                                  id="image"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={handleChange}
                                />
                                <label htmlFor="image" className="bg--primary">
                                  <i className="la la-pencil" />
                                </label>
                              </div>
                            </div>
                            <small className="mt-3 text-muted text--small">
                              Supported files: <b>png, jpeg,jpg.</b>
                              Image will be resized into 400x400 px{" "}
                            </small>
                          </div>
                          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-9">
                            <div className="row">
                              <div className="col-xxl-4 col-sm-12">
                                <div className="form-group">
                                  <TextInput
                                    placeholder={"Enter currency name"}
                                    label={"Currency Name"}
                                    inputname={"currencyName"}
                                    inputtype={"text"}
                                    onValueChange={handleChange}
                                    value={currency.currencyName}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-12">
                                <div className="form-group">
                                  <TextInput
                                    placeholder={"Enter currency wallet address"}
                                    label={"Currency Wallet Address"}
                                    inputname={"walletAddress"}
                                    inputtype={"text"}
                                    onValueChange={handleChange}
                                    value={currency.walletAddress}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <TextInput
                                    placeholder={"Enter currency shortcode"}
                                    label={"Currency shortcode"}
                                    inputname={"currencyCode"}
                                    inputtype={"text"}
                                    onValueChange={handleChange}
                                    value={currency.currencyCode}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label> Payment Gateway</label>{" "}
                                  <i
                                    className="la la-info-circle"
                                    title="User will send the money by this payment gateway."
                                  />
                                  <select
                                    name="paymentGateway"
                                    className="form-control"
                                    onChange={handleChange}
                                  >
                                    <option value="">
                                      -------------------
                                    </option>
                                    <option
                                      value="Manual"
                                      selected={
                                        currency.paymentGateway === "Manual"
                                      }
                                    >
                                      Manual
                                    </option>

                                    <option
                                      value="Paypal"
                                      selected={
                                        currency.paymentGateway === "Paypal"
                                      }
                                    >
                                      Paypal
                                    </option>
                                    <option
                                      value="Perfect Money"
                                      selected={
                                        currency.paymentGateway ===
                                        "Perfect Money"
                                      }
                                    >
                                      Perfect Money
                                    </option>
                                    <option value="Stripe Hosted">
                                      Stripe Hosted
                                    </option>
                                    <option value="Skrill">Skrill</option>
                                    <option value="PayTM">PayTM</option>
                                    <option value="Payeer">Payeer</option>
                                    <option value="PayStack">PayStack</option>
                                    <option value="VoguePay">VoguePay</option>
                                    <option value="Flutterwave">
                                      Flutterwave
                                    </option>
                                    <option value="RazorPay">RazorPay</option>
                                    <option value="Stripe Storefront">
                                      Stripe Storefront
                                    </option>
                                    <option value="Instamojo">Instamojo</option>
                                    <option value="Blockchain">
                                      Blockchain
                                    </option>
                                    <option value="NMI">NMI</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label>Buy At</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      step="any"
                                      className="form-control"
                                      name="buyAt"
                                      onChange={handleChange}
                                      value={currency.buyAt || 0}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label> Sell At</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      step="any"
                                      className="form-control"
                                      name="sellAt"
                                      value={currency.sellAt || 0}
                                      onChange={handleChange}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label>Send At</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      step="any"
                                      className="form-control"
                                      name="sendAt"
                                      value={currency.sendAt || 0}
                                      onChange={handleChange}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label> Receive At</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      step="any"
                                      className="form-control"
                                      name="receiveAt"
                                      value={currency.receiveAt || 0}
                                      onChange={handleChange}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label>Exchange Rate</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="exchangeRate"
                                      value={currency.exchangeRate || 0}
                                      onChange={handleChange}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <label> Reserve Amount</label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      step="any"
                                      className="form-control"
                                      name="reserveAmount"
                                      value={currency.reserveAmount || 0}
                                      onChange={handleChange}
                                    />
                                    <span className="input-group-text">
                                      GHS
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <div>
                                    <input
                                      type="checkbox"
                                      name="availableForBuy"
                                      value="true"
                                      onChange={handleChange}
                                      checked={currency.availableForBuy}
                                    />
                                    <label style={{ marginLeft: "10px" }}>
                                      Available for Buy
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      name="availableForSell"
                                      value="true"
                                      onChange={handleChange}
                                      checked={currency.availableForSell}
                                    />
                                    <label style={{ marginLeft: "10px" }}>
                                      Available for Sell
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      name="rateShow"
                                      value="true"
                                      onChange={handleChange}
                                      checked={currency.rateShow}
                                    />
                                    <label style={{ marginLeft: "10px" }}>
                                      Rate Show
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-sm-6">
                                <div className="form-group">
                                  <div>
                                    <input
                                      type="checkbox"
                                      name="availableForSend"
                                      value="true"
                                      onChange={handleChange}
                                      checked={currency.availableForSend}
                                    />
                                    <label style={{ marginLeft: "10px" }}>
                                      Available for Send
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      name="availableForReceive"
                                      value="true"
                                      onChange={handleChange}
                                      checked={currency.availableForReceive}
                                    />
                                    <label style={{ marginLeft: "10px" }}>
                                      Available for Receive
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="card">
                      <h5 className="card-header bg--warning">
                        Limit &amp; Charge to Buy
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6">
                            <label>Minimum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.minimumBuyAmount || 0}
                                className="form-control rounded"
                                name="minimumBuyAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Maximum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.maximumBuyAmount || 0}
                                className="form-control rounded"
                                name="maximumBuyAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Fixed Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.buyFixedCharge || 0}
                                className="form-control rounded"
                                name="buyFixedCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Percent Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.buyPercentCharge || 0}
                                className="form-control"
                                name="buyPercentCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <div className="input-group-text">%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="card">
                      <h5 className="card-header bg--info">
                        Limit &amp; Charge for Sell
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6">
                            <label>Minimum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.minimumSellAmount || 0}
                                className="form-control rounded"
                                name="minimumSellAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Maximum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.maximumSellAmount || 0}
                                className="form-control rounded"
                                name="maximumSellAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Fixed Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.sellFixedCharge || 0}
                                className="form-control rounded"
                                name="sellFixedCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Percent Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.sellPercentCharge || 0}
                                className="form-control"
                                name="sellPercentCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <div className="input-group-text">%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="card">
                      <h5 className="card-header bg--info">
                        Limit &amp; Charge for Send
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6">
                            <label>Minimum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.minimumSendAmount || 0}
                                className="form-control rounded"
                                name="minimumSendAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Maximum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.maximumSendAmount || 0}
                                className="form-control rounded"
                                name="maximumSendAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Fixed Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.sendFixedCharge || 0}
                                className="form-control rounded"
                                name="sendFixedCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Percent Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.sendPercentCharge || 0}
                                className="form-control"
                                name="sendPercentCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <div className="input-group-text">%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="card">
                      <h5 className="card-header bg--warning">
                        Limit &amp; Charge to Receive
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6">
                            <label>Minimum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.minimumReceiveAmount || 0}
                                className="form-control rounded"
                                name="minimumReceiveAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Maximum Amount</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.maximumReceiveAmount || 0}
                                className="form-control rounded"
                                name="maximumReceiveAmount"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Fixed Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.receiveFixedCharge || 0}
                                className="form-control rounded"
                                name="receiveFixedCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <span className="input-group-text">GHS</span>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>Percent Charge</label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={currency.receivePercentCharge || 0}
                                className="form-control"
                                name="receivePercentCharge"
                                required=""
                                onChange={handleChange}
                              />
                              <div className="input-group-text">%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forManualGateway my-4">
                  <div className="card">
                    <h5 className="card-header">
                      Instruction{" "}
                      <i
                        className="fa fa-info-circle text--primary"
                        title="Write the payment instruction here. Users will see the instruction while exchanging money."
                      />
                    </h5>
                    <div className="card-body">
                      <div className="form-group">
                        <textarea
                          rows={8}
                          className="form-control nicEdit"
                          name="instructions"
                          onChange={handleChange}
                          value={currency.instructions}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn--primary w-100 h-45 center"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default EditCurrency;
