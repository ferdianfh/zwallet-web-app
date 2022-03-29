import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/module/Footer";
import Header from "../../components/module/Header";
import "./apps.css";

const Apps = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <Fragment>
      <main className="container-fluid">
        <div className="row d-flex">
          <Header />

          <main className="col-12 main-content">
            <Outlet />
          </main>

          <Footer />
        </div>
      </main>
    </Fragment>
  );
};

export default Apps;
