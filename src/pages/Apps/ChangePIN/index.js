import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/base/Button";
import Input from "../../../components/base/Input";
import "./changePin.css";

const ChangePIN = () => {
  const navigate = useNavigate();
  const newPinPage = () => {
    navigate("/apps/new-PIN");
  };
  return (
    <Fragment>
      <section className="content-bar big-screen col-lg-8 animation-pull-out ">
        <section className="change-pin-content d-flex flex-column">
          <div className="change-pin-text">
            <p className="change-pin-title">Change PIN</p>
            <p className="change-pin-desc">
              Enter your current 6 digits Zwallet PIN below to <br /> continue
              to the next steps.
            </p>
          </div>

          {/* <!-- input form start here--> */}
          <div className="change-pin-container d-flex flex-row justify-content-around align-items-center">
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
            <div className="change-pin-wrapper">
              <Input className="change-pin-input" type="text" maxLength="1" />
            </div>
          </div>

          <div className="btn-change-pin d-flex align-items-center">
            <Button onClick={newPinPage} className="button btn-login btn-pin">
              Continue
            </Button>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

export default ChangePIN;
