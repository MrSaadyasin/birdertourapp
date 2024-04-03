import React from "react";
import { BarIcon, ErrorIcon, GeneralIcon, SuccessIcon } from "../icons";
import style from "../../pages/notifications/Notification.module.css";

const SingleNotification = (props) => {
  return (
    <>
      <div className={style.notification}>
        <div className="d-flex align-items-center ">
          {props.success == "success" ? (
            <SuccessIcon />
          ) : props.success == "error" ? (
            <ErrorIcon />
          ) : (
            <GeneralIcon />
          )}

          <div className="mx-2 px-1" style={{ lineHeight: 1.25 }}>
            <p className={style.heading}>Password Updated</p>
            <p className={style.description}>Your password has been updated.</p>
          </div>
        </div>
        <div className="mx-2">
          <small className={style.time}>3 mins ago</small>
          <BarIcon />
        </div>
      </div>
    </>
  );
};

export default SingleNotification;
