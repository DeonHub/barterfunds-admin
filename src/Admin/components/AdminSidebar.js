import React from "react";

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = new Date().getFullYear();

    this.state = {
    currentYear: currentYear,
    };

  }

  render() {

    return (

      <div>
        <>
      <div className="sidebar bg--dark">
        <button className="res-sidebar-close-btn">
          <i className="las la-times" />
        </button>
        <div className="sidebar__inner">
          <div className="sidebar__logo">
            <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/dashboard`} className="sidebar__main-logo">
              <img src="/assets/images/logo-dark.png" alt="sidebar logo" />
            </a>
          </div>
          <div className="sidebar__menu-wrapper" id="sidebar__menuWrapper">
            <ul className="sidebar__menu">
              <li className={`sidebar-menu-item ${this.props.active === 'dashboard' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/dashboard`} className="nav-link ">
                  <i className="menu-icon las la-home" />
                  <span className="menu-title">Dashboard</span>
                </a>
              </li>
              <li className={`sidebar-menu-item ${this.props.active === 'users' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/users`} className="">
                  <i className="menu-icon las la-users" />
                  <span className="menu-title">Users</span>
                </a>
              </li>

              <li className={`sidebar-menu-item ${this.props.active === 'currency' ? 'active' : ''}`}>
                <a
                  href={`${process.env.REACT_APP_PUBLIC_URL}/admin/currencies`}
                  className="nav-link"
                >
                  <i className="menu-icon las la-money-bill" />
                  <span className="menu-title">Currencies</span>
                </a>
              </li>

              <li className={`sidebar-menu-item ${this.props.active === 'kyc' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/kycs`} className="">
                  <i className="menu-icon las la-address-card"></i>
                  <span className="menu-title">KYCs</span>
                </a>
              </li>

              <li className={`sidebar-menu-item ${this.props.active === 'gateway' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/payment-gateways`} className="nav-link">
                  <i className="menu-icon las la-credit-card" />
                  <span className="menu-title">Payment Gateways</span>
                </a>
              </li>

              <li className={`sidebar-menu-item ${this.props.active === 'transaction' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/transactions`} className="">
                  <i className="menu-icon las la-exchange-alt" />
                  <span className="menu-title">Transactions</span>
                </a>
              </li>
              <li className={`sidebar-menu-item ${this.props.active === 'withdrawal' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/withdrawals`} className="">
                  <i className="menu-icon la la-bank" />
                  <span className="menu-title">Withdrawals </span>
                </a>
              </li>
              
              <li className={`sidebar-menu-item ${this.props.active === 'tickets' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/tickets`} className="">
                  <i className="menu-icon la la-ticket" />
                  <span className="menu-title">Support Tickets</span>
                </a>
              </li>

              <li className={`sidebar-menu-item ${this.props.active === 'referral' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/referrals`} className="">
                <i className="menu-icon las la-comments-dollar" />
                  <span className="menu-title">Referrals</span>
                </a>
              </li>


              <li className={`sidebar-menu-item ${this.props.active === 'report' ? 'active' : ''}`}>
                <a href={`${process.env.REACT_APP_PUBLIC_URL}/admin/reports`} className="">
                  <i className="menu-icon la la-list" />
                  <span className="menu-title">Activity Log</span>
                </a>
              </li>

             
            </ul>
          </div>
        </div>
      </div>
      {/* sidebar end */}
    </>
    

      </div>
    );
  }
}

export default AdminSidebar;
