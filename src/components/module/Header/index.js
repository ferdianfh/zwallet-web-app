import React, { Fragment, useEffect } from "react";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import img from "../../../assets/img/blank-profile-picture.png";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../../redux/actions/apps/getProfile";

const Header = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.GetProfile);
  const profile = profileData.data;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(GetProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [optionMenuSm, setOptionMenuSm] = useState(false);
  // const showMoreOptions = () => {
  //   setOptionMenuSm(!optionMenuSm);
  // };

  return (
    <Fragment>
      <header className="col-12 header-content d-flex flex-column">
        {/* <!-- header content for xs, sm --> */}

        {pathname === "/apps" ? (
          <nav className="navbarSm d-flex flex-row justify-content-between align-items-center d-md-none mb-1">
            <img
              onClick={() => navigate("/apps/profile")}
              className="ms-2 d-md-none d-lg-none user-pic"
              src={profile.picture ? profile.picture : img}
              alt="ProfilePicture"
              height={53}
            />
            <div
              onClick={() => navigate("/apps/profile")}
              className="greetingWrapper d-md-none d-lg-none"
            >
              <p className="greetingText mb-0 mt-3">Hello,</p>
              <p className="userFullName">
                {profile.first_name} {profile.last_name}
              </p>
            </div>
            <BsIcons.BsBell
              onClick={() => navigate("/apps/notifications")}
              className="notifIcon d-md-none icons-size mt-2 me-2"
            />
          </nav>
        ) : (
          <nav className="navbarSmv2 d-flex flex-row justify-content-between align-items-center d-md-none">
            <div className="d-flex flex-row flex-start align-items-center">
              <FiIcons.FiArrowLeft
                onClick={() => navigate(-1)}
                className="goBackIcon"
              />
              <p className="titlePageSm">
                {pathname === "/apps/history"
                  ? "History"
                  : pathname === "/apps/profile"
                  ? "Profile"
                  : pathname === "/apps/profile/picture"
                  ? "Edit Profile Picture"
                  : pathname === "/apps/profile/information"
                  ? "Personal Information"
                  : pathname === "/apps/profile/phone"
                  ? "Manage Phone Number"
                  : pathname === "/apps/profile/phone/new"
                  ? "Add Phone Number"
                  : pathname === "/apps/password/change"
                  ? "Change Password"
                  : pathname === "/apps/PIN/change"
                  ? "Change PIN"
                  : pathname === "/apps/PIN/new"
                  ? "Create PIN"
                  : pathname === "/apps/notifications"
                  ? "Notifications"
                  : "hehe"}
              </p>
            </div>

            <BsIcons.BsThreeDotsVertical
              // onClick={showMoreOptions}
              className="moreOptionsMenu"
            />
          </nav>
        )}

        {/* {optionMenuSm ? (
          <div className="OptionMenuWrapperSm">
            <ul>
              <li>Dashboard</li>
              <li>Profile</li>
              <li>Log Out</li>
            </ul>
          </div>
        ) : 
        null} */}

        {/* <!-- header content for md, lg, xl, xxl --> */}
        <nav className="nav-bar d-none d-md-flex flex-row justify-content-between align-items-center mb-4 mb-lg-1">
          <h2 className="logo text-blue d-none d-md-block mt-3">Zwallet</h2>

          <div className="user-profile d-md-flex flex-row d-none d-md-block">
            <img
              className="ms-2 me-4 user-pic"
              src={profile.picture ? profile.picture : img}
              alt="ProfilePicture"
              height={53}
            />
            <div className="user-profile-name me-4">
              <p className="name mb-0">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="phone mb-0">
                {profile.phone ? `+62 ${profile.phone}` : "+ Add phone number"}
              </p>
            </div>
            <BsIcons.BsBell className="notif icons-size mt-3" />
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
