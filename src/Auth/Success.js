import React from "react";


const Success = ({ title,
  subtitle,
  body 
}) => {

  return (
    <div className="nk-block-head">
        <div className="nk-block-head-content  text-success">
          <h4 className="nk-block-title">{title}</h4>
          <h6>{subtitle}</h6>
          <div className="nk-block-des">
            <p>{body}</p>
          </div>
        </div>
      </div>
    );

}

export default Success;
