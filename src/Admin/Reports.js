import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";



const Reports = () => {


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'report'}/>
      <AdminHeader />
      <>
<div className="body-wrapper">
  <div className="bodywrapper__inner">

  <div className="d-flex justify-content-between align-items-center">
          <h6 className="page-title">Activity Log</h6>
          

          <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
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
          </div>
        </div>

    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card b-radius--10 ">
          <div className="card-body p-0">
            <div className="table-responsive--sm table-responsive">
              <table className="table table--light style--two">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Login at</th>
                    <th>IP</th>
                    <th>Location</th>
                    <th>Browser | OS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="fw-bold">Yoush Ljdjd</span>
                      <br />
                      <span className="small">
                        {" "}
                        <a href="/">
                          <span>@</span>gamegon
                        </a>
                      </span>
                    </td>
                    <td>
                      2023-07-26 09:17 AM <br />1 hour ago
                    </td>
                    <td>
                      <span className="fw-bold">
                        <a href="/">
                          202.134.8.142
                        </a>
                      </span>
                    </td>
                    <td>
                      Dhaka <br />
                      Bangladesh
                    </td>
                    <td>
                      Handheld Browser <br />
                      Android
                    </td>
                  </tr>
                  
                </tbody>
              </table>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</>

      
      

    </div>

  );
}



export default Reports;
