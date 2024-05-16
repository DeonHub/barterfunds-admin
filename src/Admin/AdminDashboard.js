import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';


const AdminDashboard = ({ globalState, setGlobalState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Dashboard | BarterFunds';
    const token = window.sessionStorage.getItem("token");

    // if (!token) {
    //   navigate('/login');
    //   return;
    // }

  }, [])

    return (
      <div className="page-wrapper default-version">
        <AdminSidebar active={'dashboard'}/> 
  <AdminHeader />
  <div className="body-wrapper">
  <div className="bodywrapper__inner">
    <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
      <h6 className="page-title">Dashboard</h6>
      <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins"></div>
    </div>
    <div className="row gy-4">
      <div className="col-xxl-3 col-sm-6">
        <div className="card bg--primary overflow-hidden box--shadow2">
          <a href="users/users.html" className="item-link" />
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-4">
                <i className="la las la-users f-size--56 f-size--56 text--white" />
              </div>
              <div className="col-8 text-end">
                <span className="text--white text--small">Total Users</span>
                <h2 className="text--white">0</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dashboard-w1 end */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card bg--success overflow-hidden box--shadow2">
          <a href="users/active.html" className="item-link" />
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-4">
                <i className="la las la-user-check f-size--56 f-size--56 text--white" />
              </div>
              <div className="col-8 text-end">
                <span className="text--white text--small">Active Users</span>
                <h2 className="text--white">0</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dashboard-w1 end */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card bg--danger overflow-hidden box--shadow2">
          <a href="users/email-unverified.html" className="item-link" />
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-4">
                <i className="la lar la-envelope f-size--56 f-size--56 text--white" />
              </div>
              <div className="col-8 text-end">
                <span className="text--white text--small">
                  Email Unverified Users
                </span>
                <h2 className="text--white">0</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dashboard-w1 end */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card bg--red overflow-hidden box--shadow2">
          <a href="users/mobile-unverified.html" className="item-link" />
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-4">
                <i className="la las la-comment-slash f-size--56 f-size--56 text--white" />
              </div>
              <div className="col-8 text-end">
                <span className="text--white text--small">
                  Mobile Unverified Users
                </span>
                <h2 className="text--white">0</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dashboard-w1 end */}
    </div>
    {/* row end*/}
    <div className="row gy-4 mt-2">
      <div className="col-xxl-3 col-sm-6">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <i className="la la-sync overlay-icon text--white" />
          <div className="widget-two__icon b-radius--5   bg--warning  ">
            <i className="la la-sync" />
          </div>
          <div className="widget-two__content">
            <h3>0</h3>
            <p>Pending Exchanges</p>
          </div>
          <a
            href="exchange/pending.html"
            className="widget-two__btn btn btn-outline--warning"
          >
            View All
          </a>
        </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <i className="la la-check overlay-icon text--white" />
          <div className="widget-two__icon b-radius--5   bg--success  ">
            <i className="la la-check" />
          </div>
          <div className="widget-two__content">
            <h3>0</h3>
            <p>Approved Exchanges</p>
          </div>
          <a
            href="exchange/approved.html"
            className="widget-two__btn btn btn-outline--success"
          >
            View All
          </a>
        </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <i className="la la-reply overlay-icon text--white" />
          <div className="widget-two__icon b-radius--5   bg--dark  ">
            <i className="la la-reply" />
          </div>
          <div className="widget-two__content">
            <h3>0</h3>
            <p>Refunded Exchanges</p>
          </div>
          <a
            href="exchange/refunded.html"
            className="widget-two__btn btn btn-outline--dark"
          >
            View All
          </a>
        </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <i className="la la-reply overlay-icon text--white" />
          <div className="widget-two__icon b-radius--5   bg--danger  ">
            <i className="la la-reply" />
          </div>
          <div className="widget-two__content">
            <h3>0</h3>
            <p>Canceled Exchanges</p>
          </div>
          <a
            href="exchange/canceled.html"
            className="widget-two__btn btn btn-outline--danger"
          >
            View All
          </a>
        </div>
      </div>
    </div>
    <h4 className="mt-4 mb-2"> Reserved Currencies</h4>
    <div className="row gy-4">
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/btc.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Bitcoin</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/usdt.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">USDT</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/usdc.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">USD Coin</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/bch.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Bitcoin Cash</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/litecoin.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Litecoin</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/ethereum.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Ethereum</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/paypal-logo.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Paypal</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/rmb.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Yuan</span>
            </h5>
            <p>10,000.00 RMB</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-3">
        <div className="widget-two box--shadow2 b-radius--5 bg--white">
          <div className="widget-two__icon b-radius--5">
            <img
              className="reserved-currency-image"
              src="/assets/images/currency/perfectmoney.png"
              alt=""
            />
          </div>
          <div className="widget-two__content">
            <h5 className="">
              <span className="ms-1">Perfect Money</span>
            </h5>
            <p>10,000.00 USD</p>
          </div>
        </div>
      </div>
      <div className="row mb-none-30 mt-5">
        <div className="col-xl-4 col-lg-6 mb-30">
          <div className="card overflow-hidden">
            <div className="card-body">
              <h5 className="card-title">Login By Browser (Last 30 days)</h5>
              <canvas id="userBrowserChart" />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-30">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login By OS (Last 30 days)</h5>
              <canvas id="userOsChart" />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-30">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login By Country (Last 30 days)</h5>
              <canvas id="userCountryChart" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* bodywrapper__inner end */}
  </div>
  {/* body-wrapper end */}
</div>

    </div>
    
    
    


  );
}


export default withGlobalState(AdminDashboard);
