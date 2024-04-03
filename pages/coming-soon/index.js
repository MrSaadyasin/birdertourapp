import Image from "next/image";
import React from "react";
import BG from "../../assets/images/comingSoonImage.png";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'next-share';

const ComingSoon = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${BG.src})`,
          width: "100%",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="py-3" style={{ height: "72px", padding: "0 80px" }}>
          <Image src={require("../../assets/images/logo.svg")} />
        </div>

        <div
          className="d-flex align-items-center"
          style={{ height: "calc(100vh - 72px)", padding: "0 80px" }}
        >
          <div>
            <div
              style={{ fontSize: "56px", lineHeight: "60px", fontWeight: 700 }}
            >
              <strong>
                Website is under <br /> Construction!
              </strong>
            </div>
            <p
              className="my-4 pt-2"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.75)",
              }}
            >
              Welcome to our website! We&apos;re excited to be working on <br />{" "}
              something incredible behind the scenes.
            </p>
            <div className="d-flex justify-content-center mt-5">
 
      <FacebookShareButton
        url={'#'} >
        <FacebookIcon size={38} className="mx-1"  round />
      </FacebookShareButton>
      <TwitterShareButton
     
     url={'#'} >
     <TwitterIcon size={38} className="mx-1"  round />
   </TwitterShareButton>
      <PinterestShareButton
     
        url={'#'} >
        <PinterestIcon size={38} className="mx-1"  round />
      </PinterestShareButton>
      <RedditShareButton
     
        url={'#'} >
        <RedditIcon size={38} className="mx-1"  round />
      </RedditShareButton>
      <WhatsappShareButton
     
        url={'#'} >
        <WhatsappIcon size={38} className="mx-1"  round />
      </WhatsappShareButton>
      <LinkedinShareButton
     
        url={'#'} >
        <LinkedinIcon size={38} className="mx-1"  round />
      </LinkedinShareButton>
    </div>
          </div>
      
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
