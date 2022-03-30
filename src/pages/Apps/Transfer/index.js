import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import Button from "../../../components/base/Button";
import Input from "../../../components/base/Input";
import img from "../../../assets/img/blank-profile-picture.png";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../../redux/actions/apps/getProfile";
import { GetDetailsReceiver } from "../../../redux/actions/apps/getReceiversById";
import { TransferInput } from "../../../redux/actions/apps/transfer";
import Sidebar from "../../../components/module/Sidebar";

const Transfer = () => {
  const dispatch = useDispatch();
  const transferData = useSelector((state) => state.TransferInput);
  const receiverData = useSelector((state) => state.GetDetailsReceiver);
  const profileData = useSelector((state) => state.GetProfile);
  const receiver = receiverData.data;
  const profile = profileData.data;

  const { id } = useParams();
  const [form, setForm] = useState({ amountTransfer: "", notes: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    dispatch(GetProfile());

    dispatch(GetDetailsReceiver({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const toConfirmPage = () => {
    navigate(`/apps/confirmation`);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const validate = (form) => {
    const errors = {};
    if (!form.amountTransfer) {
      errors.amountTransfer = "Please input amount of money!";
    }
    return errors;
  };
  const handleTransfer = (resultValidate) => {
    if (Object.keys(resultValidate).length === 0) {
      dispatch(
        TransferInput({ receiver, form, toConfirmPage, setErrorMessage })
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultValidate = validate(form);
    setFormError(resultValidate);
    handleTransfer(resultValidate);
  };
  return (
    <Fragment>
      {/* main content for mobile */}
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section className="profileContentSm d-flex flex-column justify-content-center align-items-center d-lg-none">
          {/* receiver mobile layout */}
          <div className="d-flex receivers  ">
            <img
              className="receiver-picture user-pic mt-2 ms-4"
              src={receiver.picture ? receiver.picture : img}
              height="54px"
              alt="Samuel"
            />
            <div className="receiver-detail ms-3 mt-2">
              <p className="text-title-name mb-0">
                {receiver.first_name} {receiver.last_name}
              </p>
              <p className="weekly mt-1">
                {receiver.phone
                  ? `+62 ${receiver.phone}`
                  : "+ Add phone number"}
              </p>
            </div>
          </div>

          {/* form transfer mobile */}
          <form onSubmit={handleSubmit}>
            <p className="text-title-name text-center mt-3">
              Rp {profile.balance} Available
            </p>

            {/* <!-- input amount money for mobile --> */}
            <div className="input-amount-money mb-2 mt-3">
              <Input
                name="amountTransfer"
                value={form.amountTransfer}
                onChange={handleChange}
                className=" input-amount text-center bg-transparent"
                placeholder="0.00"
                type="number"
              />
            </div>

            {errorMessage ? (
              <p className="text-error text-error-transfer mb-0">
                {errorMessage}
              </p>
            ) : null}
            <p className="text-error text-error-transfer mb-0">
              {formError.amountTransfer}
            </p>

            <div className="input-notes notes-position d-flex mt-4 w-100 ">
              <BsIcons.BsPen className="pen text-grey position-absolute ms-1" />
              <Input
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="ps-5 p-1 w-100 bg-transparent"
                placeholder="Add some notes"
                type="text"
                id="notes"
              />
            </div>

            {/* <!-- button continue for mobile --> */}
            <div className="btn-continue-desktop d-flex justify-content-end ms-5 me-5">
              <Button
                isLoading={transferData.loading}
                className="button btn-continue-transfer text-white w-100 p-2"
              >
                Continue
              </Button>
            </div>
          </form>
        </section>
      </div>

      {/* main content for desktop */}
      <div className="big-screen-content d-none d-lg-block d-lg-flex mt-lg-2">
        <Sidebar />

        <section className="content-bar big-screen col-lg-8 animation-pull-out">
          <p className="history-title mt-3 ms-4">Transfer Money</p>

          {/* <!-- receiver lg, xl, xxl --> */}
          <div className="d-flex receivers  mb-3 mt-3 ms-4 me-4 ">
            <img
              className="receiver-picture user-pic mt-2 ms-4"
              src={receiver.picture ? receiver.picture : img}
              height="54px"
              alt="Samuel"
            />
            <div className="receiver-detail ms-3 mt-2">
              <p className="text-title-name mb-0">
                {receiver.first_name} {receiver.last_name}
              </p>
              <p className="weekly mt-1">
                {receiver.phone
                  ? `+62 ${receiver.phone}`
                  : "+ Add phone number"}
              </p>
            </div>
          </div>

          <p className="transfer-instruction ms-4 mt-3">
            Type the amount you want to transfer and then <br></br> press
            continue to the next steps.
          </p>

          <form onSubmit={handleSubmit}>
            {/* <!-- input amount money for lg, xl, xxl --> */}
            <div className="input-amount-money mb-2 mt-3">
              <Input
                name="amountTransfer"
                value={form.amountTransfer}
                onChange={handleChange}
                className=" input-amount text-center bg-transparent"
                placeholder="0.00"
                type="number"
              />
            </div>

            {errorMessage ? (
              <p className="text-error text-error-transfer mb-0">
                {errorMessage}
              </p>
            ) : null}
            <p className="text-error text-error-transfer mb-0">
              {formError.amountTransfer}
            </p>

            <p className="text-title-name text-center">
              Rp {profile.balance} Available
            </p>

            <div className="input-notes notes-position d-flex mt-4 w-50 ">
              <BsIcons.BsPen className="pen text-grey position-absolute ms-1" />
              <Input
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="ps-5 p-1 w-100 bg-transparent"
                placeholder="Add some notes"
                type="text"
                id="notes"
              />
            </div>

            {/* <!-- button continue for lg, xl, xxl --> */}
            <div className="btn-continue-desktop d-flex justify-content-end ms-5 me-5">
              <Button
                isLoading={transferData.loading}
                className="button btn-continue-transfer text-white w-25 p-2"
              >
                Continue
              </Button>
            </div>
          </form>
        </section>
      </div>
    </Fragment>
  );
};

export default Transfer;
