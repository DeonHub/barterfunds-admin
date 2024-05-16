import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';





class WithdrawalDetails extends React.Component {
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
        <AdminSidebar active={'withdrawal'}/>
        <AdminHeader />
        <>
  <div className="body-wrapper">
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Michael Withdraw Requested 8,900.00 GHS</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins"></div>
      </div>
      <div className="row mb-none-30">
        <div className="col-lg-4 col-md-4 mb-30">
          <div className="card b-radius--10 overflow-hidden box--shadow1">
            <div className="card-body">
              <h5 className="mb-20 text-muted">Withdraw Via Mobile Money</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Date <span className="fw-bold">2024-02-23 08:26 AM</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Trx Number <span className="fw-bold">R8VEZF14QQ7Q</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Username{" "}
                  <span className="fw-bold">
                    <a href="../../admin/users/detail/20">meekynerd</a>
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Withdraw Amount <span className="fw-bold">8,900.00 GHS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Method <span className="fw-bold">Mobile Money</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Amount <span className="fw-bold">102.83 GHS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Charge <span className="fw-bold">1.51 GHS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  After Charge <span className="fw-bold">101.32 GHS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Payable <span className="fw-bold">101.32 GHS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Status <span className="badge badge--warning">Pending</span>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 mb-30">
          <div className="card b-radius--10 overflow-hidden box--shadow1">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-2">
                User Withdraw Information
              </h5>
              <div className="row mt-4">
                <div className="col-md-12">
                  <button
                    className="btn btn-outline--success ms-1 approveBtn"
                    data-id={33}
                    data-amount="102.83 USD"
                  >
                    <i className="fas la-check" /> Approve{" "}
                  </button>
                  <button
                    className="btn btn-outline--danger ms-1 rejectBtn"
                    data-id={33}
                  >
                    <i className="fas fa-ban" /> Reject{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="approveModal" className="modal fade" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Approve Withdrawal Confirmation</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="las la-times" />
              </button>
            </div>
            <form action="../../admin/withdraw/approve" method="POST">
              <input
                type="hidden"
                name="_token"
                defaultValue="E6VfIKYhkOrK7AbIz100xrYSi12cX4lyZLsKfwsE"
              />
              <input type="hidden" name="id" />
              <div className="modal-body">
                <p>
                  Have you sent{" "}
                  <span className="fw-bold withdraw-amount text-success" />?
                </p>
                <p className="withdraw-detail" />
                <textarea
                  name="details"
                  className="form-control pt-3"
                  value=""
                  rows={3}
                  placeholder="Provide the details. eg: transaction number"
                  required=""
                  defaultValue={""}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn--primary w-100 h-45">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="rejectModal" className="modal fade" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reject Withdrawal Confirmation</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="las la-times" />
              </button>
            </div>
            <form action="../../admin/withdraw/reject" method="POST">
              <input
                type="hidden"
                name="_token"
                defaultValue="E6VfIKYhkOrK7AbIz100xrYSi12cX4lyZLsKfwsE"
              />
              <input type="hidden" name="id" />
              <div className="modal-body">
                <div className="form-group">
                  <label>Reason of Rejection</label>
                  <textarea
                    name="details"
                    className="form-control pt-3"
                    rows={3}
                    value=""
                    required=""
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn--primary w-100 h-45">
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


export default WithdrawalDetails;
