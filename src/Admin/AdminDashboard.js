import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import Loader from "../components/Loader";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    document.title = "Admin Dashboard  | BarterFunds";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/dashboard/admin`, {
        headers: headers,
      })

      .then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, [navigate]);


  const formatCurrency = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Invalid number";
    }

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"dashboard"} />
      <AdminHeader />
      {isLoading ? (
        <Loader />
      ) : (
        data?.currencies && (
          <div className="body-wrapper">
          <div className="bodywrapper__inner">
            <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
              <h6 className="page-title">Dashboard</h6>
              <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins"></div>
            </div>
            <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--primary overflow-hidden box--shadow2">
                  {/* <a href="/admin/users" className="item-link" > */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/users')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-users f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Total Users
                        </span>
                        <h2 className="text--white">{data?.totalUsers}</h2>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--success overflow-hidden box--shadow2">
                  {/* <a href="users/active.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/users')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-check f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Active Users
                        </span>
                        <h2 className="text--white">{data?.activeUsers}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--danger overflow-hidden box--shadow2">
                  {/* <a href="users/email-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/users')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-times f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Inactive Users
                        </span>
                        <h2 className="text--white">{data?.inactiveUsers}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--red overflow-hidden box--shadow2">
                  {/* <a href="users/mobile-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/users')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-shield f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Verified Users
                        </span>
                        <h2 className="text--white">{data?.verifiedUsers}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
            </div>
            <br/>
            <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--white overflow-hidden box--shadow2">
                  {/* <a href="#" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/kycs')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="las la la-id-card f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Total KYCs
                        </span>
                        <h2 className="text--white">{data?.totalKycs}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--white overflow-hidden box--shadow2">
                  {/* <a href="users/active.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/kycs')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-check f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Pending KYCs
                        </span>
                        <h2 className="text--white">{data?.pendingKycs}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--white overflow-hidden box--shadow2">
                  {/* <a href="users/email-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/kycs')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-times f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Approved KYCs
                        </span>
                        <h2 className="text--white">{data?.approvedKycs}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--white overflow-hidden box--shadow2">
                  {/* <a href="users/mobile-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/kycs')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-shield f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                         Rejected KYCs
                        </span>
                        <h2 className="text--white">{data?.rejectedKycs}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
            </div>
            <br/>

            <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--primary overflow-hidden box--shadow2">
                  {/* <a href="#" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/tickets')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-users f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Total Tickets
                        </span>
                        <h2 className="text--white">{data?.totalTickets}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--success overflow-hidden box--shadow2">
                  {/* <a href="users/active.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/tickets')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-check f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Open Tickets
                        </span>
                        <h2 className="text--white">{data?.openTickets}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--danger overflow-hidden box--shadow2">
                  {/* <a href="users/email-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/transactions')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-times f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Total Transactions
                        </span>
                        <h2 className="text--white">{data?.totalTransactions || 20}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
              <div className="col-xxl-3 col-sm-6">
                <div className="card bg--red overflow-hidden box--shadow2">
                  {/* <a href="users/mobile-unverified.html" className="item-link" /> */}
                  <div className="card-body" style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/orders')})}>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <i className="la las la-user-shield f-size--56 f-size--56 text--white" />
                      </div>
                      <div className="col-8 text-end">
                        <span className="text--white text--small">
                          Total Orders
                        </span>
                        <h2 className="text--white">{data?.totalOrders || 10}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* dashboard-w1 end */}
            </div>



            <h4 className="mt-4 mb-2"> Reserved Currencies</h4>
            <div className="row gy-4">
              {data?.currencies?.slice(0,8)?.map((currency, index) => {
                return(
                <div className="col-xxl-3 text-white" key={index} style={{ cursor: 'pointer'}} onClick={(() => {navigate('/admin/currencies')})}>
                      <div className="widget-two box--shadow2 b-radius--5 bg--white">
                        <div className="widget-two__icon b-radius--5">
                          <img
                            className="reserved-currency-image"
                            src={currency?.currencyLogo}
                            alt="currency"
                          />
                        </div>
                        <div className="widget-two__content text-white">
                          <h5 className="text-white">
                            <span className="text-white">{currency?.currencyName}</span>
                          </h5>
                          <h6>Total Amount: {formatCurrency(currency?.reserveAmount)} GHS</h6>
                        </div>
                      </div>
                    </div>
                )
              })}
              
              
              <div className="row mb-none-30 mt-5">
                <div className="col-xl-4 col-lg-6 mb-30">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <h5 className="card-title">
                        Login By Browser (Last 30 days)
                      </h5>
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
                      <h5 className="card-title">
                        Login By Country (Last 30 days)
                      </h5>
                      <canvas id="userCountryChart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          
        </div>
        )
        
      )}
    </div>
  );
};

export default AdminDashboard;
