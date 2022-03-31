/* eslint-disable array-callback-return */
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "./TransactionsDetails.module.css";
import img from "../../../assets/img/blank-profile-picture.png";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../../redux/actions/apps/getProfile";

export const TransactionsDetails = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.GetProfile);
  const profile = profileData.data;

  const token = JSON.parse(localStorage.getItem("token"));
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetProfile());

    axios
      .get(`${process.env.REACT_APP_ZWALLET_API}/transaction/history`, {
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
      {/* <!-- main content for xs, sm, md --> */}
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section
          className={`${styles.detailsTransactionContentSm} d-flex flex-column justify-content-center align-items-center d-lg-none`}
        >
          <div
            className={`${styles.incomeExpenseWrapper} d-flex flex-row justify-content-between align-items-center w-100`}
          >
            <div className={`${styles.income}`}>
              <BsIcons.BsArrowDown className={`${styles.incomeIcon}`} />
              <p className={`${styles.titleSm}`}>Income</p>
              <p className={`${styles.nominal} text-white fw-bold`}>
                Rp {profile.income}
              </p>
            </div>
            <div className={`${styles.expense}`}>
              <BsIcons.BsArrowUp className={`${styles.expenseIcon}`} />
              <p className={`${styles.titleSm}`}>Expense</p>
              <p className={`${styles.nominal} text-white fw-bold`}>
                Rp {profile.expense}
              </p>
            </div>
          </div>

          <div className="d-flex flex-start w-100 mt-5">
            <p className={styles.chartTitle}>Weekly Chart</p>

            <div className="no-chart-record d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
              <FiIcons.FiBarChart2 className={`${styles.noChartIcon} mt-2`} />
              <p className={`${styles.noChartText} mt-1 mb-4`}>No Records</p>
            </div>
          </div>

          <div
            className={`${styles.historyWrapper} d-flex flex-row justify-content-between align-items-center ms-2 w-100`}
          >
            <p className={styles.chartTitle}>Transaction History</p>

            <p
              onClick={() => navigate("/apps/history")}
              className={styles.link}
            >
              See All
            </p>
          </div>

          {history.length > 0 ? (
            history.map((profile, index) => {
              const date = new Date(profile.date);
              const DATE_OPTIONS = {
                weekday: "short",
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
                    className={`${styles.historyProfiles} d-flex flex-row justify-content-around align-items-center w-100`}
                  >
                    <img
                      src={
                        profile.receiver_picture
                          ? profile.receiver_picture
                          : img
                      }
                      height={52}
                      className={`${styles.userPic} m-1`}
                      alt="Samuel"
                    />
                    <div
                      className={`${styles.profilesInfoWrapper} d-flex flex-column`}
                    >
                      <p className={`${styles.profileName}`}>
                        {profile.receiver_name}
                      </p>
                      <p className={`${styles.date}`}>{convertedDate}</p>
                    </div>
                    <p className="nominal-subscription">
                      -Rp{profile.amount_transfer}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <div className="no-transactions d-flex flex-column justify-content-center align-items-center">
              <RiIcons.RiFileList3Line className={styles.noTransactionIcon} />
              <p className={`${styles.noTransactionText} mt-2`}>
                No Transactions
              </p>
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
};
