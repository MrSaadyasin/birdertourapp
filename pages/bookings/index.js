import React, { useState } from "react";
import style from "./Booking.module.css";
import PageLayout from "../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout";
import { Table } from "antd";
import Avatar from "../../assets/images/userAvatar.png";
import Image from "next/image";
import {
  CalenderIcon,
  ClockIcon,
  MapIcon,
  ProfileIcon,
} from "../../Compoments/icons";
import axios from "axios";
import { baseUrl } from "../../constants/baseurl.constants";
import moment from "moment";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import { BookingRow } from "../../Compoments/booking/BookingRow";
import { NoBookingData } from "../../Compoments/booking/NoBookingData";

const Booking = (props) => {
  const [activeTab, setActiveTab] = useState("Upcoming Tours");
  console.log("prps", props);
  const [top] = useState("bottomCenter");
  const [bottom] = useState("bottomRight");
  const isMobile = useMediaQuery("(min-width:991px)");
  const isMobile1 = useMediaQuery("(max-width:991px)");

  const data = [];

  props?.history?.bookingHistories?.forEach((item, key) => {
    return data.push({
      key: item?._id,
      tour: (
        <div className="d-flex">
          <div className="mt-2">
            <div className={style.table__title}>{item?.tour?.name}</div>
            <p className={style.text__muted}>Salton Sea, US</p>
          </div>
        </div>
      ),
      dateTime: (
        <div className="d-flex">
          <div className="mt-2">
            <div className={style.table__title}>
              {moment(item?.date).format("DD MMM, YYYY")}
            </div>
            <p className={style.text__muted}>{item?.booked_slot}</p>
          </div>
        </div>
      ),
      tourType: (
        <div className="d-flex">
          <div className="mt-2">
            <div className={style.table__title}>
              {item?.booking_type === "full_day"
                ? "Full Day"
                : item?.booking_type === "half_day"
                ? "Half Day"
                : "Hourly Base"}
            </div>
            {/*<p className={style.text__muted}>6 Hours</p>*/}
          </div>
        </div>
      ),
      payment: (
        <>
          <div className="d-flex">
            <div className="mt-2">
              <div className={style.table__title}>${item?.total}</div>
              <p className={style.text__muted}>{item?.extra_person} Extras</p>
            </div>
          </div>
        </>
      ),
      bookedBy: (
        <>
          <div className="d-flex">
            <div className="mt-2 d-flex align-items-center">
              <Image
                src={
                  item?.vendor?.profile_image
                    ? item?.vendor?.profile_image
                    : Avatar
                }
                alt="Table image"
                width={50}
                height={50}
                className={style.imageTable}
                style={{ borderRadius: "50%" }}
              />
              <div className={style.table__title}>{item?.vendor?.name}</div>
            </div>
          </div>
        </>
      ),
      action: (
        <>
          <div className="d-flex">
            <button className={style.btn__Payment}>
              {item?.payment_status === "paid"
                ? "Payment Received"
                : item?.payment_status === "unpaid"
                ? "Payment Cancelled"
                : "Payment Pending"}
            </button>
          </div>
        </>
      ),
    });
  });
  const columns = [
    {
      title: "Tours",
      dataIndex: "tour",
      width: 450,
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      width: 250,
    },
    {
      title: "Tour Type",
      dataIndex: "tourType",
      width: 250,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      width: 250,
    },
    {
      title: "Tour Guide",
      dataIndex: "bookedBy",
      width: 450,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 250,
    },
  ];

  return (
    <PageLayout>
      <p className={style.breadCrumb}>
        <Link style={{ color: "var(--primary)" }} href="/">
          Home
        </Link>{" "}
        / Bookings{" "}
      </p>
      <h2 className="mb-4">
        <strong>Bookings</strong>
      </h2>
      <section className={style.bookingSection}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className={`${style.tab__container}`}>
              <button
                onClick={() => setActiveTab("Upcoming Tours")}
                className={
                  activeTab == "Upcoming Tours"
                    ? style.btn__secondary
                    : style.btn__secondaryOutline
                }
              >
                Upcoming Tours
              </button>
              <button
                onClick={() => setActiveTab("Pending")}
                className={
                  activeTab == "Pending"
                    ? style.btn__secondary
                    : style.btn__secondaryOutline
                }
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab("Rejected")}
                className={
                  activeTab == "Rejected"
                    ? style.btn__secondary
                    : style.btn__secondaryOutline
                }
              >
                Rejected
              </button>
              <button
                onClick={() => setActiveTab("Booking History")}
                className={
                  activeTab == "Booking History"
                    ? style.btn__secondary
                    : style.btn__secondaryOutline
                }
              >
                Booking History
              </button>
            </div>
          </div>
          <div>{/*<RangePicker size={size} />*/}</div>
        </div>

        <div className={style.active__datatable}>
          {activeTab === "Upcoming Tours" && (
            <>
              {props?.upcoming?.bookings?.length > 0 ? (
                props?.upcoming?.bookings?.map((item, index) => {
                  return (
                    <div key={index}>
                      <BookingRow item={item} activeTab={activeTab} />
                    </div>
                  );
                })
              ) : <NoBookingData/>}
            </>
          )}
          {activeTab === "Pending" && (
            <>
              {props?.pending?.bookings?.length > 0 ? (
                props?.pending?.bookings?.map((item, index) => {
                  return (
                    <div key={index}>
                      <BookingRow item={item} activeTab={activeTab} token={props.token}/>
                    </div>
                  );
                })
              ) : <NoBookingData/>}
            </>
          )}
           {activeTab === "Rejected" && (
            <>
              {props?.rejected?.bookings?.length > 0 ? (
                props?.rejected?.bookings?.map((item, index) => {
                  return (
                    <div key={index}>
                      <BookingRow item={item} activeTab={activeTab} />
                    </div>
                  );
                })
              ) : <NoBookingData/>}
            </>
          )}
          {activeTab === "Booking History" && (
            <div className="">
              <Table
                pagination={{
                  pageSize: 5,
                  position: [top, bottom],
                }}
                dataSource={data}
                columns={columns}
                scroll={{ x: isMobile1 && "100%" }}
              />
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Booking;

export async function getServerSideProps(context) {
  const get = context.req.cookies["access_token"];
  if (get) {
    try {
      const [upcomingBooking,pendingBooking,rejectedBooking, HistoryBooking] = await Promise.all([
        fetch(baseUrl + "/booking/user/upcoming", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Bearer ${get}`,
          },
        }),
        fetch(baseUrl + "/booking/user/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Bearer ${get}`,
          },
        }),
        fetch(baseUrl + "/booking/user/rejected", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Bearer ${get}`,
          },
        }),
        fetch(baseUrl + "/booking/user/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Bearer ${get}`,
          },
        }),
      ]);
      const upcoming = await upcomingBooking.json();
      const pending = await pendingBooking.json();
      const rejected = await rejectedBooking.json();
      const history = await HistoryBooking.json();
      return {
        props: {
          upcoming,
          pending,
          rejected,
          history,
          token:get
        },
      };
    } catch (e) {
      return {
        props: {
          upcoming: [],
          history: [],
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
