import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';






class TransactionDetails extends React.Component {
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
        <AdminSidebar active={'transaction'}/>
        <AdminHeader />
        <>
  <div className="body-wrapper">
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Exchange Details: U69OE15P6HGX</h6>
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
        <div className="col-xl-4 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Sent by user</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>Mobile Money</h5>
                  <small className="text-muted"> Payment Method</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>GHS</h5>
                  <small className="text-muted"> Received Currency</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>5,307.50 GHS</h5>
                  <small className="text-muted"> Amount</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>
                    53.08 GHS
                    <small className="text--small">(1%)</small>
                  </h5>
                  <small className="text-muted"> Percent Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>1.00 GHS</h5>
                  <small className="text-muted"> Fixed Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5 className="text--danger">54.08 GHS</h5>
                  <small className="text-muted"> Total Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>5,361.58 GHS</h5>
                  <small className="text-muted">
                    {" "}
                    Total Admount Sent By User
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-12">
          <div className="card ">
            <div className="card-header">
              <h5 className="card-title">Receivable for User</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>Paypal</h5>
                  <small className="text-muted"> Payment Method</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>USD</h5>
                  <small className="text-muted"> Currency</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>23.35 USD</h5>
                  <small className="text-muted"> Amount</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>
                    0.35 USD
                    <small className="text--small">(1.5%)</small>
                  </h5>
                  <small className="text-muted"> Percent Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>5.00 USD</h5>
                  <small className="text-muted"> Fixed Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5 className="text--danger">5.35 USD</h5>
                  <small className="text-muted"> Total Charge</small>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap flex-column">
                  <h5>18.00 USD</h5>
                  <small className="text-muted">
                    {" "}
                    Receivable Amount for User
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-sm-12">
          <div className="card">
            <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
              <h5 className="card-title">Exchange Information</h5>
              <div className="d-flex flex-wrap justify-content-end mb-3 gap-2">
                <button
                  className="btn btn-outline--success btn-approved flex-grow-1"
                  type="button"
                >
                  <i className="fas fa-check" />
                  Approve Exchange{" "}
                </button>
                <button
                  type="button"
                  className="btn-outline--danger btn btn-cancel flex-grow-1"
                >
                  <i className="fas fa-times" />
                  Cancel Exchange{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-outline--warning btn-refund flex-grow-1"
                >
                  <i className="fas fa-undo" />
                  Refund Exchange{" "}
                </button>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Exchange ID</span>
                  <span>U69OE15P6HGX</span>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> User Name</span>
                  <span>
                    <a
                      className="text--primary"
                      href="../../admin/users/detail/2984"
                    >
                      <span className="text--primary">@</span>
                      109846077076451849121
                    </a>
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Status</span>
                  <div className="text-end">
                    <span className="badge badge--success">Approved</span>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Automatic Payment Status</span>
                  <div className="text-end">
                    <span className="badge badge--success">Completed</span>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Buy Rate</span>
                  <div>
                    <span>0.01</span>
                    <span>GHS</span>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Customer Wallet</span>
                  <span className="fw-bold">customerpaypal@gmail.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between flex-wrap">
                  <span className="fw-bold"> Exchange Time</span>
                  <div className="text-end">
                    <span className="d-block">2024-02-19 09:24 AM</span>
                    <span> 1 day ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card b-radius--10 overflow-hidden box--shadow1 mt-3">
            <div className="card-header text-center">
              <h5>Transaction Proof</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12">
                  <h6>First Name</h6>
                  <p>Richmond</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <h6>Last Name</h6>
                  <p>Opoku Afriyie</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <h6>Email</h6>
                  <p>customerpaypal@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal" className="modal fade" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation Alert!</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="las la-times" />
              </button>
            </div>
            <form action="" method="POST">
              <input
                type="hidden"
                name="_token"
                defaultValue="Cqinm8klUEUfSfUkGVGYaUV54YtHO0zktPS9SRHY"
              />
              <input type="hidden" name="id" defaultValue={1717} />
              <div className="modal-body" />
              <div className="modal-footer">
                <button type="submit" className="btn btn--primary h-45 w-100">
                  Submit
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


export default TransactionDetails;
