import React, { useEffect, useState } from "react";
import style from "./Slider.module.css";
import Card from "react-bootstrap/Card";
import CardImg from "../../assets/images/img.png";
import Image from "next/image";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { Tooltip } from "antd";
import ReactHtmlParser from "react-html-parser";
import moment from "moment/moment";
const BlogCard = ({ blog, margin }) => {
  const [blogImg, setBlogImg] = useState("");
  const [mouse, setMouse] = useState(false);
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
  useEffect(() => {
    const blogImgFun = async () => {
      try {
        const data = await fetch(blog._links["wp:featuredmedia"][0].href);
        const imgUrl = await data.json();
        console.log("get data", imgUrl);
        setBlogImg(imgUrl.source_url);
      } catch (error) {
        console.log(error);
      }
    };
    blogImgFun();
  }, []);
  return (
    <>
      <Link href={'blogs/'+blog?.slug} >
        <Card
          className={margin ? `me-0 ${style.custom__card}` : style.custom__card}
        >
          <div className="position-relative">
            {blog?.video ? (
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
                    blog?.video
                    // ? tour?.video
                    // : require("../../assets/images/cardHover.mp4")
                  }
                  type="video/mp4"
                />
              </video>
            ) : (
              <Tooltip title={blog?.title.rendered}>
                <Image
                  src={blogImg}
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
            {blog?.video && (
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
              <Card.Title className={`${style.title}`}>
                {blog?.title.rendered}
              </Card.Title>
              <p className={style.description}>
                {ReactHtmlParser(blog?.content.rendered)}
              </p>
              <div className="d-flex">
                <small className={style.price} style={{ lineHeight: "normal" }}>
                  {moment(blog?.date).format("DD MMM , yyyy")}
                </small>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default BlogCard;
