import React from "react";
import ChatIcon from "../assets/images/userP.svg";
import Image from "next/image";
import style from "../pages/chats/Chat.module.css";
import { BarIcon } from "./icons";
import { connect } from "react-redux";

const SingleChat = (props) => {
  const { read, userProfile } = props;

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex flex-1">
        <Image
          height={40}
          width={40}
          src={
            userProfile?.vendor?.profile_image
              ? userProfile?.vendor?.profile_image
              : ChatIcon
          }
          alt="user avatar"
        />
        <div>
          <h6 className="mb-0 text-capitalize">{userProfile?.vendor?.name}</h6>
          <p>{userProfile?.message}.</p>
        </div>
      </div>
      <div>
        {userProfile?.unreadCount === 0 ? (
          <span>{/* <BarIcon /> */}</span>
        ) : (
          <span className={style.customBadge}>{userProfile?.unreadCount}</span>
        )}
      </div>
    </div>
  );
};

const mapStoreProps = (state) => {
  return state;
};
export default connect(mapStoreProps)(SingleChat);
