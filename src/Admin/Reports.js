import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { withGlobalState } from '../withGlobalState';





class Reports extends React.Component {
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
                          <a href="../../admin/users/detail/2361">
                            <span>@</span>gamegon
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-26 09:17 AM <br />1 hour ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/202.134.8.142">
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
                    <tr>
                      <td>
                        <span className="fw-bold">Joy Emon</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2360">
                            <span>@</span>100728078429022888081
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-26 08:36 AM <br />1 hour ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/103.25.248.226">
                            103.25.248.226
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br /> Bangladesh
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">moses mungai</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2359">
                            <span>@</span>115924879156619346211
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-25 10:32 PM <br />
                        11 hours ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/105.163.158.49">
                            105.163.158.49
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br />{" "}
                      </td>
                      <td>
                        Firefox <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Sopuru Daniel</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2358">
                            <span>@</span>intelligence
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-25 03:39 PM <br />
                        18 hours ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/102.90.42.189">
                            102.90.42.189
                          </a>
                        </span>
                      </td>
                      <td>
                        Enugu <br /> Nigeria
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">gkkk gk</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2344">
                            <span>@</span>gnycod3
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-24 10:12 PM <br />1 day ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/176.88.135.41">
                            176.88.135.41
                          </a>
                        </span>
                      </td>
                      <td>
                        Istanbul <br />
                        Turkey
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Ahmed Abdi</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2357">
                            <span>@</span>102454937053602712547
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-24 02:16 PM <br />1 day ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/197.241.65.3">
                            197.241.65.3
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br /> Djibouti
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Jamilu Ahmad</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2356">
                            <span>@</span>markarz
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-24 09:20 AM <br />2 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/105.112.227.100">
                            105.112.227.100
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br />{" "}
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Saker Mia</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2353">
                            <span>@</span>saker87
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-24 06:48 AM <br />2 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/103.179.154.14">
                            103.179.154.14
                          </a>
                        </span>
                      </td>
                      <td>
                        Narayanganj <br />
                        Bangladesh
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">
                          rickeyponder rickeyponder
                        </span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2355">
                            <span>@</span>108523646412165088605
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-23 11:29 PM <br />2 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/2607:fb90:bb09:cb87:786e:62fa:f2b8:305e">
                            2607:fb90:bb09:cb87:786e:62fa:f2b8:305e
                          </a>
                        </span>
                      </td>
                      <td>
                        Indianapolis <br /> United States
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">md junaid</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2354">
                            <span>@</span>junaidhossain2020
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-23 05:12 PM <br />2 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/109.177.16.105">
                            109.177.16.105
                          </a>
                        </span>
                      </td>
                      <td>
                        Ajman <br /> United Arab Emirates
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Saker Mia</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2353">
                            <span>@</span>saker87
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-23 11:39 AM <br />2 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/103.179.154.14">
                            103.179.154.14
                          </a>
                        </span>
                      </td>
                      <td>
                        Narayanganj <br />
                        Bangladesh
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">tyy st</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2305">
                            <span>@</span>102658548851760672473
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-22 08:32 PM <br />3 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/41.79.219.95">
                            41.79.219.95
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br /> Benin
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Amir Hossain</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2352">
                            <span>@</span>ajamir
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-22 01:13 PM <br />3 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/203.190.34.212">
                            203.190.34.212
                          </a>
                        </span>
                      </td>
                      <td>
                        Bogra <br />
                        Bangladesh
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">charif hamza</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2351">
                            <span>@</span>charifx
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-22 12:52 PM <br />3 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/196.121.103.25">
                            196.121.103.25
                          </a>
                        </span>
                      </td>
                      <td>
                        Casablanca <br />
                        Morocco
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">John Onyeuwaoma</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2349">
                            <span>@</span>114733388110241326454
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-22 06:01 AM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/197.210.227.56">
                            197.210.227.56
                          </a>
                        </span>
                      </td>
                      <td>
                        Port Harcourt <br />
                        Nigeria
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">John Onyeuwaoma</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2349">
                            <span>@</span>114733388110241326454
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-22 05:57 AM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/197.210.227.217">
                            197.210.227.217
                          </a>
                        </span>
                      </td>
                      <td>
                        Port Harcourt <br />
                        Nigeria
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">Den Den</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2350">
                            <span>@</span>denden
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-21 11:23 PM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/186.27.150.97">
                            186.27.150.97
                          </a>
                        </span>
                      </td>
                      <td>
                        Santiago de Cali <br />
                        Colombia
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">John Onyeuwaoma</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2349">
                            <span>@</span>114733388110241326454
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-21 09:33 PM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/197.210.55.236">
                            197.210.55.236
                          </a>
                        </span>
                      </td>
                      <td>
                        Lagos <br /> Nigeria
                      </td>
                      <td>
                        Handheld Browser <br />
                        Android
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">ROBIUL Islam</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2200">
                            <span>@</span>exchangernet
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-21 05:59 PM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/113.11.70.89">
                            113.11.70.89
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br />{" "}
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-bold">ROBIUL Islam</span>
                        <br />
                        <span className="small">
                          {" "}
                          <a href="../../admin/users/detail/2200">
                            <span>@</span>exchangernet
                          </a>
                        </span>
                      </td>
                      <td>
                        2023-07-21 05:45 PM <br />4 days ago
                      </td>
                      <td>
                        <span className="fw-bold">
                          <a href="../../admin/report/login/ipHistory/113.11.70.89">
                            113.11.70.89
                          </a>
                        </span>
                      </td>
                      <td>
                        {" "}
                        <br />{" "}
                      </td>
                      <td>
                        Chrome <br /> Windows 10
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* table end */}
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
                      href="../../admin/report/login/history?page=2"
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=3"
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=4"
                    >
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=5"
                    >
                      5
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=6"
                    >
                      6
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=7"
                    >
                      7
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=8"
                    >
                      8
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=9"
                    >
                      9
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=10"
                    >
                      10
                    </a>
                  </li>
                  <li className="page-item disabled" aria-disabled="true">
                    <span className="page-link">...</span>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=97"
                    >
                      97
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=98"
                    >
                      98
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="../../admin/report/login/history?page=2"
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
}


export default Reports;
