import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/earthLogo.png";
import LogoBlack from "../../assets/images/blackLogo.png";
import Avatar from "../../assets/images/userP.svg";

import CustomModal from "../Modals/CustomModal";
import { deleteCookie, getCookie } from "cookies-next";
import { connect } from "react-redux";
import { authLogoutUser } from "../../Redux/auth/action";
import SingleNotification from "../SingleNotification/SingleNotification";
import {
  BarIcon,
  BookingIcon,
  ChatIcon,
  CreateAccountIcon,
  GeneralIcon,
  LoginIcon,
  LogoutIcon,
  Notification,
  NotificationIcon,
  ProfileIcon,
} from "../icons";
import { Modal } from "antd";
import Pusher from "pusher-js";
import { Toaster } from "../../extras/constants";
import { toast, ToastContainer } from "react-toastify";
import Router from "next/router";
import axios from "axios";
import { allMessageProfile } from "../../constants/endpoint.constants";
import SearchBar from "../SeacrhBar/SearchBar";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const {
    menu,
    color,
    dashborad,
    setModalOpen,
    tours = [],
    setSearchTours,
    setSearch,
    discoverBirdRef,
    HomeScreen,
    seacrhBar,
  } = props;
  // const {access_token  } = props?.userAuthReducer?.access_token;
  const [loginModal, setLoginModal] = useState(setModalOpen);
  const [roleModal, setRoleModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const getAccessToken = getCookie("access_token");
  const [userData, setUserData] = useState({});
  const [logout, setUserLogout] = useState(false);
  const [language, setLanguage] = useState("English");
  const [modal1Open, setModal1Open] = useState(false);
  const [unreadMessage, setUnreadMessage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  For Chat Notificaiton
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });

    if (props?.userAuthReducer.userData?._id) {
      let channelName;
      if (props?.userAuthReducer?.userData?.role === "admin") {
        channelName = `earth-birder-admin`;
      } else {
        channelName = `earth-birder-${props?.userAuthReducer?.userData?._id}`;
      }

      pusher.connection.bind("connected", () => {
        // After the connection is established, proceed with binding to the channel
        const channel = pusher.subscribe(channelName);

        // Add error handling for unsubscription and event binding
        channel.bind("subscription_error", (status) => {
          console.error("Subscription Error:", status);
        });

        // channel.bind('notification-event', (data) => {
        //   // alert(data.message);
        //   toast.success("You have received new notification", Toaster)
        // });

        // Chat
        channel.bind("message-event", (data) => {
          toast.success("You have received new chat", Toaster);
          setLoading(true);
        });
      });
    }

    // Unsubscribe and disconnect on component unmount
    return () => {
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    if (getAccessToken) {
      setUserLoggedIn(true);
      setUserData(props?.userAuthReducer?.userData);
    } else {
      setUserLoggedIn(false);
    }
  }, [getAccessToken, logout, props?.userAuthReducer?.userData]);

  const getAllNewChat = async () => {
    try {
      const getAllMessageList = await axios.get(allMessageProfile, {
        headers: {
          Authorization: `Bearer ${props?.userAuthReducer?.access_token}`,
        },
      });
      console.log({ getAllMessageList });
      let newUnread = 0;
      const getUnreadMessages = getAllMessageList?.data?.profileList?.map(
        (item) => {
          if (item?.unreadCount > 0) {
            newUnread++;
            return item;
          } else {
            return item;
          }
        }
      );
      setUnreadMessage(newUnread);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props?.userAuthReducer?.access_token && loading && !dashborad) {
      getAllNewChat();
    }
  }, [loading]);

  // Logout Function
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await props?.dispatch(authLogoutUser(getAccessToken));
      setModal1Open(false);
      Router.push("/");
      setShow(false);
      deleteCookie("access_token");
      setUserLogout(!logout);
    } catch (error) {
      deleteCookie("access_token");
      setUserLogout(!logout);
      Router.push("/");
      setShow(false);
    }
  };
  const { i18n, t } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      {/* for desktop view */}
      <Navbar
        expand="lg"
        className={
          color == "#1b847a"
            ? `fixed-top d-none d-lg-block  ${style.topbar__menu1}`
            : `fixed-top  d-none d-lg-block ${style.topbar__menu}`
        }
        id="myTopnav"
      >
        {menu ? (
          <Container fluid className="px-0">
            <Link href={"/"}>
              <Image src={Logo} alt="Picture of the author" width={160} />
            </Link>

            <Navbar.Toggle aria-controls="navbarScroll" />
            {seacrhBar && (
              <SearchBar
                tours={tours}
                HomeScreen={HomeScreen}
                setSearch={setSearch}
                setSearchTours={setSearchTours}
                discoverBirdRef={discoverBirdRef}
              />
            )}
            {!userLoggedIn ? (
              <div className="d-flex mb-2 mb-lg-0">
                <select
                  onChange={changeLanguage}
                  style={{
                    width: "150px",
                    color: "white",
                    marginRight: "10px",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                  }}
                >
                  <option style={{ color: "black" }} value={"en"}>
                    English
                  </option>
                  <option style={{ color: "black" }} value={"es"}>
                    Español
                  </option>
                  <option style={{ color: "black" }} value={"ar"}>
                    Arabic
                  </option>
                  <option style={{ color: "black" }} value={"fr"}>
                    French
                  </option>
                  <option style={{ color: "black" }} value={"ge"}>
                    German
                  </option>
                  <option style={{ color: "black" }} value={"ch"}>
                    Chinese
                  </option>
                  <option style={{ color: "black" }} value={"ru"}>
                    Russian
                  </option>
                  <option style={{ color: "black" }} value={"urd"}>
                    Urdu
                  </option>
                </select>
                <button
                  onClick={() => setLoginModal(!loginModal)}
                  className="btnPrimaryOutline mx-2"
                >
                  {t("Login")}
                </button>
                <button
                  onClick={() => setRoleModal(!roleModal)}
                  className="btnPrimary"
                >
                  {t("signUp")}
                </button>
              </div>
            ) : (
              <div className="d-flex">
                {!dashborad && unreadMessage > 0 && (
                  <div className="mx-2">
                    <Link
                      href={"/chats"}
                      id="dropdown-basic"
                      className={`p-0 position-relative ${style.avatar}`}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className={`d-flex align-items-center border-0 p-1 ${style.menuBorder} ${style.nottti}`}
                      >
                        <span className={style.ativeBadge}>
                          {unreadMessage}
                        </span>
                        {/*<Notification />*/}
                        <ChatIcon />
                      </div>
                    </Link>

                    {/*<Dropdown.Menu*/}
                    {/*  className={`${style.dropdown__menu} shadow d-none`}*/}
                    {/*  style={{ width: "26rem", padding: "8px" }}*/}
                    {/*>*/}
                    {/*  <div className="d-flex p-3 align-items-center justify-content-between">*/}
                    {/*    <h4>Notifications</h4>*/}
                    {/*    <small*/}
                    {/*      style={{ color: "var(--blue)", cursor: "pointer" }}*/}
                    {/*    >*/}
                    {/*      Mark all as read*/}
                    {/*    </small>*/}
                    {/*  </div>*/}
                    {/*  {[1, 2, 3, 4, 5]?.map((item, index) => {*/}
                    {/*    return (*/}
                    {/*      <div key={index} className={style.notification}>*/}
                    {/*        <div className="d-flex align-items-center ">*/}
                    {/*          <div*/}
                    {/*            className={style.notify}*/}
                    {/*            style={{ height: "40px", width: "40px" }}*/}
                    {/*          >*/}
                    {/*            <GeneralIcon />*/}
                    {/*          </div>*/}
                    {/*          <div*/}
                    {/*            className="mx-2 px-1"*/}
                    {/*            style={{ lineHeight: 1.25 }}*/}
                    {/*          >*/}
                    {/*            <p className={style.heading}>*/}
                    {/*              Password Updated*/}
                    {/*            </p>*/}
                    {/*            <p className={style.description}>*/}
                    {/*              Your password has been updated.*/}
                    {/*            </p>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="mx-2">*/}
                    {/*          <small className={style.time}>3 mins ago</small>*/}
                    {/*        </div>*/}
                    {/*      </div>*/}
                    {/*    );*/}
                    {/*  })}*/}

                    {/*  <div className="text-center p-3">*/}
                    {/*    <Link className="text-danger" href="/notifications">*/}
                    {/*      <small>See more </small>*/}
                    {/*    </Link>*/}
                    {/*  </div>*/}
                    {/*</Dropdown.Menu>*/}
                  </div>
                )}

                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className={`p-0 ${style.avatar}`}
                  >
                    <div
                      className={`d-flex align-items-center border p-1 ${style.menuBorder}`}
                    >
                      <div className="position-relative">
                        {/*<span className={style.ativeBadgeUser}></span>*/}
                        <Image
                          src={
                            userData?.profile_image
                              ? userData?.profile_image
                              : Avatar
                          }
                          width={40}
                          height={40}
                          style={{ borderRadius: "8px" }}
                          alt="User Avatar image"
                        />
                      </div>

                      <div
                        className="mx-2 text-left"
                        style={{ lineHeight: "18px" }}
                      >
                        <div className="mb-0 text-small text-capitalize textBlack">
                          {userData?.name}
                        </div>
                        <small className="mb-0 textBlack">
                          {userData?.email}
                        </small>
                      </div>
                    </div>
                  </Dropdown.Toggle>
                  {!dashborad && (
                    <Dropdown.Menu className={`${style.dropdown__menu} shadow`}>
                      <Link
                        className={`${style.dropdownitem} dropdown-item px-3 py-1`}
                        href={"/wishlists"}
                      >
                        Dashboard
                      </Link>

                      <Dropdown.Item
                        className={`${style.dropdownitem}`}
                        href="#"
                        // onClick={handleLogout}
                        onClick={() => setModal1Open(true)}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
            )}
          </Container>
        ) : (
          <Container fluid className="px-0">
            <Navbar.Brand href="/">
              <Image
                src={LogoBlack}
                className="d-none d-lg-block"
                alt="Picture of the author"
              />
              <Image
                src={Logo}
                className="d-lg-none d-block"
                alt="Picture of the author"
              />
            </Navbar.Brand>
          </Container>
        )}
      </Navbar>
      {/* for mobile view */}
      <Navbar
        className={
          color == "#1b847a"
            ? `fixed-top d-block d-lg-none  ${style.topbar__menu1}`
            : `fixed-top  d-block d-lg-none ${style.topbar__menu}`
        }
        id="myTopnav1"
      >
        {menu ? (
          <Container fluid className="px-0">
            <Link href={"/"}>
              <Image
                style={{ width: 140, height: "auto" }}
                src={Logo}
                alt="Picture of the author"
              />
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />

            {!userLoggedIn ? (
              <div className="d-flex mb-2 mb-lg-0" onClick={handleShow}>
                <svg
                  width="32"
                  height="16"
                  viewBox="0 0 32 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.8124 3.9504C29.5616 3.9504 29.3071 3.9504 29.0563 3.9504C28.3702 3.9504 27.6842 3.9504 26.9981 3.9504C25.9838 3.9504 24.9658 3.9504 23.9515 3.9504C22.7122 3.9504 21.4729 3.9504 20.2336 3.9504C18.8689 3.9504 17.5079 3.9504 16.1432 3.9504C14.7711 3.9504 13.4027 3.9504 12.0306 3.9504C10.7544 3.9504 9.47457 3.9504 8.19838 3.9504C7.11768 3.9504 6.04067 3.9504 4.95997 3.9504C4.18172 3.9504 3.40715 3.9504 2.6289 3.9504C2.26006 3.9504 1.89123 3.95409 1.52607 3.9504C1.51132 3.9504 1.49288 3.9504 1.47812 3.9504C0.707251 3.9504 -0.0341167 3.27174 0.00276756 2.47504C0.03965 1.67466 0.651924 0.999686 1.47812 0.999686C1.72894 0.999686 1.98343 0.999686 2.23425 0.999686C2.92029 0.999686 3.60633 0.999686 4.29237 0.999686C5.30668 0.999686 6.32468 0.999686 7.33899 0.999686C8.57829 0.999686 9.81759 0.999686 11.0569 0.999686C12.4216 0.999686 13.7826 0.999686 15.1473 0.999686C16.5194 0.999686 17.8878 0.999686 19.2599 0.999686C20.5361 0.999686 21.8159 0.999686 23.0921 0.999686C24.1728 0.999686 25.2498 0.999686 26.3305 0.999686C27.1088 0.999686 27.8834 0.999686 28.6616 0.999686C29.0304 0.999686 29.3993 0.995998 29.7644 0.999686C29.7792 0.999686 29.7976 0.999686 29.8124 0.999686C30.5833 0.999686 31.3246 1.67835 31.2877 2.47504C31.2509 3.27543 30.6386 3.9504 29.8124 3.9504Z"
                    fill="white"
                  />
                  <path
                    d="M29.8124 12.4674C29.1153 12.4674 28.4145 12.4674 27.7174 12.4674C26.0539 12.4674 24.3904 12.4674 22.7233 12.4674C20.6984 12.4674 18.6734 12.4674 16.6522 12.4674C14.915 12.4674 13.174 12.4674 11.4368 12.4674C10.5885 12.4674 9.74014 12.4784 8.8918 12.4674C8.88074 12.4674 8.86967 12.4674 8.85492 12.4674C8.08405 12.4674 7.34268 11.7887 7.37956 10.992C7.41644 10.1916 8.02872 9.51664 8.85492 9.51664C9.55203 9.51664 10.2528 9.51664 10.9499 9.51664C12.6134 9.51664 14.2769 9.51664 15.944 9.51664C17.9689 9.51664 19.9939 9.51664 22.0151 9.51664C23.7523 9.51664 25.4933 9.51664 27.2305 9.51664C28.0788 9.51664 28.9272 9.50557 29.7755 9.51664C29.7866 9.51664 29.7976 9.51664 29.8124 9.51664C30.5833 9.51664 31.3246 10.1953 31.2877 10.992C31.2509 11.7924 30.6386 12.4674 29.8124 12.4674Z"
                    fill="white"
                  />
                  <path
                    d="M29.8124 20.9947C29.3624 20.9947 28.9124 20.9947 28.4624 20.9947C27.3817 20.9947 26.2973 20.9947 25.2166 20.9947C23.9073 20.9947 22.5979 20.9947 21.2922 20.9947C20.1672 20.9947 19.0386 20.9947 17.9136 20.9947C17.364 20.9947 16.8108 21.0058 16.2575 20.9947C16.2502 20.9947 16.2428 20.9947 16.2354 20.9947C15.4645 20.9947 14.7232 20.316 14.76 19.5193C14.7969 18.719 15.4092 18.044 16.2354 18.044C16.6854 18.044 17.1354 18.044 17.5854 18.044C18.6661 18.044 19.7504 18.044 20.8311 18.044C22.1405 18.044 23.4499 18.044 24.7556 18.044C25.8806 18.044 27.0092 18.044 28.1342 18.044C28.6837 18.044 29.237 18.0329 29.7903 18.044C29.7976 18.044 29.805 18.044 29.8124 18.044C30.5833 18.044 31.3246 18.7226 31.2877 19.5193C31.2509 20.3197 30.6386 20.9947 29.8124 20.9947Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="d-flex">
                <div className="position-relative" onClick={handleShow}>
                  <Image
                    src={
                      userData?.profile_image ? userData?.profile_image : Avatar
                    }
                    width={40}
                    height={40}
                    style={{ borderRadius: "8px", height: 40, width: 40 }}
                    alt="User Avatar image 111"
                  />
                </div>
              </div>
            )}
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!userLoggedIn ? (
                  <>
                    <div
                      onClick={() => {
                        Router.push("/");
                        setShow(false);
                      }}
                    >
                      <Image src={LogoBlack} alt="Picture of the author" />
                    </div>
                    <p className="small my-3">
                      Welcome to <strong>Earthbirder</strong>, your ultimate sanctuary for bird
                      enthusiasts!
                    </p>
                  </>
                ) : (
                  <div className="px-2">
                    <div>
                      <Image
                        src={
                          userData?.profile_image
                            ? userData?.profile_image
                            : Avatar
                        }
                        height={100}
                        width={100}
                        style={{ borderRadius: 8 }}
                        alt="Picture of the author"
                      />
                    </div>
                    <h3
                      className=" mb-2 mt-2 text-capitalize"
                      style={{ fontWeight: 600 }}
                    >
                      {userData?.name}
                    </h3>
                    <div
                      onClick={() => {
                        Router.push("/profile");
                        setShow(false);
                      }}
                    >
                      <h3
                        className="small mb-3 mt-2 text-capitalize"
                        style={{ color: "#8F4D3D", fontWeight: 600 }}
                      >
                        View Profile
                      </h3>
                    </div>
                  </div>
                )}

                <hr style={{ opacity: 0.1 }} className="my-4" />
                {!userLoggedIn ? (
                  <div>
                    <div
                      onClick={() => {
                        setLoginModal(!loginModal);
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <LoginIcon />
                      </span>{" "}
                      {`${t("Login")}`}
                    </div>
                    <div
                      onClick={() => {
                        setRoleModal(!roleModal);
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <CreateAccountIcon />
                      </span>{" "}
                      {`${t("CreateAccount")}`}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      onClick={() => {
                        Router.push("/");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <LoginIcon />
                      </span>{" "}
                      Home
                    </div>
                    <div
                      onClick={() => {
                        Router.push("/chats");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <ChatIcon />
                      </span>{" "}
                      Chats
                    </div>

                    <div
                      onClick={() => {
                        Router.push("/bookings");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <BookingIcon />
                      </span>{" "}
                      Bookings
                    </div>

                    <div
                      onClick={() => {
                        Router.push("/wishlists");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0013 18.0423C9.74297 18.0423 9.49297 18.009 9.28464 17.934C6.1013 16.8423 1.04297 12.9673 1.04297 7.24232C1.04297 4.32565 3.4013 1.95898 6.3013 1.95898C7.70964 1.95898 9.0263 2.50898 10.0013 3.49232C10.9763 2.50898 12.293 1.95898 13.7013 1.95898C16.6013 1.95898 18.9596 4.33398 18.9596 7.24232C18.9596 12.9757 13.9013 16.8423 10.718 17.934C10.5096 18.009 10.2596 18.0423 10.0013 18.0423ZM6.3013 3.20898C4.09297 3.20898 2.29297 5.01732 2.29297 7.24232C2.29297 12.934 7.76797 16.1007 9.69297 16.759C9.84297 16.809 10.168 16.809 10.318 16.759C12.2346 16.1007 17.718 12.9423 17.718 7.24232C17.718 5.01732 15.918 3.20898 13.7096 3.20898C12.443 3.20898 11.268 3.80065 10.5096 4.82565C10.2763 5.14232 9.74297 5.14232 9.50963 4.82565C8.73463 3.79232 7.56797 3.20898 6.3013 3.20898Z"
                            fill="black"
                            fill-opacity="0.75"
                          />
                        </svg>
                      </span>{" "}
                      Wishlists
                    </div>

                    {/* <div
                      onClick={() => {
                        Router.push("/");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center  px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <NotificationIcon />
                      </span>{" "}
                      Notifications
                    </div> */}
                    <hr style={{ opacity: 0.1 }} className="my-4" />
                    <div
                      onClick={() => {
                        Router.push("/profile");
                        setShow(false);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <ProfileIcon />
                      </span>{" "}
                      Profile Settings
                    </div>

                    <div
                      onClick={() => {
                        setShow(false);
                        setModal1Open(true);
                      }}
                      className={`${style.mobileMenu} d-flex align-items-center pb-3 px-3 mb-1`}
                    >
                      <span className="d-inline-flex" style={{ width: 30 }}>
                        <LogoutIcon />
                      </span>{" "}
                      Logout
                    </div>
                  </div>
                )}
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        ) : (
          <Container fluid className="px-0">
            <Navbar.Brand href="/">
              <Image
                src={LogoBlack}
                className="d-none d-lg-block"
                alt="Picture of the author"
              />
              <Image
                src={Logo}
                className="d-lg-none d-block"
                alt="Picture of the author"
              />
            </Navbar.Brand>
          </Container>
        )}
      </Navbar>
      <CustomModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        roleModal={roleModal}
        setRoleModal={setRoleModal}
      />

      <Modal
        title=""
        centered
        width={500}
        style={{
          top: 20,
        }}
        footer={[
          <button
            key="submit"
            className="btn  mx-2 btn-md btn-secondary"
            type="primary"
            onClick={() => setModal1Open(false)}
          >
            Cancel
          </button>,
          <button
            key="submit"
            className="btn btn-md btn-primary"
            type="primary"
            onClick={handleLogout}
          >
            Logout
          </button>,
        ]}
        open={modal1Open}
        // onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <div className="text-center p-4 pt-5">
          <h3 className="mb-0">
            Are you sure you want logout from your account?
          </h3>
        </div>
      </Modal>
    </>
  );
};
const mapStoreProps = (state) => {
  return state;
};
export default connect(mapStoreProps)(Header);
