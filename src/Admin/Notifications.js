import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";



const Notifications = () => {
  return (
    <div className="page-wrapper default-version">
    <AdminSidebar active={'dashboard'}/>
    <AdminHeader />
    <>
<div className="body-wrapper">
<div className="bodywrapper__inner">
  <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
    <h6 className="page-title">Notification History</h6>
    <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
      <form action="" method="GET" className="d-flex flex-wrap sea gap-2">
        <div className="input-group w-auto flex-fill">
          <input
            type="search"
            name="search"
            className="form-control bg--white"
            placeholder="Search Username"
            defaultValue=""
          />
          <button className="btn btn--primary" type="submit">
            <i className="la la-search" />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-12">
      <div className="card b-radius--10 ">
        <div className="card-body p-0">
          <div className="table-responsive--sm table-responsive">
            <table className="table table--light style--two">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Sent</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted text-center" colSpan="100%">
                    Data not found
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
    className="modal fade"
    id="notifyDetailModal"
    tabIndex={-1}
    aria-labelledby="notifyDetailModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="notifyDetailModalLabel">
            Notification Details
          </h5>
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="las la-times" />
          </button>
        </div>
        <div className="modal-body">
          <h3 className="text-center mb-3">
            To: <span className="sent_to" />
          </h3>
          <div className="detail" />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</>

    
    

  </div>

  );
};


export default Notifications;
