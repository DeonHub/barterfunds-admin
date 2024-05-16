import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import OpenModal from "../components/OpenModal";
// import { currencies } from "./components/data";
import { withGlobalState } from "../withGlobalState";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


const Currencies = ({ globalState, setGlobalState }) => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = globalState.api_url;

  useEffect(() => {
    document.title = "Currencies | BarterFunds";
    const token = window.sessionStorage.getItem("token");


    if (!token) {
      navigate('/login');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${API_URL}/currencies`, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setCurrencies(response.data.currencies);
          setIsLoading(false);
        } else {
          setCurrencies([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = currencies.filter((currency) =>
    currency.currencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Get the data for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-wrapper default-version">
      <AdminSidebar active={"currency"} />
      <AdminHeader />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="body-wrapper">
            <div className="bodywrapper__inner">
              <div className="d-flex mb-5 justify-content-between align-items-center">
                <h6 className="page-title">Manage Currency</h6>
                <div className="d-flex flex-wrap justify-content-end align-items-center breadcrumb-plugins">
                  <form action="" method="GET" className="d-flex flex-wrap">
                    <div className="input-group w-auto flex-fill">
                      <input
                        type="search"
                        name="search"
                        className="form-control bg--white text-white"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button className="btn btn--primary" type="submit">
                        <i className="la la-search" />
                      </button>
                    </div>
                  </form>
                  <a
                    className="btn btn-outline--primary ml-5"
                    style={{ marginLeft: "10px" }}
                    href={`${process.env.REACT_APP_PUBLIC_URL}/admin/currencies/create-currency`}
                  >
                    <i className="las la-plus" />
                    Add New
                  </a>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="card b-radius--10 ">
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table--light style--two table-responsive">
                          <thead>
                            <tr>
                              <th>Currency</th>
                              <th>Buy At</th>
                              <th>Sell At</th>
                              <th>Send At</th>
                              <th>Receive At</th>
                              <th>Reserve Amount</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPageData.length === 0 ? (
                              <tr>
                                <td colSpan="20" className="center">
                                  No data available
                                </td>
                              </tr>
                            ) : (
                              currentPageData.map((currency) => (
                                <tr>
                                  <td>
                                    <div className="user">
                                      <div className="thumb">
                                        <img src={currency.currencyLogo} />
                                      </div>
                                      <span className="name">
                                        {currency.currencyName}
                                      </span>
                                    </div>
                                  </td>
                                  <td>GHS {currency.buyAt}</td>
                                  <td>GHS {currency.sellAt}</td>
                                  <td>GHS {currency.sendAt}</td>
                                  <td>GHS {currency.receiveAt}</td>
                                  <td>GHS {currency.reserveAmount}</td>
                                  <td>
                                    {currency.status === "active" ? (
                                      <span className="badge badge--success">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge badge--danger">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      href={`${process.env.REACT_APP_PUBLIC_URL}/admin/currencies/edit-currency/${currency._id}`}
                                      className="btn btn-sm btn-outline--primary"
                                    >
                                      <i className="la la-pencil" />
                                      Edit
                                    </a>

                                    {currency.status === "active" ? (
                                      <OpenModal
                                        title={`Disable ${currency.currencyName}`}
                                        content={`Are you sure you want to disable ${currency.currencyName}`}
                                        updateUrl={`${API_URL}/currencies/${currency._id}`}
                                        status={"inactive"}
                                        action={"Disable"}
                                        setIsLoading={setIsLoading}
                                      />
                                    ) : (
                                      <OpenModal
                                        title={`Enable ${currency.currencyName}`}
                                        content={`Are you sure you want to enable ${currency.currencyName}`}
                                        updateUrl={`${API_URL}/currencies/${currency._id}`}
                                        status={"active"}
                                        action={"Enable"}
                                        setIsLoading={setIsLoading}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {currentPageData.length === 0 ? (
                      <p></p>
                    ) : (
                      <div className="card-footer py-4">
                        <nav>
                          <ul className="pagination">
                            <li
                              className="page-item"
                              onClick={() => goToPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <button
                                className="page-link"
                                disabled={currentPage === 1}
                              >
                                «
                              </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                              <li
                                key={index}
                                className={`page-item ${
                                  index + 1 === currentPage ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => goToPage(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                            <li
                              className="page-item"
                              onClick={() => goToPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              <button
                                className="page-link"
                                disabled={currentPage === totalPages}
                              >
                                »
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* bodywrapper__inner end */}
          </div>
        )}

        {/* body-wrapper end */}
      </>
    </div>
  );
};

export default withGlobalState(Currencies);
