import { Button, Dropdown, Modal, Tag } from "antd";
import moment from "moment";
import React from "react";
import { ClockIcon, MapIcon, ProfileIcon } from "../icons";
import Link from "next/link";
import style from "../../pages/bookings/Booking.module.css";
import { useMediaQuery } from "usehooks-ts";
import Avatar from "../../assets/images/userAvatar.png";
import Image from "next/image";

export const BookingDetailModal = ({
  openBookingModal,
  setOpenBookingModal,
  item,
}) => {
  const isMobileDevice = useMediaQuery("(min-width:991px)");

  return (
    <div>
      <Modal
        title="Booking Detail"
        open={openBookingModal}
        onCancel={() => setOpenBookingModal(false)}
        footer={null}
        width={1000}
      >
        <div className="mb-3">
          {/* <h3 className="mb-3">May, 2023</h3> */}
          <div className={`d-lg-flex text-lg-center  ${style.upcomingTour}`}>
            <div
              className="flex-75 p-2"
              style={{ borderRight: isMobileDevice && "1px solid #0000001A" }}
            >
              <div className={`mb-2 ${style.dayText} ${style.table__title}`}>
                <div> {item?.tour?.name}</div>
              </div>
              <div className="text-center">
                {item?.booking_type === "multi_day" ? (
                  <div className={`d-flex ${style.day}`}>
                    <div>
                      {moment(item?.dates[0]).format("DD")}{" "}
                      {moment(item?.dates[0]).format("MMM")}{" "}
                      {moment(item?.dates[0]).format("YYYY")} <br />{" "}
                      {moment(item?.dates[0]).format("ddd")}
                    </div>
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
                ) : (
                  <div className={`d-flex ${style.day}`}>
                    {moment(item?.date).format("DD")}{" "}
                    {moment(item?.date).format("MMM")}{" "}
                    {moment(item?.date).format("YYYY")} <br />{" "}
                    {moment(item?.date).format("ddd")}
                  </div>
                )}
              </div>
            </div>
            <div
              className="flex-2 px-lg-5"
              style={{ borderRight: isMobileDevice && "1px solid #0000001A" }}
            >
              <div className="h-100 flex-column justify-content-center d-flex">
                <div
                  className="d-lg-flex align-items-center justify-content-between pb-3"
                  style={{
                    borderBottom: isMobileDevice && "1px solid #0000001A",
                  }}
                >
                  <div className={style.dateTime}>
                    <ClockIcon /> {item?.booked_slot}
                  </div>
                  <div
                    className={style.dateTime}
                    style={{ marginLeft: isMobileDevice && "50px" }}
                  >
                    <MapIcon />{" "}
                    {item?.tour?.location &&
                      JSON.parse(item?.tour?.location)?.address}
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
                    {item?.booking_type == "full_day" ? (
                      <>
                        {" "}
                        <div>Full Day</div>
                        <div>Tour</div>
                      </>
                    ) : (
                      <>
                        {item?.booking_type == "half_day" ? (
                          <>
                            <div>Half Day</div>
                            <div>
                              <strong>Tour</strong>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>Multi Dates</div>
                            <div>
                              <strong>Tour</strong>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className={style.plan}>
                    <div>Extras</div>
                    <div>
                      {item?.extra_person ? item?.extra_person : 0}
                    </div>{" "}
                  </div>
                  <div className={style.plan}>
                    <div>Tour Price</div>
                    <div>${item?.total ? item.total : 0}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-15 py-2  d-flex align-items-center  justify-content-lg-evenly"
              style={{ paddingLeft: isMobileDevice && "24px" }}
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
                        ? item.user?.profile_image
                        : Avatar
                    }
                    width={50}
                    height={50}
                    alt="Table image"
                    className={style.imageTable}
                  />
                  <div className={`text-capitalize mt-2 ms-3 ${style.table__title}`}>
                    {item?.vendor?.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex d-lg-none align-items-center ">
              <Link
                href={`/tourDetail?id=${item?.tour?._id}`}
                className={` btn d-flex mt-2 align-items-center justify-content-center w-100 mx-2  ${style.btn__secondary}`}
              >
                View Booking
              </Link>
            </div>
          </div>
          <div className="d-flex mt-3">
            {item?.dates.map((time, i) => {
              return (
                <div key={i}>
                  <Tag className="mb-2" color="#d08d7a">
                    {moment(time).format("YYYY-MM-DD")}
                  </Tag>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};
