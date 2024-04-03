import React, { useState } from "react";
import style from "./Notification.module.css";
import PageLayout from "../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout";
import Image from "next/image";
import { BarIcon, SuccessIcon } from "../../Compoments/icons";
import SingleNotification from "../../Compoments/SingleNotification/SingleNotification";
import EmptyNotification from "../../assets/images/emptyNotifiation.png";
import Link from "next/link";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("General");
  const notification = [
    { notify: "success", id: 1 },
    { notify: "error", id: 2 },
    { notify: "", id: 3 },
  ];

  return (
    <PageLayout title="Notifications">
       <p className={style.breadCrumb}><Link style={{color: 'var(--primary)'}} href="/">Home</Link> /  Notifications </p>
       <h2>Notifications</h2>
      <section className={style.notificationSection}>
        <div className={style.active__datatable}>
          <>
            {" "}
            {notification && notification?.length > 0 ? (
              <>
                <h3 className="mb-3">New</h3>{" "}
                {notification?.map((item, index) => {
                  return (
                    <>
                      <SingleNotification success={item.notify} />
                    </>
                  );
                })}
                <h3 className="mb-3 mt-5">Past Notifications</h3>{" "}
                {notification?.map((item, index) => {
                  return (
                    <>
                      <SingleNotification success={item.notify} />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <div className={style.notificationContainer}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                      <Image
                        src={EmptyNotification}
                        alt="notification not found"
                      />
                      <p className="mt-4">
                        There are no new notifications from any clients!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </section>
    </PageLayout>
  );
};

export default Notification;
