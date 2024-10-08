
import React, { useState } from "react";
import { Modal, Button } from "antd";
import openNotification from "./OpenNotification";
import axios from "axios";

const PageModal = ({ title, content, updateUrl, status, action, className, icon, setIsLoading, redirectTo, disabled, comments, transaction, twoFactorAuth }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if(transaction?.amountGhs > transaction?.currencyId?.reserveAmount){
      openNotification(
        "topRight",
        "error",
        "Insufficient funds",
        "You do not have enough funds to approve this transaction. Please top up to approve this transaction."
      );

      return;
    }

    setIsLoading(true);
    
    const token = window.sessionStorage.getItem("token");

    const headers = {
          Authorization:
            `Bearer ${token}`
        }

    const body ={
      status: status ? status : "",
      comments: comments ? comments : "",
      action: action ? action : '',
      twoFactorAuth: transaction?.twoFactorAuth ? false : false
    }

    if(action === 'delete'){
      axios
    .delete(updateUrl, { headers: headers})
      .then((response) => {
        if (response.data.success) {
          
          openNotification(
            "topRight",
            "success",
            "Success",
            "User removed successfully"
          );
          

          setTimeout(() => {
            window.location.href = `/admin/${redirectTo}`
            
          }, 2000);
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );
        
        console.log("error :>> ", error.response.data.message);
      });
    }
    else{
      axios
      .patch(updateUrl, body, { headers: headers})
        .then((response) => {
          if (response.data.success) {
            // setMessage('Login Successfully')
            openNotification(
              "topRight",
              "success",
              "Success",
              response.data.message
            );
            // console.log("response.data :>> ", response.data);
            // setPassword("");
            // setConfirmPassword("");
  
            setTimeout(() => {
                window.location.href = `/admin/${redirectTo}/details/${transaction?._id}`
            }, 2000);
          }
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            error.response.data.message
          );
          
          console.log("error :>> ", error.response.data.message);
        });
    }

    
    setOpen(false);
  };


  const handleCancel = () => {
    setOpen(false);
  };

  // const modalStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   border: '1px solid #000',
  // };


  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px', // Adjust as needed
  };

  const contentStyle = {
    textAlign: 'center',
  };

  return (
    <>

      <button
        type="button"
        className={className}
        onClick={showModal}
        disabled={disabled}
    >
        <i className={icon} />
        {title}
    </button>

      <Modal
        open={open}
        title={<div style={titleStyle}>{title}<hr/></div>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} style={{ float: "left"}}>
            Cancel
          </Button>,
          <Button onClick={handleOk}>
            OK
          </Button>,
        ]}
        // style={modalStyle}
      >
        <div style={contentStyle}>{content}<hr/></div>
      </Modal>
    </>
  );
};

export default PageModal;
