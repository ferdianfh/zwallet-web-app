import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img/404.jpg";
import Button from "../../components/base/Button";
import "./404.css";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="page-not-found-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className="page-not-found-text mt-3">
          <h1 className="page-status text-center">404</h1>
          <h3 className="text-center">Page Not Found</h3>
        </div>
        <img src={img} className="img-not-found" alt="404" width="800px" />

        <div>
          <Button onClick={() => navigate("/apps")} className="backHome">
            Back to Home
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page404;
