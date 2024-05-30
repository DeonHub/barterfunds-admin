import React from 'react';
import { Result } from 'antd';

const NotFound = () => (
  <div className="mt-5">
  <div className="brand-logo text-center">
    <a href={`${process.env.PUBLIC_URL}/`} className="logo-link">
      <img
        className="logo-dark logo-img logo-img-lg"
        src="/assets/images/barterfunds-logo.png"
        alt="logo"
      />
    </a>
  </div>
  <Result
    status="404"
    title="404 - Page Not Found"
    subTitle="Oops! It looks like the page you are trying to access doesn't exist or has been moved."
    extra={
      <div>
        <a href={`${process.env.PUBLIC_URL}/`}>
          <button className="btn btn-outline-primary btn-sm">
            Back Home
          </button>
        </a>{" "}

      </div>
    }
    
  />
  </div>
);
export default NotFound;