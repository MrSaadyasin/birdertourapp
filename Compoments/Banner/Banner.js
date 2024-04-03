import React from "react";
import style from "./Banner.module.css";
import Image from "next/image";
import Arrow from "../../assets/images/scrollD.png";
import {useTranslation} from "react-i18next";
// import BannerVideo from "../../assets/images/heroSection.mp4";

const Banner = () => {
    const {t} = useTranslation();
  return (
    <section className={style.banner__section}>
      <div className={style.overlay}></div>
      <video
        className={style.videoSection}
        loop={true}
        controls={false}
        muted={true}
        autoPlay={true}
      >
        <source
          src={require("../../assets/images/EBBgVideo.mp4")}
          type="video/mp4"
        />
      </video>

      <div>
        <h1>
            {`${t("MainHeadingP1")}`} <br className="d-none d-lg-block" />{" "}
            {`${t("MainHeadingP2")}`}{" "}
          <br className="d-none d-lg-block" />
            {`${t("MainHeadingP3")}`}
        </h1>
      </div>

      {/* <div className={style.scroll__down}>
        <p className="mb-0">Scroll Down</p>
        <div>
          <Image src={Arrow} alt="arrow image" />
        </div>
      </div> */}
    </section>
  );
};

export default Banner;
