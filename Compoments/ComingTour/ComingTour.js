import React, { useEffect, useState } from "react";
import style from "./ComingTour.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper";
import Carousel from "react-bootstrap/Carousel";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import BG2 from "../../assets/images/backgroungUpCom.png";
import BG1 from "../../assets/images/BG1.png";
import BG3 from "../../assets/images/BG2.png";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper";
import Link from "next/link";
import { connect } from "react-redux";
import { addTourWishList } from "../../Redux/auth/action";
import { toast } from "react-toastify";
import { Toaster } from "../../extras/constants";

const ComingTour = ({ userAuthReducer, dispatch, UpcomingTour }) => {
  const handleLike = async (event, id) => {
    event.preventDefault();
    try {
      const data = {
        tour_id: id,
      };
      if (userAuthReducer?.access_token) {
        const addWishList = await dispatch(
          addTourWishList(data, userAuthReducer?.access_token)
        );
        toast.success(addWishList.payload.data?.message, Toaster);
      } else {
        toast.error("You are not logged in.", Toaster);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const imageUrls = [BG2, BG1, BG3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className={style.coming__tour} style={{backgroundImage: `url(${imageUrls[currentImageIndex].src})`}}>
      <Row className="h-100 mx-0">
        <h2 className={style.upcoming}>Upcoming Tours: 24 Hour Window</h2>
        {UpcomingTour?.tours && UpcomingTour?.tours?.length > 0 ? (
          <>
            <Col lg={7}>
              <Carousel
                controls={false}
                indicators={false}
                wrap={true}
                interval={5500}
              >
                {UpcomingTour?.tours?.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-center flex-column align-items-start">
                        <h1 className={style.headings}>{item?.name}</h1>
                        <div className={style.paragraph}>
                          {ReactHtmlParser(item?.description)}
                        </div>
                        <Link href={`/tourDetails?id=${item._id}`}>
                          <button className={style.button}>
                            Trip Guide:{" "}
                            <span className="text-capitalize">
                              {item?.vendor?.name}
                            </span>{" "}
                            &nbsp;&nbsp;
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.4997 25.6663H17.4997C23.333 25.6663 25.6663 23.333 25.6663 17.4997V10.4997C25.6663 4.66634 23.333 2.33301 17.4997 2.33301H10.4997C4.66634 2.33301 2.33301 4.66634 2.33301 10.4997V17.4997C2.33301 23.333 4.66634 25.6663 10.4997 25.6663Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.3545 8.95996H17.3012V13.9183"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.3016 8.95996L10.6982 15.5633"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 19.2617C11.5383 20.7784 16.4617 20.7784 21 19.2617"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </Link>
                        <p className={` mt-2 mb-0 ${style.paragraph}`}>
                          Private Tour
                        </p>
                      </div>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
            <Col lg={5} className="my-5 my-lg-0 pe-0">
              <Swiper
                loop={true}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                  waitForTransition: false,
                }}
                swipedSliderPosition={true}
                breakpoints={{
                  320: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                  767: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                  1120: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                  1440: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                  1920: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                  },
                }}
                modules={[Autoplay, EffectFade, Navigation]}
                className="mySwiper cardSwpier"
              >
                {UpcomingTour?.tours?.map((item, index) => {
                  return (
                    <SwiperSlide className="" key={index}>
                      {" "}
                      <h6 className="d-flex" style={{ fontWeight: 400 }}>
                        <span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0004 11.8079C8.22539 11.8079 6.77539 10.3662 6.77539 8.58288C6.77539 6.79954 8.22539 5.36621 10.0004 5.36621C11.7754 5.36621 13.2254 6.80788 13.2254 8.59121C13.2254 10.3745 11.7754 11.8079 10.0004 11.8079ZM10.0004 6.61621C8.91706 6.61621 8.02539 7.49954 8.02539 8.59121C8.02539 9.68288 8.90872 10.5662 10.0004 10.5662C11.0921 10.5662 11.9754 9.68288 11.9754 8.59121C11.9754 7.49954 11.0837 6.61621 10.0004 6.61621Z"
                              fill="white"
                            />
                            <path
                              d="M10.0004 18.967C8.76706 18.967 7.52539 18.5003 6.55872 17.5753C4.10039 15.2087 1.38372 11.4337 2.40872 6.94199C3.33372 2.86699 6.89206 1.04199 10.0004 1.04199C10.0004 1.04199 10.0004 1.04199 10.0087 1.04199C13.1171 1.04199 16.6754 2.86699 17.6004 6.95033C18.6171 11.442 15.9004 15.2087 13.4421 17.5753C12.4754 18.5003 11.2337 18.967 10.0004 18.967ZM10.0004 2.29199C7.57539 2.29199 4.45872 3.58366 3.63372 7.21699C2.73372 11.142 5.20039 14.5253 7.43372 16.667C8.87539 18.0587 11.1337 18.0587 12.5754 16.667C14.8004 14.5253 17.2671 11.142 16.3837 7.21699C15.5504 3.58366 12.4254 2.29199 10.0004 2.29199Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                        <small className="line1Text mx-2">
                          {item?.location &&
                            JSON.parse(item?.location)?.address}
                        </small>
                      </h6>
                      <div
                        className="position-relative"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 24,
                          width: 260,
                        }}
                      >
                        <Image
                          src={item?.images ? item?.images[0] : CardImg}
                          className={style.image}
                          alt="card image"
                          height={400}
                          width={100}
                        />
                        <Link href={`/tourDetails?id=${item._id}`}>
                          <div className="tourNameCard">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.4997 25.6663H17.4997C23.333 25.6663 25.6663 23.333 25.6663 17.4997V10.4997C25.6663 4.66634 23.333 2.33301 17.4997 2.33301H10.4997C4.66634 2.33301 2.33301 4.66634 2.33301 10.4997V17.4997C2.33301 23.333 4.66634 25.6663 10.4997 25.6663Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.3545 8.95996H17.3012V13.9183"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.3016 8.95996L10.6982 15.5633"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 19.2617C11.5383 20.7784 16.4617 20.7784 21 19.2617"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </Link>

                        <div
                          className={style.heart}
                          onClick={(event) => handleLike(event, item?._id)}
                        >
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.59964 2.62913L10 3.16426L10.4004 2.62913C11.3204 1.39934 12.7949 0.599609 14.44 0.599609C17.2315 0.599609 19.5 2.87341 19.5 5.68961C19.5 6.82523 19.3189 7.87336 19.0043 8.8457L19.0032 8.84895C18.249 11.2357 16.7035 13.1592 15.0354 14.5929C13.365 16.0285 11.6004 16.9479 10.4589 17.3363L10.4589 17.3362L10.4536 17.3381C10.3537 17.3734 10.1893 17.3996 10 17.3996C9.81075 17.3996 9.64625 17.3734 9.54641 17.3381L9.54642 17.3381L9.54106 17.3363C8.3996 16.9479 6.635 16.0285 4.96465 14.5929C3.29649 13.1592 1.75096 11.2357 0.996763 8.84895L0.996774 8.84895L0.995722 8.8457C0.681141 7.87336 0.5 6.82523 0.5 5.68961C0.5 2.87341 2.76848 0.599609 5.56 0.599609C7.2051 0.599609 8.67958 1.39934 9.59964 2.62913Z"
                              fill={"black"}
                              fillOpacity={"0.25"}
                              stroke={"white"}
                            />
                          </svg>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <h1 className={style.headings}>No Upcoming Tours Found.</h1>
          </div>
        )}
      </Row>

      {/* <Carousel interval={1000}>
        {slideData.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="d-flex justify-content-center flex-column align-items-start">
              <h1 className={style.headings}>{slide?.text}</h1>
              <p className={style.paragraph}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p>
              <button className={style.button}>
                Trip Guide: Tracy Garza &nbsp;&nbsp;
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4997 25.6663H17.4997C23.333 25.6663 25.6663 23.333 25.6663 17.4997V10.4997C25.6663 4.66634 23.333 2.33301 17.4997 2.33301H10.4997C4.66634 2.33301 2.33301 4.66634 2.33301 10.4997V17.4997C2.33301 23.333 4.66634 25.6663 10.4997 25.6663Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.3545 8.95996H17.3012V13.9183"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.3016 8.95996L10.6982 15.5633"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 19.2617C11.5383 20.7784 16.4617 20.7784 21 19.2617"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className={` mt-2 mb-0 ${style.paragraph}`}>Private Tour</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel> */}

      {/* {UpcomingTour?.tours && UpcomingTour?.tours?.length > 0 ? (
          <>
      <Carousel slide={false} interval={1000}>
            {UpcomingTour?.tours?.map((item, index) => {
              return (
                <>
                  <Carousel.Item style={{display: 'flex'}} key={index} activeIndex={index}>
                    <div className="d-flex justify-content-center flex-column align-items-start">
                      <h1 className={style.headings}>{item?.name}</h1>
                      <p className={style.paragraph}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries.
                      </p>
                      <button className={style.button}>
                        Trip Guide: Tracy Garza &nbsp;&nbsp;
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4997 25.6663H17.4997C23.333 25.6663 25.6663 23.333 25.6663 17.4997V10.4997C25.6663 4.66634 23.333 2.33301 17.4997 2.33301H10.4997C4.66634 2.33301 2.33301 4.66634 2.33301 10.4997V17.4997C2.33301 23.333 4.66634 25.6663 10.4997 25.6663Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.3545 8.95996H17.3012V13.9183"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.3016 8.95996L10.6982 15.5633"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 19.2617C11.5383 20.7784 16.4617 20.7784 21 19.2617"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <p className={` mt-2 mb-0 ${style.paragraph}`}>
                        Private Tour
                      </p>
                    </div>
                  </Carousel.Item>
                </>
              );
            })}
      </Carousel>
          </>
        ) : (
          <>
            <h1>No Upcoming Tours Found!</h1>
          </>
        )} */}
    </section>
  );
};

const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(ComingTour);
