import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";



const Transactions = ({}) => {

  const [transactions, setTransactions] = useState([]);
  const location = useLocation();


  useEffect(() => {
    document.title = "Transactions | BarterFunds"
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
      <AdminSidebar active={'transaction'}/>
      <AdminHeader />
      <>
<div className="body-wrapper">
  <div className="bodywrapper__inner">

  <div className="d-flex justify-content-between align-items-center">
          <h6 className="page-title">Transactions</h6>
          

          <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
          <div className="input-group w-auto flex-fill">
                <input
                  type="search"
                  name="search"
                  className="form-control bg--white text-white"
                  placeholder="Transaction ID or Username"
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
            <div className="table-responsive--md  table-responsive">
              <table className="table table--light style--two">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Transaction ID</th>
                    <th>User</th>
                    <th>Received Method</th>
                    <th>Received Amount</th>
                    <th>Send Method</th>
                    <th>Send Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <span className="fw-bold">H8VWGS2HGYNE</span>
                      <br />
                      <small className="text-muted">
                        2023-07-26 09:22 AM
                      </small>
                    </td>
                    <td>
                      <span className="d-block">Michael Adzato</span>
                      <span>
                        <a
                          className="text--primary"
                          href="../../admin/users/detail/2360"
                        >
                          <span className="text--primary">@</span>meekynerd
                        </a>
                      </span>
                    </td>
                    <td>
                      <span className="d-block">Mobile Money</span>
                      <span className="text--primary">GHS</span>
                    </td>
                    <td>
                      <span className="d-block">1,000.00 GHS</span>
                      <span>1,000.00</span> +
                      <span className="text--danger">16.00</span>=
                      <span>1,016.00 GHS</span>
                    </td>
                    <td>
                      <span className="d-block">PayPal</span>
                      <span className="text--primary">USD</span>
                    </td>
                    <td>
                      <span className="d-block">11.58 USD</span>
                      <span>11.58</span> -
                      <span className="text--danger">2.12</span>=
                      <span>9.46 USD</span>
                    </td>
                    <td>
                      {" "}
                      <span className="badge badge--warning">Pending</span>
                    </td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_PUBLIC_URL}/admin/transactions/details/1234567890`}
                        className="btn btn-sm btn-outline--primary"
                      >
                        <i className="las la-desktop" />
                        Details
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer py-4">
            <nav>
              <ul className="pagination">
                <li
                  className="page-item disabled"
                  aria-disabled="true"
                  aria-label="« Previous"
                >
                  <span className="page-link" aria-hidden="true">
                    ‹
                  </span>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=2"
                  >
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=3"
                  >
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=4"
                  >
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=5"
                  >
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=6"
                  >
                    6
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=7"
                  >
                    7
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=8"
                  >
                    8
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=9"
                  >
                    9
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=10"
                  >
                    10
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="../../admin/exchange/list?page=2"
                    rel="next"
                    aria-label="Next »"
                  >
                    ›
                  </a>
                </li>
              </ul>
            </nav>
          </div>
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



export default Transactions;
