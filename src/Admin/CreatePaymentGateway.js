import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';






class CreatePaymentGateway extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = new Date().getFullYear();

    this.state = {
    currentYear: currentYear,
    };

  }

  render() {

    return (
      <div className="page-wrapper default-version">
        <AdminSidebar active={'gateway'}/>
        <AdminHeader />
        <>
  <div className="body-wrapper">
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Update Payment Gateway</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <a
            href="javascript:history.back()"
            className="btn btn-sm btn-outline--primary"
          >
            <i className="la la-undo" /> Back
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <form
              action="gateway/automatic/update/120"
              method="POST"
              encType="multipart/form-data"
            >
              <input
                type="hidden"
                name="_token"
                defaultValue="UNzijgbfPpKQOf0c7hJOCc3eMA2Ck8HlQjqS8MD7"
              />
              <input type="hidden" name="alias" defaultValue="Authorize" />
              <input type="hidden" name="description" defaultValue="" />
              <div className="card-body">
                <div className="payment-method-item block-item">
                  <div className="payment-method-header">
                    <div className="content ps-0 w-100">
                      <div className="d-flex justify-content-between">
                        <h3>Authorize.net</h3>
                        <div className="input-group d-flex flex-wrap justify-content-end width-375">
                          <select className="newCurrencyVal ">
                            <option value="">Select currency</option>
                            <option value="USD" data-symbol="USD">
                              USD
                            </option>
                            <option value="CAD" data-symbol="CAD">
                              CAD
                            </option>
                            <option value="CHF" data-symbol="CHF">
                              CHF
                            </option>
                            <option value="DKK" data-symbol="DKK">
                              DKK
                            </option>
                            <option value="EUR" data-symbol="EUR">
                              EUR
                            </option>
                            <option value="GBP" data-symbol="GBP">
                              GBP
                            </option>
                            <option value="NOK" data-symbol="NOK">
                              NOK
                            </option>
                            <option value="PLN" data-symbol="PLN">
                              PLN
                            </option>
                            <option value="SEK" data-symbol="SEK">
                              SEK
                            </option>
                            <option value="AUD" data-symbol="AUD">
                              AUD
                            </option>
                            <option value="NZD" data-symbol="NZD">
                              NZD
                            </option>
                          </select>
                          <button
                            type="button"
                            className="btn btn--primary input-group-text newCurrencyBtn"
                            data-crypto={0}
                            data-name="Authorize.net"
                          >
                            Add new
                          </button>
                        </div>
                      </div>
                      <p />
                    </div>
                  </div>
                  <div className="payment-method-body mt-2">
                    <h4 className="mb-3">Global Setting for Authorize.net</h4>
                    <div className="row">
                      <div className="form-group col-lg-6">
                        <label>Login ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="global[login_id]"
                          defaultValue="59e4P9DBcZv"
                          required=""
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label>Transaction Key</label>
                        <input
                          type="text"
                          className="form-control"
                          name="global[transaction_key]"
                          defaultValue="47x47TJyLw2E7DbR"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* payment-method-item start */}
                {/* payment-method-item end */}
                {/* **new payment-method-item start */}
                <div className="payment-method-item child--item newMethodCurrency d-none">
                  <input
                    disabled=""
                    type="hidden"
                    name="currency[1][symbol]"
                    className="currencySymbol"
                  />
                  <div className="payment-method-header">
                    <div className="content w-100 ps-0">
                      <div className="d-flex justify-content-between">
                        <div className="form-group">
                          <h4 className="mb-3" id="payment_currency_name">
                            Name
                          </h4>
                          <input
                            disabled=""
                            type="text"
                            className="form-control"
                            name="currency[1][name]"
                            required=""
                          />
                        </div>
                        <div className="remove-btn">
                          <button
                            type="button"
                            className="btn btn-danger newCurrencyRemove"
                          >
                            <i className="la la-trash-o me-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-method-body">
                    <div className="row">
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                        <div className="card border--primary mt-2">
                          <h5 className="card-header bg--primary">Range</h5>
                          <div className="card-body">
                            <div className="form-group">
                              <label>Minimum Amount</label>
                              <div className="input-group">
                                <div className="input-group-text">GHS</div>
                                <input
                                  disabled=""
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  name="currency[1][min_amount]"
                                  required=""
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Maximum Amount</label>
                              <div className="input-group">
                                <div className="input-group-text">GHS</div>
                                <input
                                  disabled=""
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  name="currency[1][max_amount]"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                        <div className="card border--primary mt-2">
                          <h5 className="card-header bg--primary">Charge</h5>
                          <div className="card-body">
                            <div className="form-group">
                              <label>Fixed Charge</label>
                              <div className="input-group">
                                <div className="input-group-text">GHS</div>
                                <input
                                  disabled=""
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  name="currency[1][fixed_charge]"
                                  required=""
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Percent Charge</label>
                              <div className="input-group">
                                <div className="input-group-text">%</div>
                                <input
                                  disabled=""
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  name="currency[1][percent_charge]"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                        <div className="card border--primary mt-2">
                          <h5 className="card-header bg--primary">Currency</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Currency</label>
                                  <input
                                    disabled=""
                                    type="step"
                                    className="form-control currencyText border-radius-5"
                                    name="currency[1][currency]"
                                    readOnly=""
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Symbol</label>
                                  <input
                                    disabled=""
                                    type="text"
                                    name="currency[1][symbol]"
                                    className="form-control border-radius-5 symbl"
                                    ata-crypto={0}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Rate</label>
                              <div className="input-group">
                                <span className="input-group-text">
                                  <b>1</b>&nbsp; GHS&nbsp; =
                                </span>
                                <input
                                  disabled=""
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  name="currency[1][rate]"
                                  required=""
                                />
                                <div className="input-group-text">
                                  <span className="currency_symbol" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* **new payment-method-item end */}
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn--primary w-100 h-45">
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        id="confirmationModal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation Alert!</h5>
              <span
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="las la-times" />
              </span>
            </div>
            <form action="" method="POST">
              <input
                type="hidden"
                name="_token"
                defaultValue="UNzijgbfPpKQOf0c7hJOCc3eMA2Ck8HlQjqS8MD7"
              />
              <div className="modal-body">
                <p className="question" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn--dark"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button type="submit" className="btn btn--primary">
                  Yes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* bodywrapper__inner end */}
  </div>
  {/* body-wrapper end */}
</>

        
        

      </div>

    );
  }
}


export default CreatePaymentGateway;
