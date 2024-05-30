import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const PaymentGateways = () => {
  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'gateway'}/>
      <AdminHeader />
      <>
<div className="body-wrapper">
  <div className="bodywrapper__inner">

  <div className="d-flex mb-5 justify-content-between align-items-center" >
    <h6 className="page-title">Payment Gateways</h6>
    <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
      <form action="" method="GET" className="d-flex flex-wrap">
        <div className="input-group w-auto flex-fill">
          <input
            type="search"
            name="search"
            className="form-control bg--white text-white"
            placeholder="Search..."
            // value={searchTerm}
            // onChange={handleSearchChange}
          />
          <button className="btn btn--primary" type="submit">
            <i className="la la-search" />
          </button>
        </div>
      </form>
      <a className="btn btn-outline--primary ml-5" style={{ marginLeft: "10px"}} href={`/admin/payment-gateways/create-gateway`}>
        <i className="las la-plus" />
        Add New
      </a>
    </div>
  </div>



    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card b-radius--10 ">
          <div className="card-body p-0">
            <div className="table-responsive--sm table-responsive">
              <table className="table table--light style--two custom-data-table">
                <thead>
                  <tr>
                    <th>Gateway</th>
                    <th>Supported Currency</th>
                    <th>Enabled Currency</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Authorize.net</td>
                    <td>11</td>
                    <td>0</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href={`/admin/payment-gateways/edit-gateway/1234567890`}
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/24"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Blockchain</td>
                    <td>1</td>
                    <td>1</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href="edit/blockchain.html"
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/13"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CoinPayments</td>
                    <td>88</td>
                    <td>1</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href="edit/coinpayments.html"
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/15"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Flutterwave</td>
                    <td>25</td>
                    <td>1</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href="edit/flutterwave.html"
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/9"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Paypal</td>
                    <td>25</td>
                    <td>1</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href="edit/paypal.html"
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/1"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>PayStack</td>
                    <td>2</td>
                    <td>1</td>
                    <td>
                      <span className="badge badge--success">Enabled</span>
                    </td>
                    <td>
                      <div className="button--group">
                        <a
                          href="edit/paystack.html"
                          className="btn btn-sm btn-outline--primary editGatewayBtn"
                        >
                          <i className="la la-pencil" />
                          Edit{" "}
                        </a>
                        <button
                          className="btn btn-sm btn-outline--danger ms-1 confirmationBtn"
                          data-question="Are you sure to disable this gateway?"
                          data-action="status/7"
                        >
                          <i className="la la-eye-slash" />
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* table end */}
            </div>
          </div>
        </div>
        {/* card end */}
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
              defaultValue="KxDaNvaL74hDvDNu2OTjSdmTG4lhYBZNmSxJKPvK"
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


export default PaymentGateways;
