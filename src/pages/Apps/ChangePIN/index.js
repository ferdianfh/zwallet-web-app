import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/base/Button";
import Input from "../../../components/base/Input";
import "./changePin.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { PINConfirm } from "../../../redux/actions/apps/PINConfirm";
import Sidebar from "../../../components/module/Sidebar";

const ChangePIN = () => {
  const dispatch = useDispatch();
  const PinConfirmation = useSelector((state) => state.PINConfirm);

  const [pin, setPin] = useState(new Array(6).fill(""));
  const PIN = pin.join("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setPin([...pin.map((d, idx) => (idx === index ? element.value : d))]);
    // focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(PINConfirm({ PIN, navigate, setErrorMessage }));
  };

  return (
    <Fragment>
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section className="profileContentSm d-flex flex-column justify-content-center align-items-center d-lg-none">
          <p className="changePinDescSm">
            Enter your current 6 digits Zwallet PIN below to continue to the
            next steps.
          </p>

          {/* <!-- input form start here--> */}
          <form onSubmit={handleSubmit} className="formPinSm">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="change-pin-container d-flex flex-row justify-content-around align-items-center">
                {pin.map((pins, index) => (
                  <Input
                    name="pin"
                    value={pins}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="change-pin-wrapper"
                    type="text"
                    maxLength="1"
                    key={index}
                  />
                ))}
              </div>

              {errorMessage ? (
                <p className="text-error mb-0">{errorMessage}</p>
              ) : null}
            </div>

            <div className="btn-change-pin d-flex align-items-center">
              <Button
                isLoading={PinConfirmation.loading}
                className="button btn-login btn-pin"
              >
                Continue
              </Button>
            </div>
          </form>
        </section>
      </div>

      <div className="big-screen-content d-none d-lg-block d-lg-flex mt-lg-2">
        <Sidebar />
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
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="change-pin-container d-flex flex-row justify-content-around align-items-center">
                  {/* <div className="change-pin-wrapper">
            </div> */}
                  {pin.map((pins, index) => (
                    <Input
                      name="pin"
                      value={pins}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="change-pin-wrapper"
                      type="text"
                      maxLength="1"
                      key={index}
                    />
                  ))}
                </div>

                {errorMessage ? (
                  <p className="text-error mb-0">{errorMessage}</p>
                ) : null}
              </div>

              <div className="btn-change-pin d-flex align-items-center">
                <Button
                  isLoading={PinConfirmation.loading}
                  className="button btn-login btn-pin"
                >
                  Continue
                </Button>
              </div>
            </form>
          </section>
        </section>
      </div>
    </Fragment>
  );
};

export default ChangePIN;
