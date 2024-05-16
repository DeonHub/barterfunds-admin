import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';





class ReportNotificationTemplateEdit extends React.Component {
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
        <AdminSidebar />
        <AdminHeader />
        <>
  <div className="body-wrapper">
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Approved Exchange</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <a
            href="admin/notification/templates"
            className="btn btn-sm btn-outline--primary"
          >
            <i className="la la-undo" /> Back
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card overflow-hidden">
            <div className="card-body p-0">
              <div className="table-responsive table-responsive--sm">
                <table className="table align-items-center table--light">
                  <thead>
                    <tr>
                      <th>Short Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    <tr>
                      <th>
                        <span className="short-codes">
                          {"{"}
                          {"{"}amount{"}"}
                          {"}"}
                        </span>
                      </th>
                      <td>Amount</td>
                    </tr>
                    <tr>
                      <th>
                        <span className="short-codes">
                          {"{"}
                          {"{"}method{"}"}
                          {"}"}
                        </span>
                      </th>
                      <td>Currency Name</td>
                    </tr>
                    <tr>
                      <th>
                        <span className="short-codes">
                          {"{"}
                          {"{"}exchange{"}"}
                          {"}"}
                        </span>
                      </th>
                      <td>exchange Id</td>
                    </tr>
                    <tr>
                      <th>
                        <span className="short-codes">
                          {"{"}
                          {"{"}currency{"}"}
                          {"}"}
                        </span>
                      </th>
                      <td>Currency</td>
                    </tr>
                    <tr>
                      <th>
                        <span className="short-codes">
                          {"{"}
                          {"{"}admin_transaction_number{"}"}
                          {"}"}
                        </span>
                      </th>
                      <td>Admin Transaction/Wallet Number</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* card end */}
          <h6 className="mt-4 mb-2">Global Short Codes</h6>
          <div className="card overflow-hidden">
            <div className="card-body p-0">
              <div className="table-responsive table-responsive--sm">
                <table className=" table align-items-center table--light">
                  <thead>
                    <tr>
                      <th>Short Code </th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    <tr>
                      <td>
                        <span className="short-codes">
                          {"{"}
                          {"{"}site_name{"}"}
                          {"}"}
                        </span>
                      </td>
                      <td>Name of your site</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="short-codes">
                          {"{"}
                          {"{"}site_currency{"}"}
                          {"}"}
                        </span>
                      </td>
                      <td>Currency of your site</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="short-codes">
                          {"{"}
                          {"{"}currency_symbol{"}"}
                          {"}"}
                        </span>
                      </td>
                      <td>Symbol of currency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="admin/notification/template/update/19" method="post">
        <input
          type="hidden"
          name="_token"
          defaultValue="flFXpoqgX5TqgtkIdw1XgA2WlPLlxFB7Ldeo2CRx"
        />
        <div className="row">
          <div className="col-md-6">
            <div className="card mt-4">
              <div className="card-header bg--primary">
                <h5 className="card-title text-white">Email Template</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Email subject"
                        name="subject"
                        defaultValue="Your Exchange Approved"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        Status <span className="text-danger">*</span>
                      </label>
                      <input
                        type="checkbox"
                        data-height="46px"
                        data-width="100%"
                        data-onstyle="-success"
                        data-offstyle="-danger"
                        data-bs-toggle="toggle"
                        data-on="Send Email"
                        data-off="Don't Send"
                        name="email_status"
                        defaultChecked=""
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="email_body"
                        rows={10}
                        className="form-control nicEdit"
                        placeholder="Your message using short-codes"
                        defaultValue={
                          "<div><b>{{amount}}\n                                                        {{currency}}</b>\n                                                        send in your {{method}}\n                                                        wallet . Your Exchange\n                                                        id\n                                                        {{exchange}}</div>"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mt-4">
              <div className="card-header bg--primary">
                <h5 className="card-title text-white">SMS Template</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Status <span className="text-danger">*</span>
                      </label>
                      <input
                        type="checkbox"
                        data-height="46px"
                        data-width="100%"
                        data-onstyle="-success"
                        data-offstyle="-danger"
                        data-bs-toggle="toggle"
                        data-on="Send SMS"
                        data-off="Don't Send"
                        name="sms_status"
                        defaultChecked=""
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        name="sms_body"
                        rows={10}
                        className="form-control"
                        placeholder="Your message using short-codes"
                        required=""
                        defaultValue={
                          "Your Exchange\n                                                        is Approved. Amount send\n                                                        to your {{amount}}\n                                                        {{currency}} in\n                                                        {{method}} "
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn--primary w-100 h-45 mt-4">
          Submit
        </button>
      </form>
    </div>
    {/* bodywrapper__inner end */}
  </div>
  {/* body-wrapper end */}
</>

        
        

      </div>

    );
  }
}


export default ReportNotificationTemplateEdit;
