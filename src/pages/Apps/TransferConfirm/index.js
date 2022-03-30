import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/base/Button";
import img from "../../../assets/img/blank-profile-picture.png";
import ModalPIN from "../../../components/module/ModalPIN";
import Input from "../../../components/base/Input";

// redux
import { useDispatch, useSelector } from "react-redux";
import { TransferConfirmation } from "../../../redux/actions/apps/transferConfirmation";
import Sidebar from "../../../components/module/Sidebar";

const TransferConfirm = () => {
  const dispatch = useDispatch();
  const transferConfirmData = useSelector(
    (state) => state.TransferConfirmation
  );

  const token = JSON.parse(localStorage.getItem("token"));
  const transferId = JSON.parse(localStorage.getItem("transferId"));
  const [transaction, setTransaction] = useState({
    receiver_name: "",
    receiver_phone: "",
    receiver_picture: "",
    amount_transfer: "",
    balance_left: "",
    date: "",
    notes: ""
  });
  const date = new Date(transaction.date);
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
    // timeZone: "WIT",
    // timeZoneName: "short"
  };
  const convertedDate = date.toLocaleDateString("en-GB", DATE_OPTIONS);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [pin, setPin] = useState(new Array(6).fill(""));
  const PIN = pin.join("");
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
    dispatch(
      TransferConfirmation({ transferId, PIN, navigate, setErrorMessage })
    );
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ZWALLET_API}/transaction/history`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const result = res.data.data[0];
        setTransaction(result);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openModalPIN, setOpenModalPIN] = useState(false);
  const handleModalPIN = () => {
    setOpenModalPIN(!openModalPIN);
  };

  return (
    <Fragment>
      {/* main content for mobile */}
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section className="profileContentSm d-flex flex-column justify-content-center align-items-center d-lg-none">
          <div className="d-flex flex-start w-100">
            <p className="history-title ">Transfer To</p>
          </div>

          {/* <!-- receiver mobile --> */}
          <div className="d-flex receivers p-1 mb-3 mt-2 ms-4 me-4 ">
            <img
              className="receiver-picture user-pic mt-2 ms-4"
              src={
                transaction.receiver_picture
                  ? transaction.receiver_picture
                  : img
              }
              height={54}
              alt="ReceiverPic"
            />
            <div className="receiver-detail ms-3 mt-2">
              <p className="text-title-name mb-0">
                {transaction.receiver_name}
              </p>
              <p className="weekly mt-1">+62 {transaction.receiver_phone}</p>
            </div>
          </div>

          <div className="d-flex flex-start w-100">
            <p className="history-title ">Details</p>
          </div>

          <div className="detailsTransferWrapperSm d-flex flex-column w-100">
            <div className=" confirm-items w-100">
              <p className="text-title m-2">Amount</p>
              <p className="text-content m-2">
                Rp {transaction.amount_transfer}
              </p>
            </div>

            <div className=" confirm-items  w-100">
              <p className="text-title m-2">Balance Available</p>
              <p className="text-content m-2">Rp {transaction.balance_left}</p>
            </div>

            <div className=" confirm-items w-100">
              <p className="text-title m-2">Date & Time</p>
              <p className="text-content m-2">{convertedDate}</p>
            </div>

            <div className=" confirm-items w-100">
              <p className="text-title m-2">Notes</p>
              <p className="text-content m-2">{transaction.notes}</p>
            </div>
          </div>

          {/* <!-- button continue mobile --> */}
          <div className="btn-continue-desktop confirm d-flex justify-content-center mt-4 w-100">
            <Button
              onClick={handleModalPIN}
              className="button btnConfirmSm text-white w-100 shadow"
            >
              Continue
            </Button>
          </div>
        </section>
      </div>

      {/* main content for desktop */}
      <div className="big-screen-content d-none d-lg-block d-lg-flex mt-lg-2">
        <Sidebar />

        <section className="content-bar big-screen col-lg-8 animation-pull-out">
          <p className="history-title mt-3 ms-4">Transfer To</p>

          {/* <!-- receiver lg, xl, xxl --> */}
          <div className="d-flex receivers p-1 mb-3 mt-2 ms-4 me-4 ">
            <img
              className="receiver-picture user-pic mt-2 ms-4"
              src={
                transaction.receiver_picture
                  ? transaction.receiver_picture
                  : img
              }
              height="54px"
              alt="Samuel"
            />
            <div className="receiver-detail ms-3 mt-2">
              <p className="text-title-name mb-0">
                {transaction.receiver_name}
              </p>
              <p className="weekly mt-1">+62 {transaction.receiver_phone}</p>
            </div>
          </div>

          <p className="history-title mt-3 ms-4">Details</p>

          <div className="details-transfer ms-2 me-2 ">
            <div className="row mt-2 me-1">
              <div className="col-5 col-md-11 ms-3 ms-md-5 me-md-5 confirm-items ">
                <p className="text-title m-2">Amount</p>
                <p className="text-content m-2">
                  Rp {transaction.amount_transfer}
                </p>
              </div>
              <div className="col-5 col-md-11 offset-1 ms-md-5 me-md-5 confirm-items mt-md-1">
                <p className="text-title m-2">Balance Available</p>
                <p className="text-content m-2">
                  Rp {transaction.balance_left}
                </p>
              </div>
            </div>
            <div className="row mt-4 mt-md-1 me-1">
              <div className="col-5 col-md-11 ms-3 ms-md-5 me-md-5 confirm-items ">
                <p className="text-title m-2">Date & Time</p>
                <p className="text-content m-2">{convertedDate}</p>
              </div>
            </div>
            <div className="row mt-4 mt-md-1 mb-md-5 me-1">
              <div className="col-11 ms-3 ms-md-5 me-md-5 confirm-items ">
                <p className="text-title m-2">Notes</p>
                <p className="text-content m-2">{transaction.notes}</p>
              </div>
            </div>
          </div>

          {/* <!-- button continue for lg, xl, xxl --> */}
          <div className="btn-continue-desktop confirm d-flex justify-content-end me-5 mt-4">
            <Button
              onClick={handleModalPIN}
              className="button text-white w-25 p-2 shadow"
            >
              Continue
            </Button>
          </div>
        </section>
      </div>

      {openModalPIN ? (
        <ModalPIN
          modalTitle="Enter PIN to Transfer"
          modalSubtitle="Enter your 6 Digits PIN for confirmation to continue transferring money. "
          closeModal={handleModalPIN}
          handleAction={handleSubmit}
          isLoading={transferConfirmData.loading}
        >
          <form onSubmit={handleSubmit}>
            <div className="pin-confirm-wrapper">
              {pin.map((pins, index) => (
                <Input
                  name="pin"
                  value={pins}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="pin-confirm-input"
                  type="text"
                  maxLength="1"
                  key={index}
                />
              ))}
            </div>
            {errorMessage ? (
              <p className="text-error mb-0">{errorMessage}</p>
            ) : null}
          </form>
        </ModalPIN>
      ) : null}
    </Fragment>
  );
};

export default TransferConfirm;
