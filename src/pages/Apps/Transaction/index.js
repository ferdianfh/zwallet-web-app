/* eslint-disable array-callback-return */
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import Button from "../../../components/base/Button";
import Sidebar from "../../../components/module/Sidebar";
import img from "../../../assets/img/blank-profile-picture.png";

const Transaction = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ZWALLET_API}/transaction/history?limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const result = res.data.data;
        setHistory(result);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {/* main content for mobile */}
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section className="historyContentSm d-flex flex-column justify-content-center align-items-center d-lg-none">
          <div className="filterBtnWrapperSm mb-5 w-100 d-flex flex-row justify-content-around align-items-center">
            <div className="filterByType w-50 d-flex flex-row justify-content-between align-items-center">
              <Button className="btnFilterByTypeSm bg-white text-red fw-bold me-2">
                <BsIcons.BsArrowUp />
              </Button>
              <Button className="btnFilterByTypeSm bg-white text-green fw-bold ms-2">
                <BsIcons.BsArrowDown />
              </Button>
            </div>
            <div className="filterByDate">
              <Button className="btnFilterByDateSm text-blue fw-bold">
                Filter By Date
              </Button>
            </div>
          </div>

          {history.length > 0 ? (
            history.map((profile, index) => {
              const date = new Date(profile.date);
              const DATE_OPTIONS = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
              };
              const convertedDate = date.toLocaleDateString(
                "en-GB",
                DATE_OPTIONS
              );

              if (profile.status === "Success") {
                return (
                  <div
                    key={profile.id}
                    className="history-transaction-profiles d-flex flex-row justify-content-between align-items-center mb-4 pt-2 pb-2"
                  >
                    <img
                      className="user-pic m-1"
                      src={
                        profile.receiver_picture
                          ? profile.receiver_picture
                          : img
                      }
                      alt="TransactionPic"
                      height={52}
                    />
                    <div className="profile-description">
                      <p className="profile-desc-name mb-0">
                        {profile.receiver_name}
                      </p>
                      <p className="profile-desc mb-0">{convertedDate}</p>
                    </div>
                    <p className="nominal-subscription amountMoneySm">
                      -Rp {profile.amount_transfer}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <div className="no-transactions d-flex flex-column justify-content-center align-items-center">
              <RiIcons.RiFileList3Line className="no-transactions-icon" />
              <p className="no-transactions-text mt-2">No Transactions</p>
            </div>
          )}
        </section>
      </div>

      {/* main content for layout lg, xl, xxl */}
      <div className="big-screen-content d-none d-lg-block d-lg-flex mt-lg-2">
        <Sidebar />

        <section className="content-bar big-screen col-lg-8 animation-pull-out">
          <p className="history-title mt-3 ms-4">Transaction History</p>

          {/* <p className="weekly ms-4">This Week</p> */}

          {history.length > 0 ? (
            // eslint-disable-next-line array-callback-return
            history.map((profile, index) => {
              const date = new Date(profile.date);
              const DATE_OPTIONS = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
              };
              const convertedDate = date.toLocaleDateString(
                "en-GB",
                DATE_OPTIONS
              );
              if (profile.status === "Success") {
                return (
                  <div
                    key={index}
                    className="history-transaction-profiles d-flex flex-row justify-content-between align-items-center mb-3 ms-3 me-3 pt-2 pb-2"
                  >
                    <img
                      className="receiver-picture user-pic mt-1 ms-3"
                      src={
                        profile.receiver_picture
                          ? profile.receiver_picture
                          : img
                      }
                      height="54px"
                      alt="Samuel"
                    />
                    <div className="profile-description history-page">
                      <p className="profile-desc-name mb-0">
                        {profile.receiver_name}
                      </p>
                      <p className="profile-desc mb-0">{convertedDate}</p>
                    </div>
                    <p className="nominal-subscription me-3">
                      -Rp{profile.amount_transfer}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <div className="no-transactions d-flex flex-column justify-content-center align-items-center mt-5">
              <RiIcons.RiFileList3Line className="no-transactions-icon" />
              <p className="no-transactions-text mt-2">No Transactions</p>
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Transaction;
