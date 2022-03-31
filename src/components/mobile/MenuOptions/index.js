import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as BsIcons from "react-icons/bs";
import "../../module/Header/header.css";
import { useNavigate } from "react-router-dom";
import ModalAlert from "../../module/ModalAlert";
import * as AiIcons from "react-icons/ai";

export default function BasicMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toDashboard = () => {
    setAnchorEl(null);
    navigate("/apps");
  };
  const toProfilePage = () => {
    setAnchorEl(null);
    navigate("/apps/profile");
  };

  const [openModalAlert, setOpenModalAlert] = React.useState(false);

  const handleModalAlert = () => {
    setAnchorEl(null);
    setOpenModalAlert(!openModalAlert);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsIcons.BsThreeDotsVertical className="moreOptionsMenu" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={toDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={toProfilePage}>Profile</MenuItem>
        <MenuItem onClick={handleModalAlert}>Logout</MenuItem>
      </Menu>

      {openModalAlert ? (
        <ModalAlert
          alertIcon={<AiIcons.AiOutlineLogout />}
          alertTitle="Log Out Account?"
          alertDesc="Are you sure you want to log out from Zwallet? Save all your changes before logout."
          action="Log Out"
          closeModal={handleModalAlert}
          handleAction={logOut}
        />
      ) : null}
    </div>
  );
}
