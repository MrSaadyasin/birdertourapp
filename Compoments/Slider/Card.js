import React, { useEffect, useState } from "react";
import style from "./Slider.module.css";
import Card from "react-bootstrap/Card";
import CardImg from "../../assets/images/img.png";
import Image from "next/image";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { Tooltip } from "antd";

const CustomCard = ({ wishlist, handleLike, tour, margin }) => {
  const [mouse, setMouse] = useState(false);
  const array = JSON.parse(tour?.location)?.address?.split(",");
  const mouseEnter = (e) => {
    e.currentTarget.play();
  };
  const mouseLeave = (e) => {
    e.currentTarget.pause();
  };

  const toggleFullScreen = () => {
    var el = document.getElementById("full-screenVideo");
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  return (
    <>
      <Link href={`/tourDetails?id=${tour?._id}`}>
        <Card
          className={margin ? `me-0 ${style.custom__card}` : style.custom__card}
        >
          <div className="position-relative">
            {tour?.video ? (
              <video
                id="full-screenVideo"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                className={style.bgImage}
                // loop={true}
                controls={false}
                muted={true}
              >
                <source
                  src={
                    tour?.video
                    // ? tour?.video
                    // : require("../../assets/images/cardHover.mp4")
                  }
                  type="video/mp4"
                />
              </video>
            ) : (
              <Tooltip
                title={
                  tour?.caption_images[0]?.caption
                    ? tour?.caption_images[0]?.caption
                    : "N/A"
                }
              >
                <Image
                  src={tour?.caption_images[0]?.image}
                  width={250}
                  height={310}
                  className={style.bgImage}
                  style={{
                    objectFit: "cover",
                  }}
                  alt="card Image"
                />
              </Tooltip>
            )}

            <div
              onClick={(event) => handleLike(event, tour?._id)}
              className={style.heart}
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
                  fill={wishlist == "liked" ? "#FF2A2A" : "black"}
                  fillOpacity={wishlist == "liked" ? "1" : "0.25"}
                  stroke={wishlist == "liked" ? "#FF2A2A" : "white"}
                />
              </svg>
            </div>

            {tour?.video && (
              <div onClick={toggleFullScreen} className={style.fullScreen}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5007 26.5413H10.5007C4.16565 26.5413 1.45898 23.8347 1.45898 17.4997V10.4997C1.45898 4.16467 4.16565 1.45801 10.5007 1.45801H17.5007C23.8357 1.45801 26.5423 4.16467 26.5423 10.4997V17.4997C26.5423 23.8347 23.8357 26.5413 17.5007 26.5413ZM10.5007 3.20801C5.12232 3.20801 3.20898 5.12134 3.20898 10.4997V17.4997C3.20898 22.878 5.12232 24.7913 10.5007 24.7913H17.5007C22.879 24.7913 24.7923 22.878 24.7923 17.4997V10.4997C24.7923 5.12134 22.879 3.20801 17.5007 3.20801H10.5007Z"
                    fill="white"
                  />
                  <path
                    d="M7.00099 21.875C6.77932 21.875 6.55766 21.7933 6.38266 21.6183C6.04432 21.28 6.04432 20.72 6.38266 20.3817L20.3827 6.38168C20.721 6.04335 21.281 6.04335 21.6193 6.38168C21.9577 6.72001 21.9577 7.28001 21.6193 7.61835L7.61932 21.6183C7.44432 21.7933 7.22266 21.875 7.00099 21.875Z"
                    fill="white"
                  />
                  <path
                    d="M21.0007 12.5417C20.5223 12.5417 20.1257 12.145 20.1257 11.6667V7.875H16.334C15.8557 7.875 15.459 7.47833 15.459 7C15.459 6.52167 15.8557 6.125 16.334 6.125H21.0007C21.479 6.125 21.8757 6.52167 21.8757 7V11.6667C21.8757 12.145 21.479 12.5417 21.0007 12.5417Z"
                    fill="white"
                  />
                  <path
                    d="M11.6667 21.8747H7C6.52167 21.8747 6.125 21.478 6.125 20.9997V16.333C6.125 15.8547 6.52167 15.458 7 15.458C7.47833 15.458 7.875 15.8547 7.875 16.333V20.1247H11.6667C12.145 20.1247 12.5417 20.5213 12.5417 20.9997C12.5417 21.478 12.145 21.8747 11.6667 21.8747Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className={style.link}>
            <Card.Body className={style.card__body}>
              <Card.Title className={style.title}>{tour?.name}</Card.Title>
              {/*<div className="d-flex align-items-center mb-lg-2 pb-1">*/}
              {/*  <svg*/}
              {/*//     width="21"*/}
              {/*//     height="20"*/}
              {/*//     viewBox="0 0 21 20"*/}
              {/*//     fill="none"*/}
              {/*//     xmlns="http://www.w3.org/2000/svg"*/}
              {/*  >*/}
              {/*    <path*/}
              {/*      d="M9.6105 1.19343C10.1895 0.24687 11.5644 0.246871 12.1434 1.19343L14.4997 5.04535C14.7056 5.38193 15.037 5.62271 15.4207 5.71452L19.8122 6.76513C20.8914 7.0233 21.3162 8.33091 20.5949 9.17409L17.6597 12.6053C17.4032 12.9051 17.2766 13.2947 17.3079 13.6881L17.6657 18.1893C17.7537 19.2954 16.6413 20.1036 15.6165 19.6781L11.4462 17.9468C11.0818 17.7955 10.6721 17.7955 10.3077 17.9468L6.13739 19.6781C5.11259 20.1036 4.00027 19.2954 4.08821 18.1893L4.44607 13.6881C4.47734 13.2947 4.35075 12.9051 4.09426 12.6053L1.15899 9.17409C0.437686 8.33091 0.862554 7.0233 1.94171 6.76513L6.33322 5.71452C6.71696 5.62271 7.04836 5.38193 7.25426 5.04535L9.6105 1.19343Z"*/}
              {/*//       fill="#F5DE00"*/}
              {/*//     />*/}
              {/*//   </svg>*/}
              {/*  &nbsp;*/}
              {/*//   <div className={style.addrerss}>*/}
              {/*    {tour?.vendor?.rating ? `(${tour?.vendor?.rating})` : "(0)"} .{" "}*/}
              {/*    {*/}
              {/*      JSON.parse(tour?.location)?.address?.split(",")[*/}
              {/*        array.length - 1*/}
              {/*      ]*/}
              {/*    }*/}
              {/*  </div>*/}
              {/*</div>*/}
              <p className={style.guider}>Trip Guide: {tour?.vendor?.name}</p>
              <p className={style.price}>
                From ${JSON.parse(tour?.pricing?.full_day)?.price} / person per
                day
              </p>
            </Card.Body>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default CustomCard;
