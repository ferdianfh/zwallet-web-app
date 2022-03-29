/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from "react";
import Input from "../../../components/base/Input";
import Button from "../../../components/base/Button";
import "./profilePicture.css";
import img from "../../../assets/img/blank-profile-picture.png";
import { useNavigate } from "react-router-dom";
import ModalSuccess from "../../../components/module/ModalSuccess";

// redux
import { useDispatch, useSelector } from "react-redux";
import { NewProfilePicture } from "../../../redux/actions/apps/addProfilePicture";
import { GetProfile } from "../../../redux/actions/apps/getProfile";
import Sidebar from "../../../components/module/Sidebar";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const profilePictureData = useSelector((state) => state.NewProfilePicture);
  const profileData = useSelector((state) => state.GetProfile);

  const [form, setForm] = useState({ picture: null });
  const navigate = useNavigate();

  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const handleModalSuccess = () => {
    setOpenModalSuccess(!openModalSuccess);
  };
  const handleNavigate = () => {
    setOpenModalSuccess(!openModalSuccess);
    navigate("/apps/profile");
  };

  const handleUpload = (e) => {
    setForm({
      ...form,
      picture: e.target.files[0]
    });
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", form.picture);
    dispatch(NewProfilePicture({ formData, handleModalSuccess }));
  };

  useEffect(() => {
    dispatch(GetProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="small-screen-content d-lg-none animation-pull-out">
        <section className="profileContentSm d-flex flex-column justify-content-center align-items-center d-lg-none">
          <h2 className="text-center">Profile Picture</h2>
          <form
            onSubmit={handleSumbit}
            method="post"
            encType="multipart/form-data"
          >
            <Input
              className="picture-input"
              type="file"
              name="picture"
              id="picture"
              onChange={handleUpload}
              accept=".png, .jpg, .jpeg"
            />
            <p className="text-blue text-center preview-text">Preview:</p>
            {form.picture ? (
              <img
                className="preview-picture"
                src={URL.createObjectURL(form.picture)}
                alt="ProfilePicture"
              />
            ) : (
              <img className="preview-picture" src={img} alt="ProfilePicture" />
            )}

            <Button
              isLoading={profilePictureData.loading}
              className="button btn-login btn-upload"
              type="submit"
            >
              Save
            </Button>
          </form>
        </section>
      </div>

      <div className="big-screen-content d-none d-lg-block d-lg-flex mt-lg-2">
        <Sidebar />

        <section className="content-bar big-screen col-lg-8 animation-pull-out ">
          <section className="profile-content d-flex flex-column justify-content-center align-items-center">
            <div className="profile-picture d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-center mt-2">Profile Picture</h2>
              <form
                onSubmit={handleSumbit}
                method="post"
                encType="multipart/form-data"
              >
                <Input
                  className="picture-input"
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={handleUpload}
                  accept=".png, .jpg, .jpeg"
                />
                <p className="text-blue text-center preview-text">Preview:</p>
                {form.picture ? (
                  <img
                    className="preview-picture"
                    src={URL.createObjectURL(form.picture)}
                    alt="ProfilePicture"
                  />
                ) : (
                  <img
                    className="preview-picture"
                    src={img}
                    alt="ProfilePicture"
                  />
                )}

                <Button
                  isLoading={profilePictureData.loading}
                  className="button btn-login btn-upload"
                  type="submit"
                >
                  Save
                </Button>
              </form>
            </div>
            <div className="btn-wrapper"></div>
          </section>
        </section>
      </div>

      {openModalSuccess ? (
        <ModalSuccess
          successTitle="Add Profile Picture Success!"
          successDesc="Congratulations! Now your friends could recognize you here!"
          action="Go back to Profile"
          closeModal={handleNavigate}
        />
      ) : null}
    </Fragment>
  );
};

export default ProfilePicture;
