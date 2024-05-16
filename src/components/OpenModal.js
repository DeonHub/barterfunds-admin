
import React, { useState } from "react";
import { Modal, Button } from "antd";
import openNotification from "./OpenNotification";
import axios from "axios";

const OpenModal = ({ title, content, updateUrl, status, action, setIsLoading={setIsLoading} }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    const token = window.sessionStorage.getItem("token");

    const headers = {
          Authorization:
            `Bearer ${token}`
        }

    const body ={
      status: status
    }


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
            window.location.href = `${process.env.PUBLIC_URL}/admin/currencies`;
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
        className={status === 'active' ? "btn btn-sm btn--success ml-3" : "btn btn-sm btn--danger ml-3"}
        onClick={showModal}
        style={{
          marginLeft: "10px"
        }}
      >
        <i className={status === 'active' ? "las la-eye" : "la la-eye-slash"} /> {action}
      </button>

      <Modal
        open={open}
        // mask={open}
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

export default OpenModal;
