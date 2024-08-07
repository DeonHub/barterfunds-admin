import React from "react";
import { useNavigate } from "react-router-dom";
import './adminjs';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all items from sessionStorage
    window.sessionStorage.clear();

    // Redirect to login page
    navigate('/login');
  };


    return (
      <>
  <nav className="navbar-wrapper bg--dark">
    <div className="navbar__left">
      <button type="button" className="res-sidebar-open-btn me-3">
        <i className="las la-bars" />
      </button>
      <form className="navbar-search">
        <input
          type="search"
          name="#0"
          className="navbar-search-field"
          id="searchInput"
          autoComplete="off"
          placeholder="Search here..."
        />
        <i className="las la-search" />
        <ul className="search-list" />
      </form>
    </div>
    <div className="navbar__right">
      <ul className="navbar__action-list">
        <li className="dropdown">
          <button
            type="button"
            className="primary--layer"
            data-bs-toggle="dropdown"
            data-display="static"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="las la-bell text--primary  icon-left-right " />
          </button>
          <div className="dropdown-menu dropdown-menu--md p-0 border-0 box--shadow1 dropdown-menu-right">
            <div className="dropdown-menu__header">
              <span className="caption">Notification</span>
              <p>You have 15 unread notification</p>
            </div>
            <div className="dropdown-menu__body">

              <a
                href="/"
                className="dropdown-menu__item"
              >
                <div className="navbar-notifi">
                  <div className="navbar-notifi__left bg--green b-radius--rounded">
                    <img
                      src="/assets/images/default.png"
                      alt="Profile"
                    />
                  </div>
                  <div className="navbar-notifi__right">
                    <h6 className="notifi__title">New member registered</h6>
                    <span className="time">
                      <i className="far fa-clock" />
                      11 hours ago
                    </span>
                  </div>
                </div>
                
              </a>


            </div>
            <div className="dropdown-menu__footer">
              <a href={`/admin/notifications`} className="view-all-message">
                View all notification
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown">
          <button
            type="button"
            className=""
            data-bs-toggle="dropdown"
            data-display="static"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="navbar-user">
              <span className="navbar-user__thumb">
                <img src="/assets/images/icon.png" alt="default" />
              </span>
              <span className="navbar-user__info">
                <span className="navbar-user__name">Admin</span>
              </span>
              <span className="icon">
                <i className="las la-chevron-circle-down" />
              </span>
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu--sm p-0 border-0 box--shadow1 dropdown-menu-right">
            <a
              href={"/admin/dashboard"}
              className="dropdown-menu__item d-flex align-items-center px-3 py-2"
            >
              <i className="dropdown-menu__icon las la-user-circle" />
              <span className="dropdown-menu__caption">Profile</span>
            </a>
            <a
              href={`/admin/reset-password`} 
              className="dropdown-menu__item d-flex align-items-center px-3 py-2"
            >
              <i className="dropdown-menu__icon las la-key" />
              <span className="dropdown-menu__caption">Password Reset</span>
            </a>
            <span
              className="dropdown-menu__item d-flex align-items-center px-3 py-2"
              onClick={handleLogout}
            >
              <i className="dropdown-menu__icon las la-sign-out-alt" />
              <span className="dropdown-menu__caption">Logout</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  {/* navbar-wrapper end */}
</>

    );

}

export default AdminHeader;
