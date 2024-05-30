import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { Avatar } from "antd";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import PageModal from "../components/PageModal";
import Loader from "../components/Loader";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSupportTickets, setTotalSupportTickets] = useState(0);
  const [wallet, setWallet] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "User Details | BarterFunds";
    const token = window.sessionStorage.getItem("token");
    
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.user)
          setUser(response.data.user);
          setTotalTransactions(response.data.totalTransactions)
          setTotalOrders(response.data.totalOrders)
          setTotalSupportTickets(response.data.totalSupportTickets)
          setWallet(response.data.wallet)
          setIsLoading(false);
          // setGlobalState((prevState) => ({
          //   ...prevState,
          //   currencies: response.data.currencies
          // }));
          // console.log(JSON.stringify(response.data))
        } else {
          setUser({});
          console.log("No successful");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("No successful");
      });
  }, [navigate, userId]);

  // const formatDate = (dateTimeString) => {
  //   const date = new Date(dateTimeString);
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   return date.toLocaleDateString("en-US", options);
  // };

  // const formatTime = (dateTimeString) => {
  //   const date = new Date(dateTimeString);
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const amPM = hours >= 12 ? "PM" : "AM";

  //   hours = hours % 12 || 12;
  //   hours = hours.toString().padStart(2, "0");

  //   return `${hours}:${minutes} ${amPM}`;
  // };

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

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"users"} />
      <AdminHeader />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="body-wrapper">
            <div className="bodywrapper__inner">
              <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
                <h6 className="page-title">User Details - {user.firstname} {user.surname}</h6>
                <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
                  <button
                    onClick={handleBack}
                    className="btn btn-sm btn-outline--primary"
                  >
                    <i className="la la-undo" /> Back
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row gy-4">
                    <div className="col-xxl-3 col-sm-6">
                      <div className="widget-two style--two box--shadow2 b-radius--5 bg--19">
                        <div className="widget-two__icon b-radius--5 bg--primary">
                          <i className="las la-money-bill-wave-alt" />
                        </div>
                        <div className="widget-two__content">
                          <h3 className="text-white">{formatCurrency(wallet ? wallet.balanceGhs : '0.00')} GHS</h3>
                          <p className="text-white">Balance</p>
                        </div>
                        <span className="widget-two__btn">
                          View All
                        </span>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-sm-6">
                      <div className="widget-two style--two box--shadow2 b-radius--5 bg--primary">
                        <div className="widget-two__icon b-radius--5 bg--primary">
                          <i className="las la-sync" />
                        </div>
                        <div className="widget-two__content">
                          <h3 className="text-white">{totalTransactions}</h3>
                          <p className="text-white">Transactions</p>
                        </div>
                        <a
                          href={`/admin/transactions?userId=${user._id}`}
                          className="widget-two__btn"
                        >
                          View All
                        </a>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                      <div className="widget-two style--two box--shadow2 b-radius--5 bg--1">
                        <div className="widget-two__icon b-radius--5 bg--primary">
                          <i className="fas fa-wallet" />
                        </div>
                        <div className="widget-two__content">
                          <h3 className="text-white">{totalOrders}</h3>
                          <p className="text-white">Orders</p>
                        </div>
                        <a
                          href={`/admin/orders?userId=${user._id}`}
                          className="widget-two__btn"
                        >
                          View All
                        </a>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-sm-6">
                      <div className="widget-two style--two box--shadow2 b-radius--5 bg--17">
                        <div className="widget-two__icon b-radius--5 bg--primary">
                          <i className="la la-ticket" />
                        </div>
                        <div className="widget-two__content">
                          <h3 className="text-white">{totalSupportTickets}</h3>
                          <p className="text-white">Support Tickets</p>
                        </div>
                        <a
                          href={`/admin/tickets?userId=${user._id}`}
                          className="widget-two__btn"
                        >
                          View All
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-5">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        Information of {user.firstname} {user.surname}
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="center mb-3">
                        {!user.kycApproved ? (
                          <Avatar size={250} icon={<UserOutlined />} />
                        ) : (
                          <Avatar
                            size={250}
                            src={
                              <img
                                src={
                                  "https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.webp?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0="
                                }
                                alt="avatar"
                              />
                            }
                          />
                        )}
                      </div>
                      <hr />

                      <form>
                        <input
                          type="hidden"
                          name="_token"
                          defaultValue="3vuTExGZvcVqqtByZPqrvQL5B5yUgI769rrQKDaC"
                        />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label>First Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                required=""
                                value={user.firstname}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-control-label">
                                Last Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                value={user.surname}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Email </label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-envelope" />
                                </span>
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  className="form-control"
                                  value={user.email}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Mobile Number</label>
                              <div className="input-group ">
                                <span className="input-group-text mobile-code">
                                  <i className="menu-icon las la-phone" />
                                </span>
                                <input
                                  type="text"
                                  name="mobile"
                                  value={user.contact}
                                  disabled
                                  id="mobile"
                                  className="form-control "
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-6">
                            <div className="form-group">
                              <div>
                                <input
                                  type="checkbox"
                                  name="availableForBuy"
                                  value="true"
                                  disabled
                                  checked={user.verified}
                                />
                                <label style={{ marginLeft: "10px" }}>
                                  Email verification
                                </label>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  name="availableForSell"
                                  value="true"
                                  disabled
                                  checked={user.twoFactorAuth}
                                />
                                <label style={{ marginLeft: "10px" }}>
                                  Mobile verification
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <div>
                                <input
                                  type="checkbox"
                                  name="availableForBuy"
                                  disabled
                                  checked={user.twoFactorAuth}
                                />
                                <label style={{ marginLeft: "10px" }}>
                                  2FA Verification
                                </label>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  name="availableForSell"
                                  disabled
                                  checked={user.kycApproved}
                                />
                                <label style={{ marginLeft: "10px" }}>
                                  KYC Verification
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="d-flex flex-wrap gap-3 mt-4 mb-4">
                          <div className="flex-fill">
                            <a
                              href="admin/report/login/history?search=hearning"
                              className="btn btn--primary btn--shadow w-100 btn-lg"
                            >
                              <i className="las la-list-alt" />
                              Logins
                            </a>
                          </div>
                         

                          <div className="flex-fill">
                            {user.status === "inactive" ? (
                              <PageModal
                                title={"Activate User"}
                                content={
                                  "User will be able to access his/her dashboard. Are you sure you want to activate user?"
                                }
                                action={"activate"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/users/${user._id}`}
                                status={"active"}
                                className={
                                  "btn btn--success btn--shadow w-100 btn-lg"
                                }
                                icon={"las la-user-check"}
                                setIsLoading={setIsLoading}
                                redirectTo={"users"}
                              />
                            ) : (
                              <PageModal
                                title={"Deactivate User"}
                                content={
                                  "User can access his/her dashboard but won't be able to make any transactions. Are you sure you want to deactivate user?"
                                }
                                className={
                                  "btn btn--secondary btn--shadow w-100 btn-lg"
                                }
                                icon={"las la-user-slash"}
                                action={"deactivate"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/users/${user._id}`}
                                status={"inactive"}
                                setIsLoading={setIsLoading}
                                redirectTo={"users"}

                              />
                            )}
                          </div>
                          <div className="flex-fill">
                            {user.status === "blocked" ? (
                              <PageModal
                                title={"Unblock User"}
                                content={
                                  "User will be able to access his/her dashboard. Are you sure you want to unblock user?"
                                }
                                action={"unblock"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/users/${user._id}`}
                                status={"inactive"}
                                className={
                                  "btn btn-secondary btn--shadow w-100 btn-lg"
                                }
                                icon={"las la-user-cog"}
                                setIsLoading={setIsLoading}
                                redirectTo={"users"}

                              />
                            ) : (
                              <PageModal
                                title={"Block User"}
                                content={
                                  "User won't be able to access his/her dashboard. Are you sure you want to block user?"
                                }
                                action={"block"}
                                updateUrl={`${process.env.REACT_APP_API_URL}/users/${user._id}`}
                                status={"blocked"}
                                className={
                                  "btn btn--warning btn--gradi btn--shadow w-100  btn-lg"
                                }
                                icon={"las la-ban"}
                                setIsLoading={setIsLoading}
                                redirectTo={"users"}

                              />
                            )}
                          </div>
                          <div className="flex-fill">
                            <PageModal
                              title={"Remove User"}
                              content={
                                "User won't be able to access his/her dashboard. Are you sure you want to remove user?"
                              }
                              action={"remove"}
                              updateUrl={`${process.env.REACT_APP_API_URL}/users/${user._id}`}
                              className={
                                "btn btn--primary btn--shadow w-100 btn-lg"
                              }
                              icon={"las la-user-times"}
                              setIsLoading={setIsLoading}
                              redirectTo={"users"}

                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UserDetails;
