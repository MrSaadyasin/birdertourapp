import React, { useEffect, useState } from "react";
import PageLayout from "../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout";
import style from "./Profile.module.css";
import { Spin } from "antd";
import { Col, Form, Row, Modal } from "react-bootstrap";
import { Select } from "antd";
import Image from "next/image";
import { useForm } from "react-hook-form";
import hideEyeIcon from "../../assets/images/Hide.png";
import UserProfile from "../../assets/images/userP.svg";
import eyeIcon from "../../assets/images/Hide-2.png";
import TextInput from "../../Compoments/TextInput";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { connect } from "react-redux";
import { userPasswordUpdate, userProfileUpdate } from "../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "../../extras/constants";
import Link from "next/link";

const Profile = (props) => {
  const { userData } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [size, setSize] = useState("large");
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const pwd = watch("new_password");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showCNPassword, setShowCNPassword] = useState(false);
  const [fileImage1, setFileImage1] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: userData?.name,
    address: userData?.address && JSON.parse(`${userData?.address}`),
    email: userData?.email,
    languages: [userData?.languages],
  });

  // image
  const [fileImage, setFileImage] = useState({});
  let imageObj = [];
  let imageArray = [];
  const uploadImage = (e) => {
    imageObj.push(e.target.files);
    for (let i = 0; i < imageObj[0].length; i++) {
      imageArray.push(URL.createObjectURL(imageObj[0][i]));
    }
    let detail = {
      files: e.target.files,
      fileUrl: imageArray,
    };
    setFileImage(detail);
  };

  const options = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Spanish",
      label: "Spanish",
    },
  ];
  const handleChange = (value) => {
    setPayload({
      ...payload,
      languages: value,
    });
  };

  useEffect(() => {
    setPayload({
      ...payload,
      languages: userData?.languages,
    });
    setFileImage1({ fileUrl: userData?.profile_image });
  }, [userData]);

  const handleOnTourLocation = (e) => {
    setPayload((prev) => ({
      ...prev,
      address: {
        latitude: e?.geometry?.location?.lat(),
        longitude: e?.geometry?.location?.lng(),
        address: e?.formatted_address,
      },
    }));
  };
  const handleOnChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  // upsdate profile
  const handleOnSaveProfile = async (e) => {
    setLoader(true);
    let data = new FormData();
    data.append("name", payload.name);
    if (fileImage?.files?.length > 0) {
      data.append(
        "profile_image",
        fileImage?.files[0] ? fileImage?.files[0] : fileImage1?.fileUrl
      );
    }
    data.append("address", JSON.stringify(payload.address));
    payload.languages?.forEach((item) => data?.append("languages", item));
    try {
      const updateProfileResponse = await props?.dispatch(
        userProfileUpdate(data, props?.access_token)
      );
      if (updateProfileResponse.payload.status === 200) {
        toast.success(updateProfileResponse.payload?.data?.message, Toaster);
        setLoader(false);
      } else {
        setLoader(false);
        if (
          Array.isArray(updateProfileResponse.payload?.response.data.message)
        ) {
          updateProfileResponse.payload?.response.data.message?.forEach(
            (item) => {
              toast.error(item, Toaster);
            }
          );
        } else {
          setLoader(false);
          toast.error(
            updateProfileResponse.payload?.response?.data?.message,
            Toaster
          );
        }
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };

  // update passwsord
  const handleUpdatePassword = async (data) => {
    setLoading(true);
    try {
      const updatePasswordResponse = await props?.dispatch(
        userPasswordUpdate(data, props?.access_token)
      );
      if (updatePasswordResponse.payload.status === 200) {
        toast.success(updatePasswordResponse.payload?.data?.message, Toaster);
        setLoading(false);
        setShow(false);
      } else {
        setLoading(false);
        if (
          Array.isArray(updatePasswordResponse.payload?.response.data.message)
        ) {
          updatePasswordResponse.payload?.response.data.message?.forEach(
            (item) => {
              toast.error(item, Toaster);
            }
          );
        } else {
          setLoading(false);
          toast.error(
            updatePasswordResponse.payload?.response?.data?.message,
            Toaster
          );
        }
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };

  return (
    <PageLayout>
      <ToastContainer />
      <section className="profileSection">
        <div>
          <p className={style.breadCrumb}><Link style={{color: 'var(--primary)'}} href="/">Home</Link> / Profile Settings </p>
          <h2 className="mb-lg-4 mb-2"><strong>Profile Settings</strong></h2>
        </div>

        <Row className="mt-lg-4 mt-2">
          <Col xl="3" xs={12} sm="6" md="6" lg={4} className="mx-auto">
            <div className={style.profileContainer}>
              <input
                type="file"
                onChange={uploadImage}
                className={`form-control ${style.customProfile}`}
              />
              <div className={` ${style.editIcon}`}>
                <i className="fa fa-edit"></i>
              </div>

              {fileImage?.fileUrl && fileImage?.fileUrl?.length > 0 ? (
                <>
                  <Image
                    width={250}
                    height={250}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={fileImage?.fileUrl[0]}
                    alt="profile image"
                  />
                </>
              ) : (
                <div className={style.profileContainer}>
                  <input
                    type="file"
                    onChange={uploadImage}
                    className={`form-control ${style.customProfile}`}
                  />
                  <div className={` ${style.editIcon}`}>
                    <i className="fa fa-edit"></i>
                  </div>
                  <Image
                    width={250}
                    height={fileImage1?.fileUrl == "" ? 240 : 250}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      overflow: "hidden-",
                    }}
                    src={
                      fileImage1?.fileUrl == ""
                        ? UserProfile
                        : fileImage1?.fileUrl
                    }
                    alt="profile image"
                  />
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="mt-4">
                <h2 className="text-capitalize">{payload?.name}</h2>
              </div>
              <p className="mb-2">Password Settings</p>
              <button onClick={handleShow} className={style.btn__secondary}>
                Update Password
              </button>
            </div>
          </Col>
          <Col className="mt-4 mt-lg-0 mx-auto"  xs={12} sm="8" md="8"  xl="9" lg={8} >
            <div className={style.formSectionProfile}>
              <h2 className="mb-4">Profile Settings</h2>
              <Row>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label className={style.label}>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      value={payload?.name}
                      onChange={handleOnChange}
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label className={style.label}>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      value={payload?.email}
                      readOnly={true}
                      placeholder="jackiehenderson@gmail.com"
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label className={style.label}>Languages</Form.Label>
                    <Select
                      mode="tags"
                      size={size}
                      value={payload?.languages}
                      placeholder="Select Language"
                      onChange={handleChange}
                      style={{
                        width: "100%",
                      }}
                      options={options}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label className={style.label}>Address</Form.Label>
                    <ReactGoogleAutocomplete
                      apiKey={process.env.GOOGLE_MAP_API_KEY}
                      placeholder=" Enter your location"
                      className="form-control"
                      name="location"
                      defaultValue={
                        userData?.address
                          ? `${JSON.parse(userData?.address)?.address}`
                          : ""
                      }
                      onPlaceSelected={handleOnTourLocation}
                      options={{
                        fields: [
                          "address_components",
                          "formatted_address",
                          "geometry",
                        ],
                        types: ["address"],
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="col-lg-12 mt-3 mt-lg-4 d-flex align-items-center justify-content-end">
                {loader ? (
                  <button className="btn btn-md btn-primary btn-md fw-normal disabled">
                    <Spin />  &nbsp; loading...
                  </button>
                ) : (
                  <button
                    onClick={handleOnSaveProfile}
                    className="btn btn-primary btn-md fw-normal"
                  >
                    Save Profile
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* password Update Modal */}
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Body className="">
          <Modal.Header closeButton className="border-0">
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <div className="p-lg-4 p-3">
            <h2 className="mb-4"><strong>Update Password</strong></h2>

            <div className="form-group mb-3">
              <label>Current Password</label>
              <div className="position-relative">
                <TextInput
                  type={`${showPassword ? "text" : "password"}`}
                  name={"old_password"}
                  className={`form-control form-control-login `}
                  control={control}
                  showIcon={eyeIcon}
                  icon="true"
                  hideIcon={hideEyeIcon}
                  placeholder="Password"
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters long.",
                    },
                  }}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label>New Password</label>
              <div className="position-relative">
                <TextInput
                  type={`${showCPassword ? "text" : "password"}`}
                  name={"new_password"}
                  className={`form-control form-control-login `}
                  control={control}
                  showIcon={eyeIcon}
                  icon="true"
                  hideIcon={hideEyeIcon}
                  placeholder="New Password"
                  setShowPassword={setShowCPassword}
                  showPassword={showCPassword}
                  rules={{
                    required: "New Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters long.",
                    },
                  }}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Confirm New Password</label>
              <div className="position-relative">
                <TextInput
                  type={`${showCNPassword ? "text" : "password"}`}
                  name={"confirm_password"}
                  className={`form-control form-control-login `}
                  control={control}
                  showIcon={eyeIcon}
                  icon="true"
                  hideIcon={hideEyeIcon}
                  placeholder="Confirm Password"
                  setShowPassword={setShowCNPassword}
                  showPassword={showCNPassword}
                  rules={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === pwd || "Confirm Password does not match.",
                  }}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end py-lg-2 mt-lg-4 columnMobile">
              <button
                className="btn btn-md btn-secondary px-4 mx-lg-2 order-2 order-lg-1 width100Mobile"
                onClick={handleClose}
              >
                Cancel
              </button>

              {loading ? (
                <button className="btn btn-md btn-primary btn-md my-3 order-1 order-lg-2  fw-normal disabled">
                  <Spin /> &nbsp; loading...
                </button>
              ) : (
                <button
                  className="btn btn-md btn-primary px-4 my-3 order-1 order-lg-2 width100Mobile"
                  onClick={handleSubmit(handleUpdatePassword)}
                >
                  Update Password
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

const mapStoreProps = (state) => {
  return state?.userAuthReducer;
};

export default connect(mapStoreProps)(Profile);

export async function getServerSideProps(context) {
  const get = context.req.cookies["access_token"];
  if (get) {
    return {
      props: {
        get,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
