import { Button, Dropdown } from "antd";
import moment from "moment";
import React from "react";
import style from "../../pages/bookings/Booking.module.css";
import { useMediaQuery } from "usehooks-ts";
import { ChatIcon, ClockIcon, MapIcon, ProfileIcon } from "../icons";
import Image from "next/image";
import Avatar from "../../assets/images/userAvatar.png";
import { useState } from "react";
import { BookingDetailModal } from "./BookingDetailModal";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "../../extras/constants";
import { storeBookingId } from "../../Redux/auth/action";
import axios from "axios";
import { baseUrl } from "../../constants/baseurl.constants";
import Router from "next/router";
import { sendChatMessage } from "../../constants/endpoint.constants";

export const BookingRow = ({ item, activeTab, token }) => {
  const isMobile = useMediaQuery("(min-width:991px)");
  const [openBookingModal, setOpenBookingModal] = useState(false);
  let tourPrice;
  if (item?.booking_type === "full_day" || item?.booking_type === "multi_day") {
    tourPrice = JSON.stringify(item.tour.pricing.full_day).price;
  } else {
    tourPrice = JSON.stringify(item.tour.pricing.half_day).price;
  }
  // pay now
  const payNow = async () => {
    const data = {
      booking_id: item._id,
    };

    try {
      const confirmBooking = await axios.post(
        `${baseUrl}/booking/payment`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Router.push(confirmBooking?.data?.booking?.url);
    } catch (error) {
      console.log(error);
    }
  };

  // chat with vendor
  const handleNewMessage = async () => {
    if (item?.user) {
      const newMessage = {
        type: "user",
        message: `Hi! I have a question about one of your ${item?.tour?.name} tour`,
        user: item?.user,
        vendor: item?.vendor?._id,
        sender: item?.user,
        receiver: item?.vendor?._id,
      };

      try {
        const sendMessage = await axios.post(sendChatMessage, newMessage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Router.push("/chats");
        Router.push({pathname:"/chats",query:{vendor:item?.vendor?._id}});

      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("You are not logged in.", Toaster);
    }
  };
  return (
    <div className="mb-3" key={item?._id}>
      <div className={`  ${style.upcomingTour}`}>
        <div className="d-lg-flex text-lg-center">
          <div
            className="flex-75 p-lg-2 mb-3 mb-lg-0"
            style={{ borderRight: isMobile && "1px solid #0000001A" }}
          >
            <div className={` mb-2 ${style.dayText}`}>
              <div className="text-capitalize" >{item?.tour?.name}</div>
            </div>
            <div className={style.day}>
              {item.booking_type !== "multi_day" ? (
                <div>
                  {" "}
                  {moment(item?.date).format("DD")}{" "}
                  {moment(item?.date).format("MMM")}{" "}
                  {moment(item?.date).format("YYYY")} <br />{" "}
                  {moment(item?.date).format("ddd")}
                </div>
              ) : (
                <div>
                  {" "}
                  <div className="d-flex">
                    {moment(item?.dates[0]).format("DD")}{" "}
                    {moment(item?.dates[0]).format("MMM")}{" "}
                    {moment(item?.dates[0]).format("YYYY")} <br />{" "}
                    {moment(item?.dates[0]).format("ddd")}
                    <Dropdown
                      className="ms-3"
                      menu={{
                        items: item.dates.map((d, i) => {
                          return {
                            key: i,
                            label: <div>{moment(d).format("YYYY-MM-DD")}</div>,
                          };
                        }),
                      }}
                      placement="bottomLeft"
                    >
                      <Button className="tag-rounded">2+</Button>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="flex-2 px-xl-5"
            style={{ borderRight: isMobile && "1px solid #0000001A" }}
          >
            <div className="h-100 flex-column justify-content-center d-flex">
              <div
                className="d-xl-flex align-items-center justify-content-between pb-3"
                style={{ borderBottom: isMobile && "1px solid #0000001A" }}
              >
                <div
                  className={style.dateTime}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <ClockIcon /> {item?.booked_slot}
                </div>
                <div
                  className={style.dateTime}
                  style={{ marginLeft: isMobile && "20px" }}
                >
                  <MapIcon /> {JSON.parse(item?.tour?.location)?.address}
                </div>
              </div>
              <div className="d-lg-flex align-items-center justify-content-between mt-lg-3">
                <div className={style.plan1}>
                  <div>
                    Tour <br className="d-none d-lg-block" />
                    Type
                  </div>{" "}
                </div>
                <div className={style.plan}>
                  <div>
                    {item?.booking_type === "full_day"
                      ? "Full Day"
                      : item?.booking_type === "half_day"
                      ? "Half Day"
                      : "Hourly Base"}
                  </div>
                  <div>
                    <strong>Tour</strong>
                  </div>{" "}
                </div>
                <div className={style.plan}>
                  <div>Extras</div>
                  <div>
                    <strong>{item?.extra_person}</strong>
                  </div>{" "}
                </div>
                <div className={style.plan}>
                  <div>Tour Price</div>
                  <div><strong>${item?.total}</strong></div>
                </div>
              </div>
            </div>
          </div>
          
          <div
            className=" align-items-center flex-75 py-2  d-lg-flex  justify-content-evenly"
            style={{ paddingLeft: isMobile && "24px" }}
          >
            <div>
              <div className={`mb-3 ${style.booked}`}>
                <ProfileIcon />
                Vendor
              </div>
              <div className="d-flex d-lg-block">
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
                <div className={`mt-2 text-capitalize ${style.table__title}`}>
                  {item?.vendor?.name}
                </div>
              </div>
            </div>
            {activeTab === "Pending" && (
              <div className="ms-2 text-center d-flex  flex-column align-items-center">
                <div className="d-flex justify-content-center">

                <div
                  onClick={() => setOpenBookingModal(true)}
                  className={` btn  d-flex align-items-center justify-content-center p-0   `}
                  style={{
                    maxWidth: "40px",
                    height: "40px",
                    background: "var(--primary)",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "13px",
                      marginRight: "13px",
                      color: "#fff",
                    }}
                  >
                    <i className="fa fa-eye"></i>
                  </span>
                  
                </div>
                <div
                  onClick={handleNewMessage}
                  className={` btn  d-flex align-items-center justify-content-center p-0  ms-1 `}
                  style={{
                    maxWidth: "40px",
                    height: "40px",
                    background: "var(--primary)",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "13px",
                      marginRight: "13px",
                      color: "#fff",
                    }}
                  >
                    <ChatIcon color='white' />
                  </span>
                  
                </div>
                </div>

                {item.booking_request_status !== "pending" ? (
                  <button
                    className="btn btn-primary mt-3 "
                    style={{ fontSize: "12px" }}
                    onClick={() => payNow()}
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className="btn  mt-3 "
                    style={{
                      background: "rgb(242, 242, 242)",
                      fontSize: "12px",
                    }}
                  >
                    Pending
                  </button>
                )}
              </div>
            )}
            {activeTab === "Rejected" && (
              <div className="ms-2 text-center d-flex  flex-column align-items-center">
                <div
                  onClick={() => setOpenBookingModal(true)}
                  className={` btn  d-flex align-items-center justify-content-center p-0  mx-2 `}
                  style={{
                    maxWidth: "40px",
                    height: "40px",
                    background: "var(--primary)",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "13px",
                      marginRight: "13px",
                      color: "#fff",
                    }}
                  >
                    <i className="fa fa-eye"></i>
                  </span>
                </div>
                <button
                  className="btn  mt-3 "
                  style={{
                    background: "rgb(242, 242, 242)",
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  Rejected
                </button>
              </div>
            )}
          </div>
        </div>
        {activeTab === "Rejected" && true && (
          <div className="ms-3 mt-4">
            <h3 style={{ color: "#8F4D3D", fontWeight: 600 }}>
              Reason of rejection:
            </h3>
            <p style={{ fontSize: "14px" }}>{item.booking_request_reason}</p>
          </div>
        )}
      </div>
      <BookingDetailModal
        item={item}
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
      />
    </div>
  );
};
