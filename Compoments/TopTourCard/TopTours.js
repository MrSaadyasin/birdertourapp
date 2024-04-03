import { Star } from "../icons";
import style from "../Slider/Slider.module.css";
import Image from "next/image";
import Avatar from "../../assets/images/userP.svg";
import Lister from "../../assets/images/Lister.svg";
import SuperBirder from "../../assets/images/Super-Birder.svg";
import PDF from "../../assets/images/PDf.svg";
import ToursImag from "../../assets/images/picture-frame.svg";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import  Router  from "next/router";

const TopToursCard = ({ tour, handleLike, margin }) => {
  const [mouse, setMouse] = useState(false);
  // const mouseEnter = (e) => {
  //   e.currentTarget.play();
  // };
  // const mouseLeave = (e) => {
  //   e.currentTarget.pause();
  // };

  // const toggleFullScreen = () => {
  //   var el = document.getElementById("full-screenVideo");
  //   if (el.requestFullscreen) {
  //     el.requestFullscreen();
  //   } else if (el.msRequestFullscreen) {
  //     el.msRequestFullscreen();
  //   } else if (el.mozRequestFullScreen) {
  //     el.mozRequestFullScreen();
  //   } else if (el.webkitRequestFullscreen) {
  //     el.webkitRequestFullscreen();
  //   }
  // };
  return (
    <>
      <Card
        className={margin ? `me-0 ${style.custom__card}` : style.custom__card}
      >
        <div className="position-relative">
           <Image
                  src={tour?.tour?.caption_images[0]?.image ? tour?.tour?.caption_images[0]?.image : require("../../assets/images/cardHover.mp4")}
                  alt={tour.tour.name}
                  className="me-3 w-100 h-100"
                  width={60}
                  height={60}
                />
        </div>
        <div className={style.link}>
          <Link href={`/tourDetails?id=${tour?.tour?._id}`}>
            <Card.Body className={style.card__body}>
              <Card.Title className={style.title}>
                {tour.tour.name}
              </Card.Title>
              <div className="d-flex align-items-center mb-0 pb-1">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.6105 1.19343C10.1895 0.24687 11.5644 0.246871 12.1434 1.19343L14.4997 5.04535C14.7056 5.38193 15.037 5.62271 15.4207 5.71452L19.8122 6.76513C20.8914 7.0233 21.3162 8.33091 20.5949 9.17409L17.6597 12.6053C17.4032 12.9051 17.2766 13.2947 17.3079 13.6881L17.6657 18.1893C17.7537 19.2954 16.6413 20.1036 15.6165 19.6781L11.4462 17.9468C11.0818 17.7955 10.6721 17.7955 10.3077 17.9468L6.13739 19.6781C5.11259 20.1036 4.00027 19.2954 4.08821 18.1893L4.44607 13.6881C4.47734 13.2947 4.35075 12.9051 4.09426 12.6053L1.15899 9.17409C0.437686 8.33091 0.862554 7.0233 1.94171 6.76513L6.33322 5.71452C6.71696 5.62271 7.04836 5.38193 7.25426 5.04535L9.6105 1.19343Z"
                    fill="#F5DE00"
                  />
                </svg>{" "}
                &nbsp;
                <div className={style.addrerss}> ({tour.tour.vendor.rating}) .{JSON.parse(tour.tour.location).address}</div>
              </div>
              <p className={style.guider}>Trip Guide: {tour.tour.vendor.name}</p>
              <p className={style.price}>From $ {JSON.parse(tour.pricing.full_day).price} / {JSON.parse(tour.pricing.full_day).person} per day</p>

              <div className="text-center pt-2">
          <button onClick={()=> Router.push(`/tourDetails?id=${tour?.tour?._id}`)} className="px-3 btnSeeMore w-100">Book Tour</button>
        </div>
            </Card.Body>
          </Link>
        </div>
        
      </Card>
    </>
  );
};
export default TopToursCard;
