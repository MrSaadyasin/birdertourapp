import React, { useEffect, useState } from "react";
import style from "./Sidebar.module.css";
import Link from "next/link";
import {
  BookingIcon,
  ChatIcon,
  DashboardIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
} from "../../icons";
import { Modal } from "antd";
import { authLogoutUser } from "../../../Redux/auth/action";
import { connect } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import Router from "next/router";

const Sidebar = (props) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [logout, setUserLogout] = useState(false);
  const getAccessToken = getCookie("access_token");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (getAccessToken) {
      setUserLoggedIn(true);
      setUserData(props?.userAuthReducer?.userData);
    } else {
      setUserLoggedIn(false);
    }
  }, [getAccessToken, logout, props?.userAuthReducer?.userData]);

  // Logout Function
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await props?.dispatch(authLogoutUser(getAccessToken));
      setModal1Open(false)
      deleteCookie("access_token");
      setUserLogout(!logout);
      Router.push('/')
    } catch (error) {
      deleteCookie("access_token");
      setUserLogout(!logout);
    }
  };
  const URL = Router.router?.state?.pathname;
  console.log({URL})
  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.sideMenu}>
          <ul className={style.sidebar__nav}>
            <li className="sidebar__nav-item">
            

              <Link className={
                    URL == "/wishlists"
                      ? "sidebar__nav-item-link active"
                      : "sidebar__nav-item-link"
                  } href="/wishlists">
                <span className="sidebar__nav-link__icon">
                  <NotificationIcon />
                </span>
                <span className="sidebar__nav-link__text">Wishlists</span>
              </Link>
            </li>

            <li className="sidebar__nav-item">
              <Link className={
                    URL == "/chats"
                      ? "sidebar__nav-item-link active"
                      : "sidebar__nav-item-link"
                  } href="/chats">
                <span className="sidebar__nav-link__icon">
                  <ChatIcon />
                </span>
                <span className="sidebar__nav-link__text">Chats</span>
              </Link>
            </li>

            <li className="sidebar__nav-item">
              <Link className={
                    URL == "/bookings"
                      ? "sidebar__nav-item-link active"
                      : "sidebar__nav-item-link"
                  } href="/bookings">
                <span className="sidebar__nav-link__icon">
                  <BookingIcon />
                </span>
                <span className="sidebar__nav-link__text">Bookings</span>
              </Link>
            </li>

            {/*<li className="sidebar__nav-item">*/}
            {/*  <Link className="sidebar__nav-item-link" href="/notifications">*/}
            {/*    <span className="sidebar__nav-link__icon">*/}
            {/*      <NotificationIcon />*/}
            {/*    </span>*/}
            {/*    <span className="sidebar__nav-link__text">Notifications</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}

            <li className="sidebar__nav-item">
              <Link className={
                    URL == "/profile"
                      ? "sidebar__nav-item-link active"
                      : "sidebar__nav-item-link"
                  } href="/profile">
                <span className="sidebar__nav-link__icon">
                  <ProfileIcon />
                </span>
                <span className="sidebar__nav-link__text">
                  Profile Settings
                </span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <div
                onClick={() => setModal1Open(true)}
                className="sidebar__nav-item-link"
              >
                <span className="sidebar__nav-link__icon">
                  <LogoutIcon />
                </span>
                <span className="sidebar__nav-link__text">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      
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
export default connect(mapStoreProps)(Sidebar);
