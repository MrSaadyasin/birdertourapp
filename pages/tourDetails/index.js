import React, { useEffect, useState } from "react";
import style from "./TourDetail.module.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import CardImage1 from "../../assets/images/cardImage.png";
import CardImage4 from "../../assets/images/cardImage4.png";
import moment from "moment";
import {
  RightArrow,
  Star,
  BadgeIcon,
  VerifiedIcon,
  MapIcon,
} from "../../Compoments/icons";
import Carousel from "react-elastic-carousel";
import Testimonial from "../../Compoments/Testimonial/Testimonial";
import { TimePicker, Modal, Select, Tooltip, Tag, Dropdown } from "antd";
import PageLayout from "../../Compoments/Layout/PageLayout";
import axios from "axios";
import { baseUrl } from "../../constants/baseurl.constants";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "../../extras/constants";
import { connect } from "react-redux";
import Router from "next/router";
import { storeBookingId } from "../../Redux/auth/action";
import { sendChatMessage } from "../../constants/endpoint.constants";
import { useMediaQuery } from "usehooks-ts";
import Header from "../../Compoments/Layout/Header";
import PDF from "../../assets/images/pdf.png";
import DatePicker, {
  Calendar,
  getAllDatesInRange,
} from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css";
import { VendorDetailModal } from "../../Compoments/vendor/VendorDetailModal";
import { TourPricingCard } from "../../Compoments/tours/TourPricingCard";
import Link from "next/link";

const Tour = (props) => {
 

  const { tourDetails } = props;
  const { full_day, half_day } = props.availabeDates;

  const [items, setItems] = useState([ 
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ]);
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  const [currentPlan, setCurrentPlan] = useState("full_day");
  const [selectedDate, setSelecetdDate] = useState(new Date());
  const [currentPlanModal, setCurrentPlanModal] = useState(false);
  const [size, setSize] = useState("large");
  const [loading, setLoading] = useState(false);
  const [selectExtra, setSelectExtra] = useState("");
  const [extraField, setExtraField] = useState(false);
  const [hourlybaseTimeSlot, setHourlyBaseTimeSlot] = useState([]);
  const [payloadBooking, setPayloadBooking] = useState({
    timeSlote: "",
    totalPrice: 0,
    platFormFee: 0,
    extraPerson: 0,
    tourPrice: 0,
    date: "",
    availability: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showErrorHeader, setShowErrorHeader] = useState(false);
  const [availableMessage, setAvailableMessage] = useState({
    show: false,
    message: "",
    disable: false,
    availability: "",
  });
  const [multiDates, setMultiDates] = useState([]);
  const [rangeDates, setRangeDates] = useState([]);
  const [calendarType, setCalendarType] = useState(true);
  const [modal2Open, setModal2Open] = useState(false);

  // const changeCalendarType = () => {
  //   setCalendarType(!calendarType);
  // };
  const handleClose = () => {
    setExtraField(false);
    setCurrentPlanModal(false);
    setSelectExtra("0");
    setPayloadBooking({
      timeSlote: "",
      totalPrice: 0,
      platFormFee: 0,
      extraPerson: 0,
      tourPrice: 0,
      date: "",
      availability: "",
    });
    setHourlyBaseTimeSlot([]);
  };

  const handleModalWithSelecetdPlan = async (date) => {
    try {
      const data = {
        vendor_id: tourDetails?.tours?.vendor?._id,
        tour_id: tourDetails?.tours?._id,
        booking_type: currentPlan,
        date: date,
      };
      const checkAvailability = await axios.post(
        `${baseUrl}/booking/availability`,
        data
      );
      setAvailableMessage({
        show: true,
        message: checkAvailability?.data?.message,
        availability: checkAvailability?.data?.availability,
      });
      if (currentPlan === "full_day") {
        setPayloadBooking({
          ...data,
          availability: checkAvailability?.data?.availability?.full_day,
          totalPrice: +JSON.parse(tourDetails?.tours?.pricing?.full_day)?.price,
          tourPrice: JSON.parse(tourDetails?.tours?.pricing?.full_day)?.price,
          extraPerson: 0,
        });
      } else if (currentPlan === "half_day") {
        setPayloadBooking({
          ...data,
          availability: checkAvailability?.data?.availability?.half_day[0],
          totalPrice: +JSON.parse(tourDetails?.tours?.pricing?.half_day)?.price,
          tourPrice: JSON.parse(tourDetails?.tours?.pricing?.half_day)?.price,
          extraPerson: 0,
        });
      }

      // else {
      //   const option = checkAvailability?.data?.availability?.hourly_bases?.map(
      //     (item, index) => {
      //       return {
      //         label: item,
      //         value: item,
      //       };
      //     }
      //   );
      //   setAvailableMessage({
      //     ...availableMessage,
      //     availability: option,
      //   });
      //   setPayloadBooking({
      //     ...data,
      //     totalPrice: +JSON.parse(tourDetails?.tours?.pricing?.hourly_bases)
      //       ?.price,
      //     tourPrice: JSON.parse(tourDetails?.tours?.pricing?.hourly_bases)
      //       ?.price,
      //     extraPerson: 0,
      //   });
      // }
      setSelecetdDate(date);
      setCurrentPlanModal(!currentPlanModal);
    } catch (error) {
      toast.error(error?.response?.data?.message, Toaster);
      setAvailableMessage({
        show: true,
        message: error?.response?.data?.message,
      });
      console.log("error Message", error);
    }
  };
  // returns the combined, unique and sorted multi and rang date
  const combinedDates = ()=>{
    return Array.from(
      new Set([
        ...multiDates.map((i) => i.format()),
        ...rangeDates.map((i) => i.format()),
      ])
    )
      .sort((a, b) => new Date(a) - new Date(b))
      .map((time, i) => moment(time).format("YYYY-MM-DD")
      )
  }
  const openModalOnMulti = async ()=>{
    
   
    const data = {
      vendor_id: tourDetails?.tours?.vendor?._id,
      tour_id: tourDetails?.tours?._id,
      booking_type: currentPlan,
      date: JSON.stringify(combinedDates())
    };
    // const checkAvailability = await axios.post(
    //   `${baseUrl}/booking/availability`,
    //   data
    // );
    setPayloadBooking({
      ...data,
      availability: "10:00 AM - 06:00 PM",
      totalPrice:combinedDates().length*JSON.parse(tourDetails?.tours?.pricing?.full_day)?.price,
      tourPrice: JSON.parse(tourDetails?.tours?.pricing?.full_day)?.price,
      extraPerson: 0,
    });
    setCurrentPlanModal(!currentPlanModal);
  }
  // Combine TimeSlots and slot
  function combineTimeSlots(timeSlots) {
    // Sort the time slots by start time
    timeSlots.sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a.split("-")[0]}`);
      const timeB = new Date(`2000-01-01 ${b.split("-")[0]}`);
      return timeA - timeB;
    });

    const combinedSlots = [];
    let currentSlotStart = null;
    let currentSlotEnd = null;

    for (const timeSlot of timeSlots) {
      const [startTime, endTime] = timeSlot
        .split("-")
        .map((time) => new Date(`2000-01-01 ${time}`));

      if (currentSlotStart === null) {
        currentSlotStart = startTime;
        currentSlotEnd = endTime;
      } else {
        if (startTime <= currentSlotEnd) {
          // Merge the current slot with the new slot
          currentSlotEnd = new Date(Math.max(currentSlotEnd, endTime));
        } else {
          // Gap found, push the current slot to the result and start a new one
          combinedSlots.push(
            `${formatTime(currentSlotStart)} - ${formatTime(currentSlotEnd)}`
          );
          currentSlotStart = startTime;
          currentSlotEnd = endTime;
        }
      }
    }

    if (currentSlotStart !== null) {
      // Push the last slot to the result
      combinedSlots.push(
        `${formatTime(currentSlotStart)} - ${formatTime(currentSlotEnd)}`
      );
    }

    return combinedSlots;
  }

  // Format the Time
  function formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  const handleOnTimeSlot = (value) => {
    if (value.length > 0) {
      const combinedSlots = combineTimeSlots(value);
      if (combinedSlots.length === 1) {
        setHourlyBaseTimeSlot([...value]);
        setPayloadBooking({
          ...payloadBooking,
          availability: combinedSlots[0],
        });
      } else {
        alert("Error: There is a missing hour between time slots.");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        document.getElementById("myTopnav").style.backgroundColor = "#000";
        document.getElementById("myTopnav1").style.backgroundColor = "#000";
        document.getElementById("myTopnav").style.paddingTop = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.transition = ".1s";
      } else {
        document.getElementById("myTopnav").style.backgroundColor = "#000";
        document.getElementById("myTopnav1").style.backgroundColor = "#000";
      }
    });
  }, []);
  const breakPoint = [
    {
      width: 1,
      itemsToShow: 1,
      itemsToScroll: 1,
    },
    {
      width: 550,
      itemsToShow: 1,
      itemsToScroll: 1,
    },
    {
      width: 750,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 1150,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
  ];

 
  // Booking Handle
  const handleBookingTour = async () => {
  
    const data = {
      ...payloadBooking,
      extra_person: payloadBooking?.extraPerson
        ? +payloadBooking?.extraPerson
        : 0,
      time_slot: payloadBooking?.availability,
      booking_type: currentPlan,
      total: +payloadBooking?.totalPrice,
    };
    delete data?.availability;
    delete data?.totalPrice;
    delete data?.extraPerson;
    setLoading(true);
    try {
      if (data?.time_slot && data?.total && data?.total !== NaN) {
        const confirmBooking = await axios.post(
          `${baseUrl}/booking/tour`,
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
              Authorization: `Bearer ${props?.userAuthReducer?.access_token}`,
            },
          }
        );
       
        handleClose();
        toast.success(confirmBooking.data.message)
        props?.dispatch(
          storeBookingId({ _id: confirmBooking?.data?.booking?.booking?._id })
        );

        setLoading(false);
        if(tourDetails.tours.vendor.booking_request==="requested"){
          Router.push(`/tourDetails?id=${tourDetails?.tours?._id}`)
        }
        Router.push(confirmBooking?.data?.booking?.stripeSession?.url);
      } else {
        setLoading(false);
        toast.error("Invalid information", Toaster);
      }
    } catch (error) {
      handleClose();
      if (error?.response?.data.statusCode === 401) {
        setShowErrorHeader(true);
      }
      setLoading(false);
      // toast.error(error?.response?.data?.message, Toaster);
    }
  };

  const handleNewMessage = async () => {
    if (props?.userAuthReducer?.userData?._id) {
      const newMessage = {
        type: "user",
        message: `Hi! I have a question about one of your ${tourDetails?.tours?.name} tour`,
        user: props?.userAuthReducer?.userData?._id,
        vendor: tourDetails?.tours?.vendor?._id,
        sender: props?.userAuthReducer?.userData?._id,
        receiver: tourDetails?.tours?.vendor?._id,
      };

      try {
        const sendMessage = await axios.post(sendChatMessage, newMessage, {
          headers: {
            Authorization: `Bearer ${props?.userAuthReducer?.access_token}`,
          },
        });
        Router.push("/chats");
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("You are not logged in.", Toaster);
    }
  };
  const removeDate = (date) => {
    const newMulti = multiDates.filter((item) => item.format() !== date);
    const newRange = rangeDates.filter((item) => item.format() !== date);
    setMultiDates(newMulti);
    setRangeDates(newRange);
  };
  const changeCalendar = (value) => {
    setCalendarType(value);
  };
  const availableDateFun = ({ date }) => {
    let full_day_avail = full_day.includes(
      moment(date.format()).format("YYYY-MM-DD")
    );
    let half_day_avail = half_day.includes(
      moment(date.format()).format("YYYY-MM-DD")
    );
    if (currentPlan === "half_day") {
      if (!half_day_avail || new Date(date.format()) < new Date())
        return {
          disabled: true,
          style: { color: "rgb(233 233 233)", fontWeight: 400 },
        };
    }
    if (currentPlan === "full_day" || currentPlan === "multi_day")
      if (!full_day_avail || new Date(date.format()) < new Date())
        return {
          disabled: true,
          style: { color: "rgb(233 233 233)", fontWeight: 400 },
        };
  };
  const changePlan = (plan) => {
    if (plan === "multi_day" && currentPlan !== "multi_day") {
      setCurrentPlan(plan);
      setRangeDates([]);
      setMultiDates([]);
    } else if (plan === "half_day" && currentPlan !== "half_day") {
      setCurrentPlan("half_day");
      setRangeDates([]);
      setMultiDates([]);
    } else if (plan === "full_day" && currentPlan !== "full_day") {
      setCurrentPlan("full_day");
      setRangeDates([]);
      setMultiDates([]);
    }
  };
  return (
    <>
      <ToastContainer />
      <div>
        {showErrorHeader && (
          <PageLayout color="1b847a" footer={false} setModalOpen={true} />
        )}
      </div>
      <PageLayout color="#1b847a" footer={false}>
        <section
          className="d-flex"
          style={{
            paddingTop: !isMobileDevice ? 100 : 73,
            height: "calc(100vh - 0px)",
          }}
        >
          <Container style={{ marginTop: !isMobileDevice ? "30px" : "50px" }}>
            <div className={style.viewDetails}>
            <div className={`${style.breadCrumb} mb-3`}>
          <Link href={"/tours"}>Tour </Link> / Tour Detail
        </div>
              {/* <p className={style.breadCrumb}>Tour / Tour Detail </p> */}
              <h1>{tourDetails?.tours?.name}</h1>
              <div className="d-flex">
                <p className={style.location}>
                  <MapIcon /> {JSON.parse(tourDetails?.tours?.location).address}
                </p>
              </div>

              <div className="d-flex">
                <div className="my-3 d-lg-flex flex-wrap d-none">
                  {tourDetails?.tours?.caption_images?.length > 0 &&
                    tourDetails?.tours?.caption_images?.map((item, index) => (
                      <div style={{ marginTop: "16px" }} key={index}>
                        <Tooltip title={item?.caption ? item?.caption : "N/A"}>
                          <Image
                            style={{
                              display: "grid",
                              paddingRight: "16px",
                              borderRadius: "8px",
                              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                            }}
                            src={item.image}
                            width={250}
                            height={310}
                            alt="card Image"
                          />
                        </Tooltip>
                      </div>
                    ))}
                </div>
              </div>

              <Row className="mt-3 d-lg-none d-flex">
                {tourDetails?.tours?.caption_images?.length > 0 &&
                  tourDetails?.tours?.caption_images?.map((item, index) => (
                    <Col sm={6} xs={6} key={index}>
                      <Tooltip title={item?.caption ? item?.caption : "N/A"}>
                        <Image
                          src={item?.image}
                          width={250}
                          height={310}
                          style={{
                            height: "240px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt="card Image"
                        />
                      </Tooltip>
                    </Col>
                  ))}
              </Row>

              <div className="my-lg-4 my-4">
                <h1>About Trip</h1>
                {tourDetails?.tours?.description
                  ? ReactHtmlParser(tourDetails?.tours?.description)
                  : ""}
              </div>
              {/* vendor detail */}

              <div className="my-lg-4 my-4">
                <h1>Meet Your Tour Guide</h1>
                <div style={{cursor: 'pointer'}} onClick={() => setModal2Open(true)}>
                  <div className="d-lg-flex align-items-center justify-content-between mb-3 py-2">
                    <div className="d-flex">
                      <div className="position-relative">
                        <Image
                          src={
                            tourDetails?.tours?.vendor?.profile_image
                              ? tourDetails?.tours?.vendor?.profile_image
                              : CardImage1
                          }
                          alt="Table image"
                          className={style.imageTable}
                          width={60}
                          height={60}
                        />
                        <span className={style.badge}>
                          <BadgeIcon />
                        </span>
                      </div>
                      <div className="mt-lg-2">
                        <div className={style.table__title}>
                          <strong>{tourDetails.tours?.vendor?.name}</strong>
                        </div>
                        <div className="d-lg-flex align-items-center">
                          <div className={style.info}>
                            <Star />
                            &nbsp;{" "}
                            {tourDetails.tours?.vendor?.rating
                              ? tourDetails.tours?.vendor?.rating
                              : 0}{" "}
                            Reviews
                          </div>
                          <div className={style.info}>
                            <VerifiedIcon />
                            &nbsp; Identity Verified
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={isMobileDevice && "w-50 mx-auto"}>
                      <button
                        className="mt-2 btn btn-md btn-primary btn-md fw-normal"
                        onClick={handleNewMessage}
                      >
                        Chat
                      </button>
                    </div> */}
                  </div>
                </div>
                {tourDetails?.tours?.vendor?.description
                  ? tourDetails?.tours?.vendor?.description
                  : ""}
                <div className="d-lg-flex mt-3 ">
                  <div>
                    <button
                      className=" btn btn-md btn-primary btn-md fw-normal"
                      onClick={handleNewMessage}
                    >
                      Chat with Guide
                    </button>
                  </div>
                  <div className={style.warningTxt}>
                    <span className="me-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6667 15.416C12.2567 15.416 11.9167 15.076 11.9167 14.666V9.66602C11.9167 9.25602 12.2567 8.91602 12.6667 8.91602C13.0767 8.91602 13.4167 9.25602 13.4167 9.66602V14.666C13.4167 15.076 13.0767 15.416 12.6667 15.416Z"
                          fill="#E6D000"
                        />
                        <path
                          d="M12.6677 18.6666C12.6077 18.6666 12.5377 18.6566 12.4677 18.6466C12.4077 18.6366 12.3477 18.6166 12.2877 18.5866C12.2277 18.5666 12.1677 18.5366 12.1077 18.4966C12.0577 18.4566 12.0077 18.4166 11.9577 18.3766C11.7777 18.1866 11.6677 17.9266 11.6677 17.6666C11.6677 17.4066 11.7777 17.1466 11.9577 16.9566C12.0077 16.9166 12.0577 16.8766 12.1077 16.8366C12.1677 16.7966 12.2277 16.7666 12.2877 16.7466C12.3477 16.7166 12.4077 16.6966 12.4677 16.6866C12.5977 16.6566 12.7377 16.6566 12.8577 16.6866C12.9277 16.6966 12.9877 16.7166 13.0477 16.7466C13.1077 16.7666 13.1677 16.7966 13.2277 16.8366C13.2777 16.8766 13.3277 16.9166 13.3777 16.9566C13.5577 17.1466 13.6677 17.4066 13.6677 17.6666C13.6677 17.9266 13.5577 18.1866 13.3777 18.3766C13.3277 18.4166 13.2777 18.4566 13.2277 18.4966C13.1677 18.5366 13.1077 18.5666 13.0477 18.5866C12.9877 18.6166 12.9277 18.6366 12.8577 18.6466C12.7977 18.6566 12.7277 18.6666 12.6677 18.6666Z"
                          fill="#E6D000"
                        />
                        <path
                          d="M18.7282 22.8259H6.60819C4.65819 22.8259 3.16819 22.1159 2.40819 20.8359C1.65819 19.5559 1.75819 17.9059 2.70819 16.1959L8.76819 5.29586C9.76819 3.49586 11.1482 2.50586 12.6682 2.50586C14.1882 2.50586 15.5682 3.49586 16.5682 5.29586L22.6282 16.2059C23.5782 17.9159 23.6882 19.5559 22.9282 20.8459C22.1682 22.1159 20.6782 22.8259 18.7282 22.8259ZM12.6682 4.00586C11.7282 4.00586 10.8082 4.72586 10.0782 6.02586L4.02819 16.9359C3.34819 18.1559 3.23819 19.2759 3.70819 20.0859C4.17819 20.8959 5.21819 21.3359 6.61819 21.3359H18.7382C20.1382 21.3359 21.1682 20.8959 21.6482 20.0859C22.1282 19.2759 22.0082 18.1659 21.3282 16.9359L15.2582 6.02586C14.5282 4.72586 13.6082 4.00586 12.6682 4.00586Z"
                          fill="#E6D000"
                        />
                      </svg>
                    </span>
                    In order to protect your payment, you are highly recommended
                    not to transfer money or communicate outside this platform
                  </div>
                </div>
              </div>

              {/* plan */}
              <div className="my-lg-5 my-4 pb-lg-5">
                <h1 className="mb-lg-4 mb-3">Pricing Plans</h1>
                <Row>
                     {/*Multi  dates card */}
                     <Col lg="4" onClick={() => changePlan("multi_day")}>
                      <TourPricingCard tourDetails={tourDetails}  currentPlan={currentPlan} cardDetail={'multi_day'} />
                     </Col>
                  {/*Multi  dates card */}
               
                  {/*Full Day card*/}
                  <Col lg="4" onClick={() => changePlan("full_day")}>
                      <TourPricingCard tourDetails={tourDetails}  currentPlan={currentPlan} cardDetail={'full_day'} />
                  </Col>
                  {/*half day card */}
                  <Col lg="4" onClick={() => changePlan("half_day")}>
                  <TourPricingCard tourDetails={tourDetails}  currentPlan={currentPlan} cardDetail={'half_day'} />
                  </Col>
                  {/*hourly*/}
                </Row>
              </div>
              <Col lg="8 mx-auto">


                {currentPlan === "multi_day" ? (
                    <>
                      <div className="d-lg-flex justify-content-between my-2">
                        <div className=" ">
                          <h2 className="mb-0 ms-2 ">Choose Date</h2>
                        </div>
                        <div className="d-flex mt-3 mt-lg-0 align-items-center">
                          <Select
                              className="width100Mobile"
                              placeholder="Select a calendar"
                              defaultValue={true}
                              onChange={changeCalendar}
                              options={[
                                {
                                  value: true,
                                  label: "Multi Select",
                                },
                                {
                                  value: false,
                                  label: "Range Select",
                                },
                              ]}
                          />
                          { tourDetails.tours?.vendor?.booking_request === "instant" ? <button
                              className="btn btn-sm btnPrimary px-3 ms-2"
                              style={{
                                height: "33px",
                                fontSize: "14px",
                                borderRadius: "4px",
                              }}
                              onClick={openModalOnMulti}

                          >
                            Confirm
                          </button> :
                              <button
                                  onClick={openModalOnMulti}
                                  className="btn btn-sm btnPrimary px-3 ms-2"
                                  style={{
                                    height: "33px",
                                    fontSize: "14px",
                                    borderRadius: "4px",
                                  }}
                              >
                                Request Booking
                              </button>
                          }
                        </div>
                      </div>
                      {/* checking if calendar is multi or range */}
                 {calendarType ? <Calendar
                    mapDays={(date) => availableDateFun(date)}
                    className="teal"
                    multiple
                    onChange={setMultiDates}
                    value={multiDates}
                    headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                  /> :
                  <Calendar
                  className="teal"
                  mapDays={(date) => availableDateFun(date)}
                  range
                  value={rangeDates}
                  onChange={(dateObjects) => {
                    setRangeDates(
                      getAllDatesInRange(dateObjects).filter((d) =>
                        full_day.includes(
                          moment(d.format()).format("YYYY-MM-DD")
                        )
                      )
                    );
                    // setRangeDates(getAllDatesInRange(dateObjects));
                  }}
                  headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                />
                  }
                  </>
                ) : <>
                {/*  Full and Half Date Calendar*/}
                  <Calendar
                      mapDays={(date) => availableDateFun(date)}
                      className="teal"
                      headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                      onChange={(date)=> {
                        const selectedDate = date.format('YYYY-MM-DD');
                        handleModalWithSelecetdPlan(selectedDate)
                      }}
                  />

                </>
                }
                <p className="text-danger my-3">Note: You cannot choose the disabled dates for tour booking. </p>
                <div className="d-flex flex-wrap ms-2 my-3 pb-lg-5 ">
                  {Array.from(
                    new Set([
                      ...multiDates.map((i) => i.format()),
                      ...rangeDates.map((i) => i.format()),
                    ])
                  )
                    .sort((a, b) => new Date(a) - new Date(b))
                    .map((time, i) => {
                      return (
                        <div key={i}>
                          <Tag
                            className="mb-2 py-1 px-3 "
                            // closable
                            color="#d08d7a"
                            // onClose={() => removeDate(time)}
                          >
                            {moment(time).format("YYYY-MM-DD")}
                          </Tag>
                        </div>
                      );
                    })}
                </div>
              </Col>
              {/* <Col lg="8" className="mb-5 mx-auto pb-5">
                <FullCalendar
                  Date="11/10/2023"
                  editable={true}
                  selectable={true}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  events={[
                    { title: "Avaiable", date: "2023-10-12" },
                    { title: "Avaiable", date: "2023-10-13" },
                  ]}
                  // initialDate= {'2023-06-16'}
                  // events={events}
                  // eventContent={renderEventContent}
                  dateClick={(date) =>
                    handleModalWithSelecetdPlan(date.dateStr)
                  }
                />
                <p className="text-danger mt-3">
                  Note: You cannot choose the disabled dates for tour booking.{" "}
                </p>
              </Col> */}
              {/* testimonials */}
              {/* {tourDetails?.tours?.feedbacks?.length > 0 && (
                <div className="my-5 pb-5">
                  <h1 className="mb-4">Testimonials</h1>
                  <Carousel breakPoints={breakPoint}>
                    {items?.map((item, index) => (
                      <Testimonial key={index} item={item} />
                    ))}
                  </Carousel>
                </div>
              )} */}
            </div>
          </Container>
        </section>

        {/* Modal for Choose Plan */}
        <Modal
          open={currentPlanModal}
          onCancel={handleClose}
          footer={[
            <Button
              className="btn-secondary px-4 py-2 mx-2"
              key="back"
              onClick={handleClose}
            >
              Cancel
            </Button>,
            !loading ? tourDetails?.tours?.vendor?.booking_request === "instant" ? 
            <Button
                key="submit"
                type="primary"
                className="py-2 px-4"
                onClick={handleBookingTour}
            >
              Book Tour
            </Button> :
        
           <Button
                key="submit"
                type="primary"
                className="py-2 px-4"
                onClick={handleBookingTour}
            >
              Request Booking
            </Button> :
            <Button
                key="submit"
                type="primary"
                className="py-2 px-4"
            >
              Requesting...
            </Button>
            
        
          ]}
        >
          <div className="p-lg-3 mt-5">
            {/*  full day*/}
            {currentPlan === "full_day" || currentPlan ==="multi_day" ? (
              <>
                 {currentPlan === "full_day" ? <div className="d-flex align-items-center mb-3 justify-content-between">
                  <div className={style.tour}>Booking Date</div>
                  <div className={style.label}>
                  {moment(payloadBooking.date).format("Do MMMM, YYYY")}
                  </div>
                </div> :
             <div className="d-flex align-items-center mb-3 justify-content-between">
              <div className={style.tour}>Booking Dates</div>
                  {payloadBooking.date !== '' && JSON.parse(payloadBooking.date).length > 0 &&
                       <Dropdown
                       className="ms-3"
                       menu={{
                         items: JSON.parse(payloadBooking.date).map((d, i) => {
                           return {
                             key: i,
                             label: <div>{moment(d).format("YYYY-MM-DD")}</div>,
                           };
                         }),
                       }}
                       placement="bottomLeft"
                     >
                     <div style={{cursor:"pointer"}} className="">{moment(JSON.parse(payloadBooking.date)[0]).format("DD MMMM, YYYY")}  </div>
                   </Dropdown>
                     }
                </div>
                }

                <div className="d-flex align-items-center mb-3 mt-2 justify-content-between">
                  <div className={style.tour}>Full-Day Tour (4-5 Persons) </div>
                  <div className={style.price}>
                    ${JSON.parse(tourDetails?.tours?.pricing?.half_day)?.price}
                  </div>
                </div>
                <div>
                  <label className={style.label}>Extra Guests</label>
                  <Form.Select
                    name="extraPerson"
                    className="w-100"
                    type="text"
                    style={{ height: "50px" }}
                    onChange={(e) => {
                      if (e.target.value == "Add Manually") {
                        setExtraField(true);
                      } 
                      // 
                      else if(currentPlan ==="multi_day") {
                        setPayloadBooking({
                          ...payloadBooking,
                          // tourPrice:
                          //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                          //     ?.price +
                          //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                          //     ?.extra *
                          //     e.target.value,
                          extraPerson: e.target.value,
                          totalPrice:
                            +(JSON.parse(tourDetails?.tours?.pricing?.full_day)
                              ?.price * combinedDates().length ) +
                            +(JSON.parse(tourDetails?.tours?.pricing?.full_day)
                              ?.extra * combinedDates().length) *
                              e.target.value,
                        });
                        setSelectExtra(e.target.value);
                        setExtraField(false);
                      }else {
                        setPayloadBooking({
                          ...payloadBooking,
                          // tourPrice:
                          //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                          //     ?.price +
                          //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                          //     ?.extra *
                          //     e.target.value,
                          extraPerson: e.target.value,
                          totalPrice:
                            +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                              ?.price +
                            +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                              ?.extra *
                              e.target.value,
                        });
                        setSelectExtra(e.target.value);
                        setExtraField(false);
                      }
                    }}
                  >
                    <option value="0">Select Extras</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="Add Manually">Add Manually</option>
                  </Form.Select>
                  <p className="text-warning mt-1">
                    Note: Extra person will be charged $
                    {JSON.parse(tourDetails?.tours?.pricing?.full_day)?.extra}
                  </p>
                  {extraField && (
                    <div className="my-3 py-1">
                      <label className={style.label}>Extra Person</label>
                      <Form.Control
                      min={0}
                      step={1}
                      onKeyDown={(e) => {
                        if (e.code === 'Minus') {
                          e.preventDefault();
                      }
                      }}
                        name="extraPerson1"
                        className="w-100"
                        type="number"
                        value={selectExtra}
                        placeholder="Enter person (05)"
                        autoComplete="off"
                        style={{ height: "50px" }}
                        onChange={(e) => {
                          setPayloadBooking({
                            ...payloadBooking,
                            // tourPrice:
                            //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                            //     ?.price +
                            //   +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                            //     ?.extra *
                            //     e.target.value,
                            extraPerson: e.target.value,
                            totalPrice:
                              +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                                ?.price +
                              +JSON.parse(tourDetails?.tours?.pricing?.full_day)
                                ?.extra *
                                e.target.value,
                          });
                          setSelectExtra(e.target.value);
                        }}
                      />
                    </div>
                  )}

                  <div className={style.bookingDetail}>
                    <h3 className={style.tour}>Booking Details</h3>

                    <div className="d-flex mt-3 mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Tour Guide</div>
                      <div className={style.textDetailValue}>
                        {tourDetails?.tours?.vendor?.name}
                      </div>
                    </div>

                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Tour Type</div>
                      <div className={style.textDetailValue}>Full-Day Tour</div>
                    </div>

                    {currentPlan === "full_day" ? 
                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Date</div>
                      <div className={style.textDetailValue}>
                        {moment(payloadBooking.date).format("DD MMMM, YYYY")}
                      </div>
                    </div>:
                    // drop down for multi dates
                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                    <div className={style.textDetail}>Dates</div>
                    <div className={style.textDetailValue}>
                     {/* {payloadBooking.date !== '' && JSON.parse(payloadBooking.date).length > 0 && moment(JSON.parse(payloadBooking.date)[0]).format("DD MMMM, YYYY")} */}
                     {payloadBooking.date !== '' && JSON.parse(payloadBooking.date).length > 0 &&
                       <Dropdown
                       className="ms-3"
                       menu={{
                         items: JSON.parse(payloadBooking.date).map((d, i) => {
                           return {
                             key: i,
                             label: <div>{moment(d).format("YYYY-MM-DD")}</div>,
                           };
                         }),
                       }}
                       placement="bottomLeft"
                     >
                     <div style={{cursor:"pointer"}} className="">{moment(JSON.parse(payloadBooking.date)[0]).format("DD MMMM, YYYY")}</div>
                   </Dropdown>
                     }
                    </div>
                  </div>
                    }

                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Time Slot</div>
                      <div className={style.textDetailValue}>
                        {payloadBooking?.availability}
                      </div>
                    </div>

                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Total Tour Price</div>
                      <div className={style.textDetailValue}>
                        ${payloadBooking.tourPrice}
                      </div>
                    </div>
                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Extra Guest</div>
                      <div className={style.textDetailValue}>
                        {payloadBooking.extraPerson}
                      </div>
                    </div>
                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Extra Price</div>
                      {currentPlan === "full_day" ? <div className={style.textDetailValue}>
                        ${payloadBooking.extraPerson * JSON.parse(tourDetails?.tours?.pricing?.full_day)?.extra}
                      </div>:
                       <div className={style.textDetailValue}>
                       ${payloadBooking.extraPerson * (combinedDates().length * JSON.parse(tourDetails?.tours?.pricing?.full_day)?.extra)}
                     </div>
                      }
                    </div>

                    {/*  Total */}
                    <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Total Price</div>
                      <div className={style.textDetailValue}>
                        ${payloadBooking.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {currentPlan === "half_day" ? (
                  <>
                    <div className="d-flex align-items-center mb-3 justify-content-between">
                      <div className={style.tour}>Booking Date</div>
                      <div className={style.label}>
                        {moment(payloadBooking.date).format("Do MMMM, YYYY")}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mt-2 justify-content-between">
                      <div className={style.tour}>Half-Day Tour (1-2 Persons) </div>
                      <div className={style.priceHalf}>
                        $
                        {
                          JSON.parse(tourDetails?.tours?.pricing?.half_day)
                            ?.price
                        }
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 py-1">
                        <label className={style.label}>Time Slot</label>
                        <Form.Select
                          name="extraPerson"
                          className="w-100"
                          type="text"
                          style={{ height: "50px" }}
                          onChange={(e) => {
                            setPayloadBooking({
                              ...payloadBooking,
                              availability: e.target.value,
                            });
                          }}
                        >
                          <option value="">Choose Time Slot</option>
                          {availableMessage?.availability?.half_day?.length >
                            0 &&
                            availableMessage?.availability?.half_day?.map(
                              (item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              )
                            )}
                        </Form.Select>
                      </div>

                      <label className={style.label}>Extras</label>
                      <Form.Select
                        name="extraPerson"
                        className="w-100"
                        type="text"
                        style={{ height: "50px" }}
                        onChange={(e) => {
                          if (e.target.value == "Add Manually") {
                            setExtraField(true);
                          } else {
                            setPayloadBooking({
                              ...payloadBooking,
                              // tourPrice:
                              //   +JSON.parse(
                              //     tourDetails?.tours?.pricing?.half_day
                              //   )?.price +
                              //   +JSON.parse(
                              //     tourDetails?.tours?.pricing?.half_day
                              //   )?.extra *
                              //     e.target.value,
                              extraPerson: e.target.value,
                              totalPrice:
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.half_day
                                )?.price +
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.half_day
                                )?.extra *
                                  e.target.value,
                            });
                            setSelectExtra(e.target.value);
                            setExtraField(false);
                          }
                        }}
                      >
                        <option value="0">Select Extras</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="Add Manually">Add Manually</option>
                      </Form.Select>
                      <p className="text-warning mt-1">
                        Note: Extra person will be charged $
                        {
                          JSON.parse(tourDetails?.tours?.pricing?.half_day)
                            ?.extra
                        }
                      </p>
                      {extraField && (
                        <div className="my-3 py-1">
                          <label className={style.label}>Extra Person</label>
                          <Form.Control
                            name="extraPerson1"
                            className="w-100"
                            type="number"
                            placeholder="Enter person (05)"
                            min={0}
                            step={1}
                            autoComplete="off"
                            onKeyDown={(e) => {
                              if (e.code === 'Minus') {
                                e.preventDefault();
                            }
                            }}
                            style={{ height: "50px" }}
                            
                            onChange={(e) => {
                              setPayloadBooking({
                                ...payloadBooking,
                                // tourPrice:
                                //   +JSON.parse(
                                //     tourDetails?.tours?.pricing?.half_day
                                //   )?.price +
                                //   +JSON.parse(
                                //     tourDetails?.tours?.pricing?.half_day
                                //   )?.extra *
                                //     e.target.value,
                                extraPerson: e.target.value,
                                totalPrice:
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.half_day
                                  )?.price +
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.half_day
                                  )?.extra *
                                    e.target.value,
                              });
                              setSelectExtra(e.target.value);
                            }}
                          />
                        </div>
                      )}

                      <div className={style.bookingDetail}>
                        <h3 className={style.tour}>Booking Details</h3>

                        <div className="d-flex mt-3 mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Tour Guide</div>
                          <div className={style.textDetailValue}>
                            {tourDetails?.tours?.vendor?.name}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Tour Type</div>
                          <div className={style.textDetailValue}>
                            Half-Day Tour
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Date</div>
                          <div className={style.textDetailValue}>
                            {moment(payloadBooking?.date).format(
                              "Do MMMM, YYYY"
                            )}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Time Slot</div>
                          <div className={style.textDetailValue}>
                            {payloadBooking.availability}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>
                            Total Tour Price
                          </div>
                          <div className={style.textDetailValue}>
                            ${payloadBooking?.tourPrice}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Extra Guest</div>
                          <div className={style.textDetailValue}>
                            {payloadBooking?.extraPerson}
                          </div>
                        </div>
                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                      <div className={style.textDetail}>Extra Price</div>
                      <div className={style.textDetailValue}>
                        ${payloadBooking.extraPerson * JSON.parse(tourDetails?.tours?.pricing?.full_day)?.extra}
                      </div>
                    </div>
                      {/*  Total */}
                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Total Price</div>
                          <div className={style.textDetailValue}>
                            ${payloadBooking.totalPrice}
                          </div>
                        </div>
                        {/*<div className="d-flex mb-2 pb-1 align-items-center justify-content-between">*/}
                        {/*  <div className={style.textDetail}>Platform Fee</div>*/}
                        {/*  <div className={style.textDetailValue}>${payloadBooking?.platFormFee}</div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-3 justify-content-between">
                      <div className={style.tour}>Booking Date</div>
                      <div className={style.label}>
                        {moment(payloadBooking.date).format("Do MMMM, YYYY")}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mt-2 justify-content-between">
                      <div className={style.tour}>Hourly Tour </div>
                      <div className={style.priceHourly}>
                        $
                        {/* {
                          JSON.parse(tourDetails?.tours?.pricing.hourly_bases)
                            ?.price
                        } */}
                        <span style={{ fontSize: "16px" }}>/hr</span>
                      </div>
                    </div>
                    <div>
                      <label className={style.label}>Time Slot</label>
                      <Row className="mb-3">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Select
                              mode="tags"
                              size={size}
                              placeholder="Select Time"
                              onChange={handleOnTimeSlot}
                              value={hourlybaseTimeSlot}
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                              options={availableMessage.availability}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <label className={style.label}>Extra Guests</label>
                      <Form.Select
                        name="extraPerson"
                        className="w-100"
                        type="text"
                        style={{ height: "50px" }}
                        onChange={(e) => {
                          if (e.target.value == "Add Manually") {
                            setExtraField(true);
                          } else {
                            setPayloadBooking({
                              ...payloadBooking,
                              tourPrice:
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.hourly_bases
                                )?.price +
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.hourly_bases
                                )?.extra *
                                  e.target.value,
                              extraPerson: e.target.value,
                              totalPrice:
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.hourly_bases
                                )?.price +
                                +JSON.parse(
                                  tourDetails?.tours?.pricing?.hourly_bases
                                )?.extra *
                                  e.target.value,
                            });
                            setSelectExtra(e.target.value);
                            setExtraField(false);
                          }
                        }}
                      >
                        <option value="0">Select Extras</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="Add Manually">Add Manually</option>
                      </Form.Select>
                      <p className="text-warning mt-1">
                        Note: Extra person will be charged $
                        {/* {
                          JSON.parse(tourDetails?.tours?.pricing?.hourly_bases)
                            ?.extra
                        } */}
                      </p>
                      {extraField && (
                        <div className="my-3 py-1">
                          <label className={style.label}>Extra Person</label>
                          <Form.Control
                            name="extraPerson1"
                            className="w-100"
                            type="text"
                            placeholder="Enter person (05)"
                            style={{ height: "50px" }}
                            onChange={(e) => {
                              setPayloadBooking({
                                ...payloadBooking,
                                tourPrice:
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.hourly_bases
                                  )?.price +
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.hourly_bases
                                  )?.extra *
                                    e.target.value,
                                extraPerson: e.target.value,
                                totalPrice:
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.hourly_bases
                                  )?.price +
                                  +JSON.parse(
                                    tourDetails?.tours?.pricing?.hourly_bases
                                  )?.extra *
                                    e.target.value,
                              });
                              setSelectExtra(e.target.value);
                            }}
                          />
                        </div>
                      )}

                      <div className={style.bookingDetail}>
                        <h3 className={style.tour}>Booking Details</h3>

                        <div className="d-flex mt-3 mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Tour Guide</div>
                          <div className={style.textDetailValue}>
                            {tourDetails?.tours?.vendor?.name}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Tour Type</div>
                          <div className={style.textDetailValue}>
                            Hourly Tour
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Date</div>
                          <div className={style.textDetailValue}>
                            {moment(payloadBooking?.date).format(
                              "Do MMMM, YYYY"
                            )}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Time Slot</div>
                          <div className={style.textDetailValue}>
                            {payloadBooking?.availability
                              ? payloadBooking?.availability
                              : "0-0"}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>
                            Total Tour Price
                          </div>
                          <div className={style.textDetailValue}>
                            ${payloadBooking?.tourPrice}
                          </div>
                        </div>

                        <div className="d-flex mb-2 pb-1 align-items-center justify-content-between">
                          <div className={style.textDetail}>Extras</div>
                          <div className={style.textDetailValue}>
                            {payloadBooking?.extraPerson
                              ? payloadBooking?.extraPerson
                              : 0}
                          </div>
                        </div>

                        {/*<div className="d-flex mb-2 pb-1 align-items-center justify-content-between">*/}
                        {/*  <div className={style.textDetail}>Platform Fee</div>*/}
                        {/*  <div className={style.textDetailValue}>{payloadBooking?.p}</div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Modal>
         {/* Vendor detail modal */}
        <VendorDetailModal modal2Open={modal2Open} setModal2Open={setModal2Open} vendor={tourDetails?.tours?.vendor} feedbacks={tourDetails?.tours.feedbacks}/>
        
      </PageLayout>
    </>
  );
};

const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(Tour);

export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  const id = resolvedUrl.split("/tourDetails?id=");
  if (id[1]) {
    try {
      const getTourDetails = await axios.get(
        `${baseUrl}/tour/details?tour_id=` + id[1]
      );
      const getAvailableDates = await axios.get(
        `${baseUrl}/booking/available-dates/?tour_id=${id[1]}`
      );

      return {
        props: {
          tourDetails: getTourDetails.data,
          availabeDates: getAvailableDates.data.availability,
        },
      };
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        id,
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
