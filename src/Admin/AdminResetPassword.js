import React from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import TextInput from "../components/TextInput";


class AdminResetPassword extends React.Component {
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
        <AdminSidebar active={'dashboard'}/>
        <AdminHeader />
        <>
  <div className="body-wrapper">
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Reset Password</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <a
            href="javascript: history.go(-1)"
            className="btn btn-sm btn-outline--primary"
          >
            <i className="la la-undo" /> Back
          </a>
        </div>
      </div>
      <form
        encType="multipart/form-data"
      >
       
        <div className="row gy-4">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-center">

                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-9">
                    <div className="row">
                      
                      <div className="col-xxl-4 col-sm-6">
                        <div className="form-group">
                        <TextInput 
                        placeholder={'Enter your password'} 
                        label={'Password'} 
                        inputname={'password'} 
                        inputtype={'password'} 
                        value={this.state.password}
                        errorState={this.state.errorPassword}
                        errorMessage={this.state.errorMessage}
                        onValueChange={this.handleInputChange}
                        showEye
                        />
                        </div>
                      </div>
                      <div className="col-xxl-4 col-sm-6">
                        <div className="form-group">
                        <TextInput 
                        placeholder={'Confirm your password'} 
                        label={'Confirm Password'} 
                        inputname={'password'} 
                        inputtype={'password'} 
                        value={this.state.password}
                        errorState={this.state.errorPassword}
                        errorMessage={this.state.errorMessage}
                        onValueChange={this.handleInputChange}
                        />
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="col-12 mt-5">
          <button type="submit" className="btn btn--primary w-100 h-45 center">
            Submit
          </button>
        </div>
      </form>
    </div>


  </div>
  {/* bodywrapper__inner end */}
  {/* body-wrapper end */}
</>

        
        

      </div>

    );
  }
}


export default AdminResetPassword;
