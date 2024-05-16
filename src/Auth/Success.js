import React from "react";

class Success extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="nk-block-head">
        <div className="nk-block-head-content  text-success">
          {/* <h4 className="nk-block-title">🎉 Congratulations! 🎉</h4> */}
          <h4 className="nk-block-title">{this.props.title}</h4>
          {/* <h6> You’re now part of Barter Funds community. </h6> */}
          <h6>{this.props.subtitle}</h6>
          <div className="nk-block-des">
            {/* <p>Please check your email and verify your account to unlock all the exciting features awaiting you.</p> */}
            <p>{this.props.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
