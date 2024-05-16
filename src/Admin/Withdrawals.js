import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';


const Withdrawals = ({}) => {

  const [withdrawals, setWithdrawals] = useState([]);
  const location = useLocation();


  useEffect(() => {
    document.title = "Withdrawals | BarterFunds"
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    if (userId) {
      // Call API to fetch tickets by userId
      console.log("user id provided")
      console.log(`User Id: ${userId}`)
    } else {
      // If userId is not provided, fetch all tickets
      // Call API to fetch all tickets
      // Assuming you have a function getTickets() to fetch all tickets
      console.log("user id not provided")
      
    }
  }, [location.search]);


  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={'withdrawal'}/>
      <AdminHeader />
      <>
<div className="body-wrapper">
  <div className="bodywrapper__inner">

  <div className="d-flex justify-content-between align-items-center">
          <h6 className="page-title">Withdrawals Log</h6>
          

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


    <div className="row justify-content-center mt-3">
      <div className="col-xl-4 col-sm-6 mb-30">
        <div className="widget-two box--shadow2 has-link b-radius--5 bg--success">
          <a href="../../admin/withdraw/approved" className="item-link" />
          <div className="widget-two__content">
            <h2 className="text-white">₵0.00</h2>
            <p className="text-white">Approved Withdrawals</p>
          </div>
        </div>
        {/* widget-two end */}
      </div>
      <div className="col-xl-4 col-sm-6 mb-30">
        <div className="widget-two box--shadow2 has-link b-radius--5 bg--6">
          <a href="../../admin/withdraw/pending" className="item-link" />
          <div className="widget-two__content">
            <h2 className="text-white">₵25,998.00</h2>
            <p className="text-white">Pending Withdrawals</p>
          </div>
        </div>
        {/* widget-two end */}
      </div>
      <div className="col-xl-4 col-sm-6 mb-30">
        <div className="widget-two box--shadow2 b-radius--5 has-link bg--pink">
          <a href="../../admin/withdraw/rejected" className="item-link" />
          <div className="widget-two__content">
            <h2 className="text-white">₵0.00</h2>
            <p className="text-white">Rejected Withdrawals</p>
          </div>
        </div>
        {/* widget-two end */}
      </div>
      <div className="col-lg-12">
        <div className="card b-radius--10 ">
          <div className="card-body p-0">
            <div className="table-responsive--sm table-responsive">
              <table className="table table--light style--two">
                <thead>
                  <tr>
                    <th>Gateway | Transaction</th>
                    <th>Initiated</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Charge</th>
                    <th>Conversion</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="fw-bold">
                        <a href="../../admin/withdraw/log?method=18">
                          Bitcoin
                        </a>
                      </span>
                      <br />
                      <small>M743QDY9E5H2</small>
                    </td>
                    <td>
                      2023-06-28 10:32 AM <br />3 weeks ago
                    </td>
                    <td>
                      <span className="fw-bold">Michael Adzato</span>
                      <br />
                      <span className="small">
                        {" "}
                        <a href="../../admin/withdraw/log?search=Donaldson">
                          <span>@</span>meekynerd
                        </a>
                      </span>
                    </td>
                    <td>1,000.00 GHS</td>
                    <td>
                      <span className="text--danger">1.71 USD</span>
                    </td>
                    <td>
                      1 USD = 95.00 GHS
                      <br />
                      <strong>10.53 USD</strong>
                    </td>
                    <td>
                      <span className="badge badge--warning">Pending</span>
                    </td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_PUBLIC_URL}/admin/withdrawals/details/1234567890`}
                        className="btn btn-sm btn-outline--primary ms-1"
                      >
                        <i className="la la-desktop" />
                        Details{" "}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* card end */}
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




export default Withdrawals;
